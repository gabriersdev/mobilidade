import {readFile} from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {getFiles} from '../src/lib/Util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lineLimit = parseInt(process.argv[2], 10) || 100;
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx'];

(async () => {
  try {
    console.log(`Buscando arquivos com mais de ${lineLimit} linhas...\n`);
    console.log(`Diretório de busca: ${srcDir}\n`);
    
    let count = 0;
    
    for await (const filePath of getFiles(srcDir)) {
      if (!allowedExtensions.includes(path.extname(filePath))) {
        continue;
      }
      
      try {
        const content = await readFile(filePath, 'utf8');
        const lines = content.split('\n').length;
        
        if (lines > lineLimit) {
          const absolutePath = path.resolve(filePath);
          console.log(`${absolutePath}:${lines}:1`);
          count++;
        }
      } catch (readErr) {
        // Ignora arquivos ilegíveis
      }
    }
    
    if (count === 0) console.log('Nenhum arquivo encontrado com esse limite de linhas.');
    else console.log(`\nTotal de arquivos encontrados: ${count}`);
  } catch (err) {
    console.error('Erro ao buscar arquivos:', err);
  }
})();
