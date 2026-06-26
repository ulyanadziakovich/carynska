export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, phone, message } = body

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: 'Wymagane pola: imię, email, wiadomość.' })
  }

  // Log to console (replace with nodemailer / resend / etc. when email is configured)
  console.log('[Kontakt]', { name, email, phone, message, at: new Date().toISOString() })

  return { ok: true }
})
