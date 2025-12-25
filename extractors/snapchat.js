import fetch from "node-fetch";

export default async function snapchat(url) {
  const res = await fetch("https://www.expertstool.com/converter.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0"
    },
    body: new URLSearchParams({ url })
  });

  const html = await res.text();
  const match = html.match(/<source[^>]+src="([^"]+)"/);
  if (!match) throw new Error("Snapchat video not found");

  return {
    title: "Snapchat Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
