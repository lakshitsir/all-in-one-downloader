import fetch from "node-fetch";

export default async function threads(url) {
  const api =
    "https://api.threadsphotodownloader.com/v2/media?url=" +
    encodeURIComponent(url);

  const res = await fetch(api, {
    headers: { "user-agent": "Mozilla/5.0" }
  });

  const json = await res.json();
  const video = json?.data?.video_urls?.[0]?.download_url;
  if (!video) throw new Error("Threads video not found");

  return {
    title: "Threads Video",
    quality: "HD",
    size: "Unknown",
    media_url: video,
    mime_type: "video/mp4",
    source_url: url
  };
}
