import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
    <div id='contact' className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Contact Us</h4>
    </div>

    <div className="min-h-screen bg-[#1c1b1b] flex items-center justify-center px-6 py-12">
      <div className="bg-[#2a2929] w-full max-w-5xl rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-8">
        
        {/* Contact Form */}
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-[#f5f0c2] border-b-2 border-[#f5f0c2] w-fit">
            CONTACT
          </h1>
          <p className="text-sm text-gray-300 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            dolorem sit excepturi, nemo reiciendis animi?
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 bg-[#f5f0c2] text-black font-semibold rounded-md focus:outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-[#f5f0c2] text-black font-semibold rounded-md focus:outline-none"
              />
            </div>
            {/* Phone */}
            <div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full px-4 py-3 bg-[#f5f0c2] text-black font-semibold rounded-md focus:outline-none"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full border-2 border-[#f5f0c2] text-[#f5f0c2] py-2 rounded-md font-bold tracking-widest hover:bg-[#f5f0c2] hover:text-black transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-[#f5f0c2] border-b-2 border-[#f5f0c2] w-fit">
            INFO
          </h1>
          <p className="text-sm text-gray-300 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque,
            odio assumenda nostrum commodi at corporis!
          </p>

          <div className="space-y-6 text-[#f5f0c2] text-lg font-semibold">
            <div className="flex items-center gap-3">
              <FaPhoneAlt /> <span>+91 7851936943</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope /> <span>b231150@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt /> <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
