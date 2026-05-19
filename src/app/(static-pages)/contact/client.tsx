"use client"
import { apiInstance } from "@/redux/apis/base";
import React, { useActionState } from "react";
import { toast } from "sonner";



const formSubmit = async (prev: unknown, formData: FormData) => {
    try {
        const email = formData.get('email')
        if (!email || typeof email !== 'string') {
            return { error: 'Invalid email' }
        }
        const phone = formData.get('phone')
        const message = formData.get('message')
        const name = formData.get('name')
        if (!message || typeof message !== 'string') {
            return { error: 'Invalid message' }
        }
        if (!name || typeof name !== 'string') {
            return { error: 'Invalid name' }
        }
        const data = {
            email,
            phone,
            message,
            name,
        }
        const response = await apiInstance.post('/contact-us', data)
        if (response.status === 200) {
            toast.success('Message sent successfully')
            return { success: 'Message sent successfully', error: null }
        }
        toast.error('Failed to send message')
        return { error: 'Failed to send message', success: null }
    } catch (error) {
        toast.error('Failed to send message')
        return { error: 'Failed to send message', success: null }
    }
}
const Contact: React.FC = () => {
    const [state, formAction, isPending] = useActionState(formSubmit, null);
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
                <div className="flex flex-col gap-5 w-full lg:w-[40%] text-sm px-8  pb-16 shadow">
                    {/* <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
            <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-6 rounded-full"></div>
            <div>
              <h4 className="font-normal">Our location</h4>
              <p className="text-gray-500">
                KTC AUDIO 2193 S. CHAMBERS RD AURORA, CO. 80014
              </p>
            </div>
          </div> */}
                    <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
                        <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
                        <div>
                            <h4 className="font-normal">Phone number</h4>
                            <p className="text-gray-500">+1 (813) 812-5257</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
                        <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
                        <div>
                            <h4 className="font-normal">Email address</h4>
                            <p className="text-gray-500">info@wheeltireusa.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3 border-b pb-4">
                        <div className="bg-red-500 w-8 h-8 md:w-6 md:h-6 lg:w-6 lg:h-6 rounded-full"></div>
                        <div>
                            <h4 className="font-normal">Working hours</h4>
                            <p className="text-gray-500">Mon-Sat 9:00am - 7:00pm</p>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-white rounded-md px-6 w-full lg:w-[60%]">
                    <form action={formAction}>
                        <div className="w-full flex flex-col md:flex-row gap-2">
                            <div className=" w-full mb-4">
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="w-full mb-4">
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Email Address"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium">
                                Phone
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                id="phone"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Phone Number"
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
                                required
                                name="message"
                                placeholder="Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-500 w-full"
                        >
                            {isPending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-full h-64 lg:h-96 mt-8">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.847707748312!2d-104.8109926846239!3d39.6768399794588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c88b6b6b6b6b6%3A0x6b6b6b6b6b6b6b6b!2sKTC%20AUDIO!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
