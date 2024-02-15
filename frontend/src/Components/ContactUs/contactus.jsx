import React, { useState } from "react";

import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import Socials from "../../Elements/Socials";
import Button from "../Button";
import Robot from "../../Assets/Robot-Hello.png";

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function Contactus() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    reason: "",
    messageText: "",
  });

  const [errors, setErrors] = useState({}); // State for form errors
  const [message, setMessage] = useState(""); // State for success/failure message

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "reason") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedText = selectedOption.getAttribute("data-text");

      setFormData({
        ...formData,
        [id]: selectedText || value, // Use the selected text or fallback to the value
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation - you can expand this with more thorough checks
    const newErrors = {};

    if (formData.fullName === "") {
      newErrors.fullName = "Full name is required";
    }

    if (formData.phoneNumber === "" || formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (formData.email === "" || !formData.email.includes("@")) {
      newErrors.email = "Please provide a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // If no errors, continue with form submission (you'd handle this part)
      // For instance, you might want to make an API call to a backend endpoint to handle the form data.
      try {
        // Send the new password to the server for updating the user's credentials
        const res = await fetch(`${backendBaseUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          // If the response status is OK (200), display success message
          setMessage(
            "We have received your response and will contact you as soon as possible!"
          );
        } else {
          // If the response status is not OK, display an error message
          setMessage("Failed to send the message. Please try again later.");
        }

        const data = res.json();

        // Handle response accordingly, e.g., show success message
      } catch (error) {
        console.error("Error:", error);
        // Handle error, show an error message, etc.
      }
      // Reset form data and errors
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        reason: "",
        messageText: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-white font-open-sans mt-20">
      <div className="flex w-full min-h-screen justify-center item-center">
        <div className="flex flex-col md:flex-row md_space-x-6 md:space-y-0 space-y-6  w-full max-w-4xl p-8 rounded-xl shadow-lg mt-8">
          <div className="flex flex-col space-y-8 justify-between">
            <div>
              <p className="pt-2 text-gray-600 text-sm">
                We're always here to help. If you have questions about our
                products, services, our website, or anything else, please don't
                hesitate to contact us. We are dedicated to providing the best
                possible service.
              </p>
            </div>
            <div>
              <img src={Robot} alt="Robot" className="rounded-xl w-80 h-auto" />
            </div>
            <div className="md:space-y-3">
              <div className="flex flex-col">
                <div className="inline-flex space-x-3 items-center">
                  <BsFillTelephoneFill className="text-4xl text-[#00ADEB]" />
                  <span>+977-9861607730</span>
                </div>
              </div>
              <div className="">
                <div className="inline-flex space-x-3 items-center">
                  <GrMail className="text-4xl text-[#00ADEB]" />
                  <span className=" hidden md:flex">
                    bhandariashish395@gmail.com
                  </span>
                  <span className=" flex md:hidden">
                    abhandariashish
                    <br />
                    @gmail.com
                  </span>
                </div>
              </div>

              <div>
                <div className="inline-flex space-x-3 items-center">
                  <IoLocationSharp className="text-4xl text-[#00ADEB]" />
                  <span>Budanilkantha, golfutar, Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
            <div>
              <Socials />
            </div>
          </div>
          <div className="bg-sky-100 rounded-xl drop-shadow-lg">
            <div className="flex flex-row bg-sky-500 mt-0 rounded-xl justify-center text-white text-6xl font-medium  p-2">
              Fill the Form
            </div>
            <div className="p-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 mr-8 md:w-80"
              >
                <div>
                  <label htmlFor="name" className="text-sm font-bold">
                    Full Name<span className="text-red-500">*</span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="ring-1 ring-gray-300 rounded-md w-full px-4 py-2 border-transparent outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="name" className="text-sm font-bold">
                    Email
                  </label>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="ring-1 ring-gray-300 rounded-md w-full px-4 py-2 border-transparent outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="name" className="text-sm font-bold">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="ring-1 ring-gray-300 rounded-md w-full px-4 py-2 border-transparent outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Why are you contacting us? */}

                <div>
                  <label htmlFor="reason" className="text-sm font-bold">
                    Why are you contacting us
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div>
                  <select
                    id="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="ring-1 ring-gray-300 rounded-md w-full px-4 py-2 border-transparent outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  >
                    <option value="Request to visit school">
                      Request to visit school/college
                    </option>
                    <option value="Robotics Course syllabus">
                      Robotics Course syllabus
                    </option>
                    <option value="Teacher Training">Teacher Training</option>
                    <option value="Robotics Course Kit">
                      Robotics Course Kit
                    </option>
                    <option value="Satellite">Satellite</option>
                    <option value="Jobs Enquiry">Jobs Enquiry</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* message */}

                <div>
                  <label htmlFor="message" className="text-sm font-bold ">
                    Message
                    <span className="text-red-600 text-center justify-center ">
                      *
                    </span>
                  </label>
                </div>
                <div>
                  <textarea
                    type="text"
                    id="messageText"
                    placeholder="Your message for us.."
                    rows="4"
                    value={formData.messageText}
                    onChange={handleChange}
                    className="ring-1 ring-gray-300 rounded-md w-full px-4 py-2 border-transparent outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  >
                    {errors.messageText && (
                      <p className="text-red-500">{errors.messageText}</p>
                    )}
                  </textarea>
                </div>
                <div className="flex justify-center">
                  <Button>Submit</Button>
                </div>
                <div className="flex justify-center">
                  <p className="text-red-400 font-bold">{message}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Embading a location map */}
      <div className="w-full h-96 m-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.0477936274324!2d85.34855981459016!3d27.746671825206487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1766ef7c9329%3A0x1c6e7b15d400f86c!2sBeyond%20Apogee!5e0!3m2!1sen!2snp!4v1695991839734!5m2!1sen!2snp"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contactus;
