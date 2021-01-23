import { readFileSync } from 'fs';

export class JsonFileReader {
    readAndMap(path: string) {
        const file = readFileSync(path);
        if (typeof file === "object") {
            const data = JSON.parse(file.toString());
            console.log(`Read data from ${path} - count:${data.length}`);
            return data;
        }
        throw new Error(`Error reading file: ${path}`)
    }
}