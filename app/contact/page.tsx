import ContactForm from '@/components/contact/ContactForm'
import ContactSocials from '@/components/contact/ContactSocials'

export const metadata = {
  title: 'Contact – Under The Flow',
  description: 'Une question, une collaboration, une idée ? Contactez l’équipe Under The Flow via notre formulaire ou nos réseaux.',
};

export default function Contact() {
  return (
    <div className="px-2 sm:px-8 md:px-12 lg:px-0 pb-10 max-w-[2000px] h-full flex-1 w-full lg:w-auto mx-auto">
      <h1 className="text-center text-4xl mb-4 sm:my-6 lg:my-4">Contact</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 h-full items-stretch">
        <ContactSocials />
        <ContactForm />
      </div>
    </div>
  )
}