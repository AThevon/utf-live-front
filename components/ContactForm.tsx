'use client'

import { Form, Input, Textarea, Button, Card, addToast } from '@heroui/react'
import { useState } from 'react'
import { sendContactMessage } from '@/lib/api/contact'
import { Mail } from 'lucide-react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as {
      name: string
      email: string
      subject: string
      message: string
    }

    const promise = sendContactMessage(data)

    addToast({
      title: 'Envoi du message...',
      description: 'Merci de patienter pendant l’envoi.',
      promise: promise,
      loadingIcon: true,
      timeout: 10,
    })

    try {
      await promise

      addToast({
        title: 'Message envoyé !',
        description: 'Merci de nous avoir contacté.',
        color: 'success',
        shouldShowTimeoutProgress: true,
      })

      form.reset()
    } catch (error) {
      console.error('Erreur lors de l’envoi du message :', error)
      addToast({
        title: 'Erreur lors de l’envoi du message',
        description: 'Veuillez réessayer plus tard.',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-zinc-900/80 border border-zinc-700/40 p-6 self-center">
      <h4 className='text-center text-lg'>Une question ?</h4>
       <p className="text-center text-zinc-400 mb-6">Écris-nous juste ici</p>
      <Form onSubmit={handleSubmit} className="space-y-2">
        <Input id="name" name="name" label="Nom" isRequired />
        <Input id="email" name="email" label="Email" type="email" isRequired />
        <Input id="subject" name="subject" label="Sujet" isRequired />
        <Textarea id="message" name="message" label="Message" isRequired minRows={6} />
        <Button type="submit" className="w-full" isLoading={loading} startContent={loading ? "" : <Mail className="h-5 mt-1" />}>
          Envoyer le message
        </Button>
      </Form>
    </Card>
  )
}
