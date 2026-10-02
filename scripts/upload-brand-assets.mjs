import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const bucketId = "shoresh-branding";

async function uploadBrandAssets() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your private environment. Never prefix the service key with VITE_ or commit it.");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const [original, theme] = await Promise.all([
    readFile(new URL("../src/assets/shoresh-logo.svg", import.meta.url), "utf8"),
    readFile(new URL("../src/theme.css", import.meta.url), "utf8"),
  ]);
  const green = theme.match(/--color-brand:\s*(#[0-9a-f]{6})/i)?.[1];
  const white = theme.match(/--color-brand-white:\s*(#[0-9a-f]{6})/i)?.[1];
  if (!green || !white) throw new Error("The primary theme colors must be six-digit hex values in src/theme.css.");

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;
  const existing = buckets?.find((bucket) => bucket.id === bucketId);
  if (existing && !existing.public) {
    throw new Error("The shoresh-branding bucket already exists but is private. Confirm that it contains only public brand artwork before making it public.");
  }
  if (!existing) {
    const { error } = await supabase.storage.createBucket(bucketId, {
      public: true,
      allowedMimeTypes: ["image/svg+xml"],
      fileSizeLimit: 131072,
    });
    if (error) throw error;
  }

  const greenSvg = original.replace(/color="#[0-9a-f]{6}"/i, `color="${green}"`);
  const whiteSvg = original.replace(/color="#[0-9a-f]{6}"/i, `color="${white}"`);
  const markSvg = `${greenSvg.slice(0, greenSvg.indexOf('  <g class="brand-wordmark"'))}</svg>`
    .replace('viewBox="35 6 295 342"', 'viewBox="48 7 246 249"');
  const assets = [
    { id: "logo-green", path: "shoresh-logo-green.svg", svg: greenSvg },
    { id: "logo-white", path: "shoresh-logo-white.svg", svg: whiteSvg },
    { id: "logo-mark", path: "shoresh-mark.svg", svg: markSvg },
  ];

  for (const asset of assets) {
    const body = Buffer.from(asset.svg, "utf8");
    const { error: uploadError } = await supabase.storage.from(bucketId).upload(asset.path, body, {
      contentType: "image/svg+xml",
      cacheControl: "3600",
      upsert: true,
    });
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from(bucketId).getPublicUrl(asset.path);
    const { error: metadataError } = await supabase.from("brand_assets").upsert({
      id: asset.id,
      bucket_id: bucketId,
      object_path: asset.path,
      public_url: data.publicUrl,
      mime_type: "image/svg+xml",
      sha256: createHash("sha256").update(body).digest("hex"),
      colors: { green, white },
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });
    if (metadataError) {
      throw new Error(`Artwork uploaded, but metadata could not be saved: ${metadataError.message}. Apply the brand_assets migration before rerunning.`);
    }
    console.info(`${asset.id}: ${data.publicUrl}`);
  }
  console.info("All three brand assets and their database records were saved. The website continues to use its bundled SVG for reliable loading.");
}

uploadBrandAssets().catch((error) => {
  console.error(`Brand asset upload failed: ${error.message || "Unknown error"}`);
  process.exitCode = 1;
});