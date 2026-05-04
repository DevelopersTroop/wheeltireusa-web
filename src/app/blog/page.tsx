import Container from '@/components/ui/container/container';
import BlogBanner from './blog-banner';
import { BlogList } from './blog-list';
import { metaDataHelper } from '@/utils/metadata';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';

export const metadata = metaDataHelper({
  title: 'Dive Into Custom Wheel Stories on the Wheel Tire USA',
  keywords: '',
  description:
    'Stay ahead in wheel customization with the Wheel Tire USA. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.',
  openGraph: {
    title: 'Dive Into Custom Wheel Stories on the Wheel Tire USA',
    description:
      'Stay ahead in wheel customization with the Wheel Tire USA. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.',
  },
  alternates: {
    canonical: 'https://wheeltireusa.com/blog',
  },
});

export default function BlogPage() {
  return (
    <>
      <Container>
        <BlogBanner />
        <div className="flex w-full items-start pt-4">
          <Breadcrumb>
            <Item href={'/'}>Home</Item>
            <Item isEnd href={`/blog`}>
              Blog
            </Item>
          </Breadcrumb>
        </div>
        <BlogList />
      </Container>
    </>
  );
}
