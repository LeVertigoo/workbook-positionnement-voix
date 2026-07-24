export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    // No webhook configured yet — succeed silently so the client doesn't
    // treat this as a failure.
    res.status(200).json({ skipped: true })
    return
  }

  try {
    const { clientName, clientEmail } = req.body || {}

    const text =
      `📘 *Nouvelle réponse au workbook Positionnement & Voix*\n` +
      `*Client :* ${clientName || 'Sans nom'}${clientEmail ? ` (${clientEmail})` : ''}\n` +
      `*Voir les réponses :* ${process.env.WORKBOOK_ADMIN_URL || 'ouvre la page /?admin=1 du workbook'}`

    const slackRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    if (!slackRes.ok) {
      const body = await slackRes.text()
      console.error('Slack webhook error:', slackRes.status, body)
      res.status(502).json({ error: 'Slack webhook failed' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('notify-slack error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
