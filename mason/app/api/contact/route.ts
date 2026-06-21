import {NextResponse} from 'next/server'
import {Resend} from 'resend'

type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
}

const resendApiKey = process.env.RESEND_API_KEY
const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const resendToEmail = process.env.RESEND_TO_EMAIL

const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(req: Request) {
  try {
    if (!resend || !resendToEmail) {
      return NextResponse.json({error: 'Contact service is not configured'}, {status: 500})
    }

    const body = (await req.json()) as Partial<ContactPayload>

    const name = body.name?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()
    const phone = body.phone?.trim()

    if (!name || !email || !message) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400})
    }

    await resend.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    return NextResponse.json({success: true})
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({error: 'Unable to send message'}, {status: 500})
  }
}
