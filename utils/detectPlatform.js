export function detectPlatform(url) {
  if (!url) return null;

  if (/instagram\.com/.test(url)) return "instagram";
  if (/tiktok\.com/.test(url)) return "tiktok";
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/twitter\.com|x\.com/.test(url)) return "twitter";

  if (/facebook\.com/.test(url)) return "facebook";
  if (/pinterest\.com/.test(url)) return "pinterest";
  if (/snapchat\.com/.test(url)) return "snapchat";
  if (/threads\.net/.test(url)) return "threads";

  return null;
}
