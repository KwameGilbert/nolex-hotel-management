import { Send } from "lucide-react";

const ContactForms = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-6">
      <h1 className="text-2xl text-[#1A365D] flex items-center font-semibold">
        <Send className="w-6 h-6 mr-3 text-[#C9A55C]" />
        Send us a Message
      </h1>
      <p className="text-gray-600">
        Fill out the form below and our team will get back to you within 24
        hours.
      </p>

      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <label htmlFor="firstName">First Name *</label>
            <input
              id="firstName"
              name="firstName"
              required
              className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name *</label>
            <input
              id="lastName"
              name="lastName"
              required
              className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
            />
          </div>
        </div>

        <div className="py-5">
          <label htmlFor="inquiryType">Inquiry Type</label>
          <select
            id="inquiryType"
            name="inquiryType"
            className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
          >
            <option value="">Select an inquiry type</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subject">Subject *</label>
          <input id="subject" name="subject" required className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent" />
        </div>

        <div className="py-5">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="mt-1 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent"
            placeholder="Please provide details about your inquiry..."
          />
        </div>
        
        <button className="flex items-center gap-2 bg-[#C9A55C] text-white py-2 px-4 rounded-md w-full justify-center">
          <Send/>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForms;

const inquiryTypes = [
  "General Information",
  "Room Reservations",
  "Event Planning",
  "Dining Reservations",
  "Spa & Wellness",
  "Transportation",
  "Special Requests",
  "Feedback & Complaints",
];
