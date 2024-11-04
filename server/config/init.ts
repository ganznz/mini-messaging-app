import { fileURLToPath } from "url";
import path from "path";
import { config } from "dotenv";

// load server env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../.env") });
