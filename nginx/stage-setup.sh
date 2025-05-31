#!/bin/bash

COMMIT_SHA=$1

if [ -z "$COMMIT_SHA" ]; then
  echo "Usage: $0 <commit-sha>"
  exit 1
fi

sudo tee /etc/nginx/conf.d/tiremetic-web.conf > /dev/null <<EOF
server {
    listen 443 ssl;
    server_name tiremetic.stage.developertroop.com;

    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_comp_level 5;
    gzip_types
        text/plain text/css application/json application/javascript
        text/xml application/xml application/xml+rss text/javascript
        font/ttf font/otf application/font-woff application/font-woff2
        image/svg+xml;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass \$http_upgrade;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location ~ ^/_next/static/(.*)\$ {
        proxy_pass http://dqr3i089ew1e2.cloudfront.net/tiremetic-web/${COMMIT_SHA}/_next/static/\$1;
        proxy_set_header Host dqr3i089ew1e2.cloudfront.net;
        proxy_ssl_name dqr3i089ew1e2.cloudfront.net;
        proxy_ssl_server_name on;
        add_header Cache-Control "no-cache, no-store, must-revalidate";

        error_page 400 403 404 500 502 504 = @fallback_next_static;
    }

    location @fallback_next_static {
        proxy_pass http://localhost:3001/_next/static/\$1;
        proxy_set_header Host \$host;
    }

    location ~ ^/public/(.*)\$ {
        proxy_pass http://dqr3i089ew1e2.cloudfront.net/tiremetic-web/${COMMIT_SHA}/public/\$1;
        proxy_set_header Host dqr3i089ew1e2.cloudfront.net;
        proxy_ssl_name dqr3i089ew1e2.cloudfront.net;
        proxy_ssl_server_name on;
        add_header Cache-Control "no-cache, no-store, must-revalidate";

        error_page 400 403 404 500 502 504 = @fallback_public;
    }

    location @fallback_public {
        proxy_pass http://localhost:3001/public/\$1;
        proxy_set_header Host \$host;
    }

    location /healthz {
        return 200 'OK';
        add_header Content-Type text/plain;
    }

    ssl_certificate /etc/letsencrypt/live/tiremetic.stage.developertroop.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tiremetic.stage.developertroop.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 443 ssl;
    server_name www.tiremetic.stage.developertroop.com;

    return 301 https://tiremetic.stage.developertroop.com\$request_uri;

    ssl_certificate /etc/letsencrypt/live/tiremetic.stage.developertroop.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tiremetic.stage.developertroop.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name tiremetic.stage.developertroop.com www.tiremetic.stage.developertroop.com;

    if (\$host = tiremetic.stage.developertroop.com) {
        return 301 https://\$host\$request_uri;
    }
    if (\$host = www.tiremetic.stage.developertroop.com) {
        return 301 https://tiremetic.stage.developertroop.com\$request_uri;
    }

    return 404;
}
EOF

# Test and reload NGINX
if sudo nginx -t; then
  echo "✅ NGINX configuration is valid."
  sudo systemctl reload nginx || sudo systemctl restart nginx
  echo "🔄 NGINX reloaded successfully."
else
  echo "❌ NGINX configuration test failed. Aborting reload."
  exit 1
fi
