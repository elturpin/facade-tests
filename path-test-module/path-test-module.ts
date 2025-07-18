import { resolve } from 'path';

export function getPath(path: string) {
    return resolve(import.meta.dirname, path);
}
