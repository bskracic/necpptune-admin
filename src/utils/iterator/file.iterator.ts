export class StudentFileData {
    identifier: string;
    files: string[];
}

export interface FileIterator {
    hasNext(): boolean;
    next(): StudentFileData
}