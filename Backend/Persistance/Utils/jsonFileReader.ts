import { readFileSync } from 'fs';

export class JsonFileReader {
    readAndMap(path: string) {
        const file = readFileSync(path);
        const data = JSON.parse(file);
        console.log(`Read data from ${path} - count:${data.length}`);
        return data;
    }
}