'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button, Input, Card, CardBody, CardHeader } from '@heroui/react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">UTF Live Admin</h1>
          <p className="text-small text-default-500">Connectez-vous pour gérer le contenu</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isDisabled={loading}
            />
            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isDisabled={loading}
            />
            {error && (
              <p className="text-danger text-sm">{error}</p>
            )}
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="w-full"
            >
              Se connecter
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
