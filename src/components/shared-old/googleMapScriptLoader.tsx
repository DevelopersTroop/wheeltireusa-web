'use client';
import { LoadScriptNext } from '@react-google-maps/api';
import LoadingSpinner from './loading/spinner';

export const GoogleMapScriptLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <LoadScriptNext
      loadingElement={
        <div className="w-full h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={['places']}
      onUnmount={() => {
        // Handle unmounting of the Google Maps script if needed
        console.log('Google Maps script unmounted');
      }}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};
