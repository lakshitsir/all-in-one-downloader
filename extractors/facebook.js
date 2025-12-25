export default async function facebook(url) {
  const headers = {
    "user-agent": "Mozilla/5.0",
    "origin": "https://fbdown.blog",
    "referer": "https://fbdown.blog/"
  };

  const res = await fetch("https://fbdown.blog/get.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      ...headers
    },
    body: new URLSearchParams({ url })
  });

  const text = await res.text();

  const match = text.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
  if (!match) throw new Error("No Facebook video found");

  return {
    platform: "facebook",
    title: "Facebook Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
