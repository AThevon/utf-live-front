'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@heroui/react'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'

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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/utf-logo.png"
              alt="UTF Live"
              width={64}
              height={64}
              className="rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold text-white">UTF Live</h1>
            <p className="text-zinc-500 text-sm mt-1">Administration</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="email"
              label="Email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isDisabled={loading}
              startContent={<Mail className="w-4 h-4 text-zinc-500" />}
              classNames={{
                inputWrapper: 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 group-data-[focus=true]:bg-zinc-800',
                input: 'text-white placeholder:text-zinc-500',
                label: 'text-zinc-400',
              }}
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isDisabled={loading}
              startContent={<Lock className="w-4 h-4 text-zinc-500" />}
              classNames={{
                inputWrapper: 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 group-data-[focus=true]:bg-zinc-800',
                input: 'text-white placeholder:text-zinc-500',
                label: 'text-zinc-400',
              }}
            />

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <GradientButton
              type="submit"
              isLoading={loading}
              className="w-full h-12 text-base font-medium"
            >
              Se connecter
            </GradientButton>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  )
}
