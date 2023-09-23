import { fileURLToPath } from 'url';
import path from 'path'

export const Parent_Folder = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))))