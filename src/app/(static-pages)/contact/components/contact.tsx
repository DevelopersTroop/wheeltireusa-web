import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 my-10">
      {/* content */}
      <div className="flex flex-col gap-8 w-full h-full px-4">
        <div>
          <h1 className="text-4xl text-gray-800 font-medium text-center">
            Contact Us
          </h1>
        </div>
        <div>
          <p className="text-center text-gray-500">
            Hi, we are always open for cooperation and suggestions, <br />
            contact us in one of the ways below 
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1030px] flex flex-col lg:flex-row justify-between items-start px-0 lg:px-16 ">
        {/* Left Section */}
        <div className="flex flex-col gap-5 w-full lg:w-[40%] text-sm px-8 pt-12 pb-16 shadow">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
            <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-6 rounded-full"></div>
            <div>
              <h4 className="font-normal">Our location</h4>
              <p className="text-gray-500">
                KTC AUDIO 2193 S. CHAMBERS RD
                AURORA, CO. 80014
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
            <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
            <div>
              <h4 className="font-normal">Phone number</h4>
              <p className="text-gray-500">
                +1 (303) 695-6305
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
            <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
            <div>
              <h4 className="font-normal">Email address</h4>
              <p className="text-gray-500">
                info@ktcaudio.com
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
            <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
            <div>
              <h4 className="font-normal">Working hours</h4>
              <p className="text-gray-500">
                Mon-Sat 10:00pm - 7:00pm
              </p>
            </div>
          </div>
          
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-md p-6 mt-6 w-full lg:w-[60%]">
          <form>
            <div className="w-full flex flex-col md:flex-row gap-2">
              <div className=" w-full mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Your Name"
                />
              </div>
              <div className="w-full mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Subject"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                rows={4}
                placeholder="Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-500 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
