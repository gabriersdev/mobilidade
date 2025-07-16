// Importa as funções necessárias do módulo 'fs/promises'
import {writeFile, unlink, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// Config
// Define o nome do arquivo JSON
const fileName = 'register.build.json';

// Constrói o caminho absoluto para o arquivo de forma segura em ES Modules
const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(DIRNAME + "/public/", fileName);

// Função principal assíncrona para criar ou recriar o arquivo JSON.
async function managerFile() {
  try {
    // 1. Prepara os dados
    const code = Date.now();
    const datetimeCreate = new Date().toISOString();
    const data = {
      code: code,
      datetimeCreate: datetimeCreate
    };
    const dadosEmJson = JSON.stringify(data, null, 2);
    
    // 2. Verifica se o arquivo já existe e o apaga
    // Usar 'stat' dentro de um try-catch é uma forma robusta de verificar a existência
    try {
      await stat(filePath); // Tenta obter o status do arquivo
      await unlink(filePath); // Se não deu erro, o arquivo existe e será apagado
      console.log('Arquivo existente apagado com sucesso.');
    } catch (error) {
      // Se o erro for 'ENOENT', significa que o arquivo não existe, o que é esperado.
      if (error.code !== 'ENOENT') {
        throw error; // Se for outro erro, propaga o erro.
      }
    }
    
    // 3. Cria o novo arquivo com os dados
    await writeFile(filePath, dadosEmJson);
    console.log(`Arquivo JSON "${fileName}" foi criado com sucesso em: ${filePath}`);
    
  } catch (err) {
    // 4. Captura e exibe qualquer erro que possa ocorrer no processo
    console.error('Ocorreu um erro ao gerenciar o arquivo:', err);
  }
}

// Executa a função principal
managerFile().then(() => {
});