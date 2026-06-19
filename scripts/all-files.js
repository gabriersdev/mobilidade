import path from 'path';
import {fileURLToPath} from 'url';
import {getFiles} from '../src/lib/Util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

(async () => {
  try {
    console.log('Listando todos os arquivos do projeto...\n');
    console.log(`Diretório raiz: ${rootDir}\n`);
    
    for await (const filePath of getFiles(rootDir)) {
      console.log(`${filePath}:1:1`);
    }
  } catch (err) {
    console.error('Erro ao listar arquivos:', err);
  }
})();
