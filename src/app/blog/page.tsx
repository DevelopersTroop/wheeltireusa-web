import Container from '@/components/ui/container/container';
import BlogBanner from './blog-banner';
import { BlogList } from './blog-list';
import { metaDataHelper } from '@/utils/metadata';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';

export const metadata = metaDataHelper({
  title: 'Dive Into Custom Wheel Stories on the TireMatic',
  keywords: '',
  description:
    'Stay ahead in wheel customization with the Tirematic. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.',
  openGraph: {
    title: 'Dive Into Custom Wheel Stories on the TireMatic',
    description:
      'Stay ahead in wheel customization with the Tirematic. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.',
  },
  alternates: {
    canonical: 'https://tirematic.com/blog',
  },
});

export default function BlogPage() {
  return (
    <>
      <Container>
        <div className="flex w-full items-start">
          <div className="lg:w-[30%]">
            <Breadcrumb>
              <Item href={'/'}>Home</Item>
              <Item isEnd href={`/blog`}>
                Blog
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      <BlogBanner />
      <BlogList />
    </>
  );
}
