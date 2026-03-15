import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
console.log("Dang ket noi den URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

console.log("Dang check anon:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Form data:', body)
    const { name, email, company, service, message } = body

    // Lưu vào Supabase
    const {data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, company, service, message }])

    if (error) throw error

    // Gửi email qua Resend
   /* await resend.emails.send({
      from: 'contact@archaeopteris.us',
      //to: 'onboarding@resend.dev',
      to: 'archaeopteris.llc@gmail.com',
      subject: `New Contact: ${name} - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })*/

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
