import { Readable } from "typeorm/platform/PlatformTools";
import UnzipStrategy from "./unzip.strategy";
const unzip = require('unzip-stream');

export class DefaultUnzipStrategy implements UnzipStrategy {
    async unzip(fileBuffer: Buffer, path: string): Promise<string> {
        const readable = new Readable()
        readable._read = () => { }
        readable.push(fileBuffer)
        readable.push(null)
    
        return await new Promise((resolve, reject) => {
            const request = unzip.Extract({ path: path });
            readable.pipe(request);
            request.on('finish', () => {
                resolve("finsihed");
            })
        });

        
    }

}