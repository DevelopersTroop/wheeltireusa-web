
import Breadcrumb from "@/components/ui/breadcrumb/breadcrumb";
import Item from "@/components/ui/breadcrumb/item";
import { metaDataHelper } from "@/utils/metadata";
import React from "react";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `About us - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/about`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

const AboutPage: React.FC = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="p-2">
        <Breadcrumb>
          <Item href={"/"}>Home</Item>
          <Item href={"/"}>About</Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 my-10 max-w-4xl">
        {/* content */}
        <div className=" space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold">About Us – WheelTireUSA</h1>
            <p>
              At WheelTireUSA, our goal is simple: deliver the best wheels,
              tires, and vehicle accessories with service you can rely on. We’re
              passionate about helping drivers upgrade their vehicles with
              confidence — whether it’s for style, performance, safety, or all
              three.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Store</h2>
            <p>
              WheelTireUSA was founded with one purpose in mind: make it easier
              for everyday drivers to find high-quality wheels and tires without
              the stress, confusion, or inflated pricing that often comes with
              the process. Over the years, we’ve grown from a small operation
              into a trusted source for customers across the United States,
              offering a wide selection of products backed by personalized
              support.
            </p>
            <p>
              We understand how important it is to feel confident in what you’re
              buying. That’s why we focus on clear information, trusted brands,
              fair pricing, and a customer experience that feels straightforward
              from start to finish.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <p>
              At WheelTireUSA, you’ll find wheels and tires for cars, trucks,
              SUVs, and specialty vehicles. Our catalog includes:
            </p>
            <ul className="list-disc ml-8">
              <li>Premium wheels in a range of styles, finishes, and sizes</li>
              <li>
                Top-brand tires for all-season, performance, off-road, and daily
                driving
              </li>
              <li>
                Wheel-and-tire packages mounted, balanced, and ready to install
              </li>
              <li>
                Accessories that support performance, safety, and durability
              </li>
            </ul>
            <p>
              Every product we offer is selected based on quality, reliability,
              and real value. If it’s not something we’d use on our own
              vehicles, we don’t carry it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Why Drivers Choose WheelTireUSA
            </h2>
            <div className="space-y-2">
              <h3>⭐ A focus on quality</h3>
              <p>
                We partner only with brands known for craftsmanship,
                performance, and safety. No cheap knockoffs, no low-grade
                products.
              </p>
            </div>

            <div className="space-y-2">
              <h3>⭐ Honest, competitive pricing</h3>
              <p>
                We believe in delivering value. You’ll find clear pricing, no
                hidden fees, and products that are built to last.
              </p>
            </div>

            <div className="space-y-2">
              <h3>⭐ Fast, reliable shipping</h3>
              <p>
                We work hard to process orders quickly and ship them safely, so
                you get what you need on time.
              </p>
            </div>
            <div className="space-y-2">
              <h3>⭐ Real customer support</h3>
              <p>
                Our team is made up of people who know wheels and tires - not
                scripts. We’re here to help you choose the right fit, answer
                questions, and guide you through the process.
              </p>
            </div>
            <div className="space-y-2">
              <h3>⭐ Safe, secure shopping</h3>
              <p>
                Our website is designed to make your experience fast, simple,
                and secure from checkout to delivery.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Commitment to You</h2>
            <p>
              We’re not just selling products - we’re building relationships.
              When you shop at WheelTireUSA, our commitment is to make sure you
              feel supported before, during, and after your purchase. Your
              satisfaction is our priority, and we stand behind every product we
              offer.
            </p>
            <p>
              Whether you’re upgrading the look of your vehicle, improving its
              performance, replacing worn-out tires, or building a custom setup,
              we’re here to help you get the most out of your ride.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Promise</h2>
            <p>
              At WheelTireUSA, you’ll find wheels and tires for cars, trucks,
              SUVs, and specialty vehicles. Our catalog includes:
            </p>
            <ul className="list-disc ml-8">
              <li>We’ll always provide trusted brands and quality products</li>
              <li>We’ll always offer fair pricing and clear information</li>
              <li>We’ll always deliver helpful, honest service</li>
              <li>We’ll always treat your vehicle like it’s our own</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">
              WheelTireUSA - Built for Drivers. Trusted Nationwide.
            </h2>
            <p>
              Thank you for choosing us. We’re honored to be part of your
              automotive journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
