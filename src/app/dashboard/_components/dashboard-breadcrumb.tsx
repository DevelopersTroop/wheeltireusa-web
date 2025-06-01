import React from 'react'; // Importing React library
import { usePathname } from 'next/navigation'; // Importing usePathname hook from Next.js to get the current path
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';

const DashboardBreadcrumb = () => {
  // Get the current pathname from the URL
  const pathname = usePathname();
  const path = pathname.split('/')[2];
  return (
    <div className="flex flex-col gap-6 lg:gap-0 w-full items-start">
      <div className="">
        <Breadcrumb>
          <Item href={'/'}>Home</Item>
          <Item href={'/dashboard/orders'}>Dashboard</Item>
          <Item href={`/dashboard/${path}`} isEnd={true}>
            {path}
          </Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default DashboardBreadcrumb;
