import { detectPlatform } from "../utils/detectPlatform.js";
import { ok, fail } from "../utils/response.js";

// ===== BASE extractors (PASTE YOUR EXISTING FILES AS-IS) =====
import instagram from "../extractors/instagram.js";
import twitter from "../extractors/twitter.js";
import tiktok from "../extractors/tiktok.js";
import youtube from "../extractors/youtube.js";

// ===== ZIP se converted extractors =====
import facebook from "../extractors/facebook.js";
import pinterest from "../extractors/pinterest.js";
import snapchat from "../extractors/snapchat.js";
import threads from "../extractors/threads.js";

const handlers = {
  instagram,
  twitter,
  tiktok,
  youtube,
  facebook,
  pinterest,
  snapchat,
  threads
};

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json(fail("Missing url"));

  const platform = detectPlatform(url);
  if (!platform || !handlers[platform]) {
    return res.status(400).json(fail("Unsupported platform"));
  }

  try {
    const data = await handlers[platform](url);
    return res.json(ok(data));
  } catch (e) {
    return res.status(500).json(fail(e.message || "Failed"));
  }
}
