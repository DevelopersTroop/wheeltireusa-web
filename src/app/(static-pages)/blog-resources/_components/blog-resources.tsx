import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import Item from '@/components/ui/breadcrumb/item';
import Container from '@/components/ui/container/container';
import BlogResourcesHero from './blog-resources-hero';
// Component to render the Privacy Policy page
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
      {/* Hero section for the Privacy Policy page */}
      <BlogResourcesHero />
      <Container>
        {/* Main content section */}
        <div className="flex flex-col gap-[10px] items-start justify-center w-full mt-[10px] mb-10 md:mb-20">
          <div className="flex flex-col gap-[10px] items-start justify-center w-full">
            <h2 className="text-3xl font-semibold text-btext">
              Blog Resources
            </h2>
            <p>Last Updated: June 3, 2025</p>
            <p>
              Welcome to our Blog Resources section! Here, you will find helpful
              articles, guides, and tips to keep you informed about tire care,
              vehicle maintenance, and the latest industry trends.
            </p>
            <p>
              Explore our curated resources to learn more about best practices,
              safety recommendations, and expert advice to help you get the most
              out of your driving experience. Check back regularly for new
              updates and insights from our team.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogResources;
