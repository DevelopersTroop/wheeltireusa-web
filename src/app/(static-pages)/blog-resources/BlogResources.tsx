import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import BlogResourcesHero from './_components/BlogResourcesHero/BlogResourcesHero';
import BlogResourcesContent from './_components/BlogResourcesContent/BlogResourcesContent';
// Component to render the Blog Resources page
const BlogResources = () => {
  return (
    <>
      <Container>
        {/* Breadcrumb navigation */}
        <div className="flex w-full items-start">
          <div className="w-full">
            <Breadcrumb>
              <Item href={`/`}>Home</Item>
              <Item href={`/blog-resources`} isEnd={true}>
                Blog Resources
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* Hero section for the Blog Resources page */}
      <BlogResourcesHero />
      <BlogResourcesContent />
    </>
  );
};

export default BlogResources;
