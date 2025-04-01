import ContactForm from '@/components/ContactForm'
import ContactSocials from '@/components/ContactSocials'


export default function Contact() {
  return (
    <div className="px-2 sm:px-8 md:px-20 xl:px-40 pb-10 max-w-[2000px] flex-1 w-full lg:w-auto mx-auto">
      <h1 className="text-center text-3xl mb-4 sm:my-10 tracking-widest">Contact</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 h-full items-stretch">
        <ContactSocials />
        <ContactForm />
      </div>
    </div>
  )
}