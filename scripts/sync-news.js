import fs from "fs";
import path from "path";
import {fileURLToPath, pathToFileURL} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getNewsFiles(newsDir) {
  const files = fs.readdirSync(newsDir);
  return files
    .filter(file => /^\d+\.js$/.test(file))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

function normalizePublishDate(rawDate) {
  if (!rawDate) {
    const today = new Date().toISOString().split("T")[0];
    return `${today}T00:00`;
  }
  return rawDate.substring(0, 16);
}

async function loadNewsItems(newsDir, newsFiles) {
  const newsList = [];

  for (const file of newsFiles) {
    const id = parseInt(file, 10);
    const filePath = path.join(newsDir, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const newsModule = await import(fileUrl);
      const data = newsModule.default || {};

      newsList.push({
        id,
        title: data.title || "",
        resume: data.resume || "",
        img: data.img || "",
        publishDate: normalizePublishDate(data.publishDate),
        publishDateRaw: data.publishDate || "",
        fixed: Boolean(data.fixed),
        content: Array.isArray(data.content) ? data.content : []
      });
    } catch (error) {
      console.error(`[sync-news] Error importing ${file}:`, error.message);
    }
  }

  return newsList;
}

async function syncNews() {
  const newsDir = path.resolve(__dirname, "../src/assets/news");
  const outputDir = path.resolve(__dirname, "../public/news-management");
  const outputPath = path.join(outputDir, "news.json");

  if (!fs.existsSync(newsDir)) {
    console.error(`[sync-news] Directory not found: ${newsDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
  }

  const newsFiles = getNewsFiles(newsDir);
  console.log(`[sync-news] Found ${newsFiles.length} news files in ${newsDir}`);

  const newsList = await loadNewsItems(newsDir, newsFiles);

  fs.writeFileSync(outputPath, JSON.stringify(newsList, null, 2) + "\n", "utf8");
  console.log(`[sync-news] Successfully generated ${outputPath} with ${newsList.length} items.`);
}

syncNews().catch((err) => {
  console.error("[sync-news] Unhandled error during sync:", err);
  process.exit(1);
});
