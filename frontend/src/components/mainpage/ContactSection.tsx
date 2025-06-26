import ContactForms from "../../pages/mainpage/ContactForms"


const ContactSection = () => {
  return (
    <div className="py-10 bg-white px-4 md:px-4">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-[1.5]">
          <ContactForms/>
        </div>

        <div className="flex-[0.8]">

        </div>
      </div>
    </div>
  )
}

export default ContactSection
