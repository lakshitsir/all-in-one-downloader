import { detectPlatform } from "../utils/detectPlatform.js";
import { ok, fail } from "../utils/response.js";

// ===== BASE (tumhare already working extractors) =====
import instagram from "../extractors/instagram.js";
import twitter from "../extractors/twitter.js";
import tiktok from "../extractors/tiktok.js";
import youtube from "../extractors/youtube.js";

// ===== ZIP se aaye huye extractors =====
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
  try {
    // 1️⃣ url param check
    const url = req.query?.url;
    if (!url) {
      return res.status(400).json(
        fail("Missing url parameter")
      );
    }

    // 2️⃣ platform detect
    const platform = detectPlatform(url);
    if (!platform || !handlers[platform]) {
      return res.status(400).json(
        fail("Unsupported platform")
      );
    }

    // 3️⃣ call extractor
    const data = await handlers[platform](url);

    // 4️⃣ success response
    return res.json(
      ok({
        platform,
        ...data
      })
    );

  } catch (e) {
    // 🔥 IMPORTANT: exact error dikhega
    return res.status(500).json({
      success: false,
      error: String(e?.message || e),
      developer: "@lakshitpatidar"
    });
  }
      }
