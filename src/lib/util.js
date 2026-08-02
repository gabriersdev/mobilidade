import {readdir} from 'fs/promises';
import path from 'path';
import {ignoreList} from '../assets/ignore-list.js';

export async function* getFiles(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    
    if (dirent.isDirectory()) {
      if (!ignoreList.includes(dirent.name)) {
        yield* getFiles(res);
      }
    } else {
      yield res;
    }
  }
}
