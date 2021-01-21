import { readFileSync } from 'fs';

export class JsonFileReader {
    readAndMap(path: string) {
        const file = readFileSync(path);
        if (typeof file === "string") {
            const data = JSON.parse(file);
            console.log(`Read data from ${path} - count:${data.length}`);
            return data;
        }
        throw new Error(`Error reading file: ${path}`)
    }
}