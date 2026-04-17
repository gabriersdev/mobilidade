// Importa as funções necessárias do módulo 'fs/promises'
import {writeFile, unlink, stat, readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Config
// Define o nome do arquivo JSON
const fileName = 'register.build.json';

// Constrói o caminho absoluto para o arquivo de forma segura em ES Modules
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(DIRNAME, "public", fileName);
const packageJsonPath = path.join(DIRNAME, "package.json");
const serviceWorkerPath = path.join(DIRNAME, "public", "service-worker.js");

// Função principal assíncrona para criar ou recriar o arquivo JSON.
async function managerFile() {
  try {
    // 1. Lê o package.json para obter a versão
    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    const version = packageJson.version;

    // 2. Lê o service-worker.js para obter a versão do cache
    let cacheVersion = "Não definido";
    try {
      const swContent = await readFile(serviceWorkerPath, 'utf-8');
      const match = swContent.match(/const cacheNumber = (\d+)/);
      if (match && match[1]) {
        cacheVersion = `V${match[1]}`;
      }
    } catch (swError) {
      console.warn("Não foi possível ler o service-worker.js:", swError.message);
    }

    const code = Date.now();
    const datetimeCreate = new Date().toISOString();
    
    const data = {
      version: version,
      cacheVersion: cacheVersion,
      code: code,
      datetimeCreate: datetimeCreate
    };
    
    const dadosEmJson = JSON.stringify(data, null, 2);
    
    // 3. Verifica se o arquivo já existe e o apaga
    try {
      await stat(filePath); 
      await unlink(filePath);
      console.log('Arquivo existente apagado com sucesso.');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(error);
      }
    }
    
    // 4. Cria o novo arquivo com os dados
    await writeFile(filePath, dadosEmJson);
    console.log(`Arquivo JSON "${fileName}" foi criado com sucesso em: ${filePath}`);
    
  } catch (err) {
    console.error('Ocorreu um erro ao gerenciar o arquivo:', err);
  }
}

// Executa a função principal
managerFile().then(() => {
});
