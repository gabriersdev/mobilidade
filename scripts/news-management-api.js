import fs from "fs";
import path from "path";
import {fileURLToPath, pathToFileURL} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const NEWS_DIR = path.join(PROJECT_ROOT, "src", "assets", "news");
const PUBLIC_NEWS_IMAGES_DIR = path.join(PROJECT_ROOT, "public", "news");
const MANAGEMENT_DIR = path.join(PROJECT_ROOT, "public", "news-management");
const NEWS_JSON_PATH = path.join(MANAGEMENT_DIR, "news.json");
const NEWS_INDEX_PATH = path.join(NEWS_DIR, "index.js");

function getNewsFileNames() {
  if (!fs.existsSync(NEWS_DIR)) {
    return [];
  }
  return fs
    .readdirSync(NEWS_DIR)
    .filter((file) => /^\d+\.js$/.test(file))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

function normalizePublishDateInput(rawDate) {
  if (!rawDate) {
    const today = new Date().toISOString().split("T")[0];
    return `${today}T00:00`;
  }
  return String(rawDate).substring(0, 16);
}

function formatPublishDateOutput(dateValue) {
  if (!dateValue) {
    const today = new Date().toISOString().split("T")[0];
    return `${today}T00:00:00-03:00`;
  }
  const value = String(dateValue).trim();
  if (value.includes("-03:00")) {
    return value;
  }
  return value.length === 16 ? `${value}:00-03:00` : `${value}-03:00`;
}

function buildNewsModuleCode(item) {
  const payload = {
    title: String(item.title || "").trim(),
    resume: String(item.resume || "").trim(),
    img: String(item.img || "").trim(),
    publishDate: formatPublishDateOutput(item.publishDate),
    fixed: Boolean(item.fixed),
    content: (Array.isArray(item.content) ? item.content : [])
      .map((p) => String(p || "").trim())
      .filter(Boolean),
  };

  return `export default ${JSON.stringify(payload, null, 2)};\n`;
}

function buildIndexModuleCode(sortedIds) {
  const imports = sortedIds.map((id) => `import news${id} from './${id}.js';`).join("\n");
  const arrayItems = sortedIds.map((id) => `  news${id}`).join(",\n");

  return `${imports}

const news = [
${arrayItems}
];

const returnNews = news.map((n, i) => {
  return {...n, ["id"]: i};
});

export default returnNews;
`;
}

async function readAllNews() {
  const files = getNewsFileNames();
  const list = [];

  for (const file of files) {
    const id = parseInt(file, 10);
    const filePath = path.join(NEWS_DIR, file);
    // Query string evita cache de módulos ES entre edições consecutivas no mesmo processo Node
    const fileUrl = `${pathToFileURL(filePath).href}?t=${Date.now()}-${Math.random()}`;
    const newsModule = await import(fileUrl);
    const data = newsModule.default || {};

    list.push({
      id,
      title: data.title || "",
      resume: data.resume || "",
      img: data.img || "",
      publishDate: normalizePublishDateInput(data.publishDate),
      publishDateRaw: data.publishDate || "",
      fixed: Boolean(data.fixed),
      content: Array.isArray(data.content) ? data.content : [],
    });
  }

  return list;
}

function listAvailableImages() {
  if (!fs.existsSync(PUBLIC_NEWS_IMAGES_DIR)) {
    return [];
  }
  return fs
    .readdirSync(PUBLIC_NEWS_IMAGES_DIR)
    .filter((file) => /\.(png|jpe?g|webp|gif|svg)$/i.test(file))
    .sort()
    .map((file) => `/news/${file}`);
}

async function regenerateIndexAndJson() {
  const files = getNewsFileNames();
  const sortedIds = files.map((file) => parseInt(file, 10));

  fs.writeFileSync(NEWS_INDEX_PATH, buildIndexModuleCode(sortedIds), "utf8");

  if (!fs.existsSync(MANAGEMENT_DIR)) {
    fs.mkdirSync(MANAGEMENT_DIR, {recursive: true});
  }

  const newsList = await readAllNews();
  fs.writeFileSync(NEWS_JSON_PATH, JSON.stringify(newsList, null, 2) + "\n", "utf8");

  return newsList;
}

function getNextNewsId() {
  const files = getNewsFileNames();
  if (files.length === 0) {
    return 0;
  }
  const ids = files.map((file) => parseInt(file, 10));
  return Math.max(...ids) + 1;
}

function validateNewsItem(item) {
  if (!item || typeof item !== "object") {
    return "Dados da notícia inválidos.";
  }
  if (!String(item.title || "").trim() || !String(item.resume || "").trim()) {
    return "Preencha título e subtítulo.";
  }
  if (!String(item.publishDate || "").trim()) {
    return "Preencha a data de publicação.";
  }
  const validParagraphs = (Array.isArray(item.content) ? item.content : [])
    .map((p) => String(p || "").trim())
    .filter(Boolean);
  if (validParagraphs.length === 0) {
    return "Adicione pelo menos um parágrafo de conteúdo.";
  }
  return "";
}

async function saveSingleNewsItem(item) {
  const error = validateNewsItem(item);
  if (error) {
    throw new Error(error);
  }

  const hasValidId = typeof item.id === "number" && Number.isInteger(item.id) && item.id >= 0;
  const targetId = hasValidId ? item.id : getNextNewsId();
  const targetPath = path.join(NEWS_DIR, `${targetId}.js`);

  fs.writeFileSync(targetPath, buildNewsModuleCode(item), "utf8");
  const news = await regenerateIndexAndJson();

  return {savedId: targetId, news};
}

async function saveAllNewsItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Nenhuma notícia enviada para salvamento.");
  }

  for (const item of items) {
    const error = validateNewsItem(item);
    if (error) {
      throw new Error(`Erro em "${item?.title || "Nova Notícia"}": ${error}`);
    }
  }

  let nextId = getNextNewsId();
  for (const item of items) {
    const hasValidId = typeof item.id === "number" && Number.isInteger(item.id) && item.id >= 0;
    const targetId = hasValidId ? item.id : nextId++;
    const targetPath = path.join(NEWS_DIR, `${targetId}.js`);
    fs.writeFileSync(targetPath, buildNewsModuleCode(item), "utf8");
  }

  const news = await regenerateIndexAndJson();
  return {savedCount: items.length, news};
}

