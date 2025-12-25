export default async function pinterest(url) {
  const apiUrl = "https://www.expertstool.com/converter.php";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "origin": "https://www.expertstool.com",
      "referer": "https://www.expertstool.com/download-pinterest-video-online/"
    },
    body: new URLSearchParams({ url })
  });

  const html = await res.text();
  const match = html.match(/href="(https:\/\/v\.pinimg\.com[^"]+)"/);

  if (!match) throw new Error("No Pinterest media found");

  return {
    platform: "pinterest",
    title: "Pinterest Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
