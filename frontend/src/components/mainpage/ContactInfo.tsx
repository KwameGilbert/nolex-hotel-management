import { Phone,Mail, AlertTriangle } from "lucide-react"

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white shadow-md rounded-lg p-6 flex gap-5 items-start">
        <span className="bg-[#C9A55C] text-white p-2 rounded-sm flex items-center justify-center"><Phone className="w-6 h-6" /></span>
        <div>
          <h1>Phone</h1>
          <p className="text-lg font-semibold">233 550 807 914</p>
          <p className="text-gray-500 mb-2">24/7 Guest Service</p>
          <p className="text-gray-500">Speak directly with our concierge team</p>
        </div>
      </div>
      {/* Email */}
      <div className="bg-white shadow-md rounded-lg p-6 flex gap-5 items-start">
        <span className="bg-[#C9A55C] text-white p-2 rounded-sm flex items-center justify-center">
          <Mail className="w-6 h-6" />
        </span>
        <div>
          <h1 className="font-medium text-gray-700">Email</h1>
          <p className="text-lg font-semibold">support@eliteweb.com</p>
          <p className="text-gray-500 mb-2">Official Support</p>
          <p className="text-gray-500">Send us your inquiries anytime</p>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-[#ffe3e3] border border-red-400 rounded-lg p-6 flex gap-5 items-start">
        <span className="bg-[#C9A55C] text-white p-2 rounded-sm flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </span>
        <div>
          <h1 className="font-medium text-gray-700">Emergency Contact</h1>
          <p className="text-lg font-semibold">+233 200 123 456</p>
          <p className="text-gray-500 mb-2">Urgent Support Line</p>
          <p className="text-gray-500">Available 24/7 for critical assistance</p>
        </div>
        </div>
    </div>
  )
}

export default ContactInfo
