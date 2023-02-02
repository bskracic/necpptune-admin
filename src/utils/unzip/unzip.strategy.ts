export default interface UnzipStrategy {
    unzip(file: Buffer, path: string);
}