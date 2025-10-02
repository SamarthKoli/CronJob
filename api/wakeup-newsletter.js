// /api/wakeup-newsletter.js
export default async function handler(req, res) {
  const backendUrl = "https://thecloudcode-backend.onrender.com/api/news/newsletter/trigger"; // Change to actual endpoint
  try {
    const response = await fetch(backendUrl, { method: "POST" });
    if (response.ok) {
      res.status(200).json({ success: true, status: "Newsletter job triggered" });
    } else {
      res.status(500).json({ error: "Backend returned error" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unable to contact backend", details: err.toString() });
  }
}
