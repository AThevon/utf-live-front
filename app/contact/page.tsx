import ContactForm from '@/components/ContactForm'
import { CornerRightDown } from "lucide-react";


export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-zinc-400 mb-8">Une question ? Écris-nous juste ici <CornerRightDown className="inline-block translate-y-1 w-4 h-4" /></p>
      <ContactForm />
    </div>
  )
}