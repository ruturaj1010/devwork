import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        form,
      );
      if (response.status === 200) {
        console.log(response);
        alert(response.data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="contact" className="w-full h-full relative">
      <div className="w-full p-3">
        <h1 className="text-3xl font-bold text-white text-center pt-3 pb-6">
          CONTACT ME
        </h1>

        <div className="w-full flex justify-start items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-2/3 p-4 sm:p-12 rounded-xl bg-gray-200/40 mx-auto flex flex-col items-center sm:items-start gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="w-full sm:w-2/3 py-2 px-3 border-2 outline-none border-gray-700 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              className="w-full sm:w-2/3 py-2 px-3 border-2 outline-none border-gray-700 rounded"
            />

            <textarea
              name="message"
              rows={3}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className="w-full sm:w-full py-2 px-3 border-2 resize-none outline-none border-gray-700 rounded"
            />

            <button
              type="submit"
              className="bg-gray-800 w-32 py-2 px-3 text-white text-md font-semibold rounded-lg border-2 hover:bg-gray-600 hover:border-sky-300 hover:text-sky-500"
            >
              Message
            </button>
          </form>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
