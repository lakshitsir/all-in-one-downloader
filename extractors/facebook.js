import fetch from "node-fetch";

export default async function facebook(url) {
  const res = await fetch("https://fbdown.blog/get.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": "Mozilla/5.0"
    },
    body: new URLSearchParams({ url })
  });

  const html = await res.text();
  const match = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
  if (!match) throw new Error("Facebook video not found");

  return {
    title: "Facebook Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
