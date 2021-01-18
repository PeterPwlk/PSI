import { readFileSync } from 'fs';

export class JsonFileReader {
    readAndMap(path: string) {
        const file = readFileSync(path);
        const data = JSON.parse(file);
        console.log(data);
        return data;
    }
}