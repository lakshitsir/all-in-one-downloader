import fetch from "node-fetch";

export default async function pinterest(url) {
  const res = await fetch("https://www.expertstool.com/converter.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0"
    },
    body: new URLSearchParams({ url })
  });

  const html = await res.text();
  const match = html.match(/href="(https:\/\/v\.pinimg\.com[^"]+)"/);
  if (!match) throw new Error("Pinterest media not found");

  return {
    title: "Pinterest Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
