// /api/wakeup-newsletter.js
async function attemptCollectArticles(url, maxRetries = 5, delayMs = 15000) { // 15 seconds
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, { method: "POST" });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return false;
}

export default async function handler(req, res) {
  const collectUrl = "https://thecloudcode-backend.onrender.com/api/news/collect";
  const newsletterUrl = "https://thecloudcode-backend.onrender.com/api/news/newsletter/trigger";
  try {
    const collectSuccess = await attemptCollectArticles(collectUrl);
    if (!collectSuccess) {
      return res.status(500).json({ error: "Failed to collect articles after multiple attempts" });
    }

    const newsletterResponse = await fetch(newsletterUrl, { method: "POST" });
    if (newsletterResponse.ok) {
      res.status(200).json({ success: true, status: "Newsletter sent after collecting articles successfully" });
    } else {
      res.status(500).json({ error: "Newsletter triggering failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Request failed", details: err.toString() });
  }
}
