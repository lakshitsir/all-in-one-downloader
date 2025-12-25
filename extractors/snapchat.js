export default async function snapchat(url) {
  const res = await fetch("https://www.expertstool.com/converter.php", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "origin": "https://www.expertstool.com",
      "referer": "https://www.expertstool.com/snapchat-video-downloader/"
    },
    body: new URLSearchParams({ url })
  });

  const html = await res.text();
  const match = html.match(/<source[^>]+src="(https?:\/\/[^"]+)"/);

  if (!match) throw new Error("No Snapchat video found");

  return {
    platform: "snapchat",
    title: "Snapchat Video",
    quality: "HD",
    size: "Unknown",
    media_url: match[1],
    mime_type: "video/mp4",
    source_url: url
  };
}
