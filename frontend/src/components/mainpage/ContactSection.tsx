import ContactForms from "../../pages/mainpage/ContactForms"
import ContactInfo from "./ContactInfo"


const ContactSection = () => {
  return (
    <div className="py-10 bg-white px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-[1.6]">
          <ContactForms/>
        </div>

        <div className="flex-[0.7]">
          <ContactInfo/>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
