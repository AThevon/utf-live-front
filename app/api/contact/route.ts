import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(150),
  subject: z.string().min(1).max(150),
  message: z.string().min(1).max(3000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouveau message - Under The Flow</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc; color: #111;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07); padding: 40px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <h1 style="margin: 0; font-size: 22px; color: #1e40af; font-weight: 600;">
                Nouveau message reçu via Under The Flow
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #64748b;">Un utilisateur a envoyé une demande via le formulaire.</p>
            </td>
          </tr>

          <!-- Infos -->
          <tr>
            <td style="font-size: 16px; line-height: 1.6; padding-top: 20px;">
              <p><strong style="color: #1f2937;">Nom :</strong> ${validated.name}</p>
              <p><strong style="color: #1f2937;">Email :</strong> <a href="mailto:${validated.email}" style="color: #2563eb; text-decoration: none;">${validated.email}</a></p>
              <p><strong style="color: #1f2937;">Sujet :</strong> ${validated.subject}</p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding-top: 20px; font-size: 16px; line-height: 1.6;">
              <p style="margin-bottom: 8px;"><strong style="color: #1f2937;">Message :</strong></p>
              <p style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; white-space: pre-line; border: 1px solid #e2e8f0;">
                ${validated.message}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 40px; font-size: 13px; color: #9ca3af;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Under The Flow. Tous droits réservés.</p>
              <p style="margin: 4px 0 0;">Ce message a été généré automatiquement. Pour en savoir plus, visitez <a href="https://undertheflow.com" style="color: #2563eb; text-decoration: none;">undertheflow.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    const { error } = await resend.emails.send({
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: process.env.MAIL_TO_ADDRESS!,
      replyTo: validated.email,
      subject: validated.subject,
      html,
    })

    if (error) {
      console.error('❌ Resend API error:', error)
      return NextResponse.json(
        { error: "L'email n'a pas pu être envoyé." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Message envoyé avec succès',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('❌ Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message.' },
      { status: 500 }
    )
  }
}
