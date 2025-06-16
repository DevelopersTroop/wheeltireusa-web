import { metaDataHelper } from '@/utils/metadata';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const path = cookieStore.get('__path')?.value || 'unknown';
  console.log('Path from cookies:', path);

  let customTitle = 'Orders';

  if (path === '/dashboard/orders') {
    customTitle = 'Orders';
  } else if (path === '/dashboard/save-product') {
    customTitle = 'Save Product';
  } else if (path === '/dashboard/account-details') {
    customTitle = 'Account Details';
  } else if (path === '/dashboard/change-password') {
    customTitle = 'Change Password';
  } else if (path === '/dashboard/logout') {
    customTitle = 'Logout';
  } else customTitle = 'Orders';

  return metaDataHelper({
    title: `${customTitle} - Tirematic`,
    keywords: '',
    description: '',
    openGraph: {
      title: '',
      description: '',
    },
    alternates: {
      canonical: `https://tirematic.com/${customTitle}`,
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
