import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ubrqudheimrkpkmnfvbq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnF1ZGhlaW1ya3BrbW5mdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDYwNTMsImV4cCI6MjA5NTIyMjA1M30.VyTGGCpL7go2TcoIJcc0Nc5pDq406r90pa2QpCvMu90";
const APPLY = process.argv.includes("--apply");

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function normalizeMediaEntry(entry) {
  if (!entry) return null;

  if (typeof entry === "string") {
    if (!entry.trim() || entry === "undefined" || entry === "null") return null;

    if (entry.includes("|")) {
      const [maybeType, ...rest] = entry.split("|");
      const type = maybeType === "video" ? "video" : "image";
      const src = rest.join("|").trim();
      if (!src || src === "undefined" || src === "null") return null;
      return { type, src };
    }

    return { type: "image", src: entry.trim() };
  }

  if (entry.type === "video" && entry.src && entry.src !== "undefined" && entry.src !== "null") {
    return { type: "video", src: entry.src };
  }

  if (entry.type === "image" && entry.src && entry.src !== "undefined" && entry.src !== "null") {
    return { type: "image", src: entry.src };
  }

  return null;
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function dedupe(items) {
  return items.reduce((acc, item) => {
    const key = `${item.type}|${item.src}`;
    if (!acc.some(existing => `${existing.type}|${existing.src}` === key)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

function cleanProductMedia(product) {
  const rawImages = normalizeArray(product.images);
  const rawMedia = normalizeArray(product.media);

  const images = rawImages
    .map(normalizeMediaEntry)
    .filter(Boolean)
    .filter(item => item.type === "image")
    .map(item => item.src);

  const media = dedupe(
    rawMedia
      .map(normalizeMediaEntry)
      .filter(Boolean)
  );

  const image = images[0] || (product.image && product.image !== "undefined" && product.image !== "null" ? product.image : null);

  return {
    images,
    media,
    image,
  };
}

async function run() {
  const { data, error } = await supabase.from("products").select("id,name,image,images,media");

  if (error) {
    console.error("Failed to fetch products:", error.message);
    process.exit(1);
  }

  let changed = 0;

  for (const product of data || []) {
    const cleaned = cleanProductMedia(product);

    const before = JSON.stringify({
      image: product.image ?? null,
      images: normalizeArray(product.images),
      media: normalizeArray(product.media),
    });

    const after = JSON.stringify(cleaned);

    if (before === after) continue;

    changed += 1;
    console.log(`\n${product.name}`);
    console.log("Before:", before);
    console.log("After: ", after);

    if (APPLY) {
      const { error: updateError } = await supabase
        .from("products")
        .update(cleaned)
        .eq("id", product.id);

      if (updateError) {
        console.error("Update failed:", updateError.message);
      } else {
        console.log("Updated.");
      }
    }
  }

  console.log(`\nDone. ${changed} product(s) need cleanup.`);
  if (!APPLY) {
    console.log("Re-run with --apply to write the cleaned media back to Supabase.");
  }
}

run();
