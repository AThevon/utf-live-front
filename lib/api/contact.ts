export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactMessage(payload: ContactPayload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Erreur lors de l’envoi du message')
  }

  return await res.json()
}
