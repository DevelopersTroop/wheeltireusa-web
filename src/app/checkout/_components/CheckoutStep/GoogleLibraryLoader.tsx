'use client';
import LoadingSpinner from '@/components/ui/loading-spinner/loading-spinner';
import { Libraries, LoadScriptNext } from '@react-google-maps/api';

const libraries: Libraries = ['places'];
export const GoogleLibraryLoader: React.FC<React.PropsWithChildren> = ({
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
      libraries={libraries}
    >
      <>{children}</>
    </LoadScriptNext>
  );
};
