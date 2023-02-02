import { Readable } from "typeorm/platform/PlatformTools";
import UnzipStrategy from "./unzip.strategy";
const unzip = require('unzip-stream');

export class DefaultUnzipStrategy implements UnzipStrategy {
    unzip(fileBuffer: Buffer, path: string) {
        const readable = new Readable()
        readable._read = () => { }
        readable.push(fileBuffer)
        readable.push(null)

        
        readable.pipe(unzip.Extract({ path: path }))
    }

}