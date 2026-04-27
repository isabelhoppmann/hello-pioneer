export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, noteTitle } = req.body;
  if (!to || !noteTitle) {
    return res.status(400).json({ error: 'Missing to or noteTitle' });
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to,
      subject: `Shared note: ${noteTitle}`,
      html: `<p>A note was shared with you:</p><blockquote><strong>${noteTitle}</strong></blockquote>`,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return res.status(500).json({ error: data.message ?? 'Failed to send email' });
  }

  return res.status(200).json({ id: data.id });
}