async function deleteNewsItem(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 0) {
    throw new Error("ID da notícia inválido.");
  }

  const targetPath = path.join(NEWS_DIR, `${numericId}.js`);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Arquivo src/assets/news/${numericId}.js não encontrado.`);
  }

  fs.unlinkSync(targetPath);
  const news = await regenerateIndexAndJson();
  return {deletedId: numericId, news};
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Corpo da requisição não é um JSON válido."));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

export function newsManagementVitePlugin() {
  return {
    name: "news-management-dev-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = (req.url || "").split("?")[0];

        if (!pathname.startsWith("/__news-management/")) {
          next();
          return;
        }

        try {
          if (req.method === "GET" && pathname === "/__news-management/data") {
            const news = await readAllNews();
            const images = listAvailableImages();
            sendJson(res, 200, {ok: true, news, images});
            return;
          }

          if (req.method === "POST" && pathname === "/__news-management/save") {
            const body = await readJsonBody(req);
            if (body.mode === "single") {
              const result = await saveSingleNewsItem(body.item);
              sendJson(res, 200, {ok: true, ...result});
              return;
            }
            if (body.mode === "all") {
              const result = await saveAllNewsItems(body.items);
              sendJson(res, 200, {ok: true, ...result});
              return;
            }
            sendJson(res, 400, {ok: false, error: "Modo de salvamento inválido."});
            return;
          }

          if (req.method === "POST" && pathname === "/__news-management/delete") {
            const body = await readJsonBody(req);
            const result = await deleteNewsItem(body.id);
            sendJson(res, 200, {ok: true, ...result});
            return;
          }

          sendJson(res, 404, {ok: false, error: "Rota não encontrada."});
        } catch (error) {
          sendJson(res, 400, {ok: false, error: error.message || "Erro interno ao processar notícias."});
        }
      });
    },
  };
}
