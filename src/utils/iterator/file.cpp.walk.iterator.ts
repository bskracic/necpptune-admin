import { FileIterator, StudentFileData } from "./file.iterator";
import * as fs from 'fs';
var dir = require('node-dir');
const path = require('path');

export class FileCppWalkIterator implements FileIterator {

    private studentDatas: StudentFileData[];
    private index: number = 0;

    constructor(filepath: string) {
        const studentDirs = fs.readdirSync(path.normalize(filepath));
        
        this.studentDatas = [];

        studentDirs.forEach(studentDir => {
            const data = new StudentFileData();
            data.files = [];
            data.identifier = studentDir;
            dir.files(path.join(filepath, studentDir), {sync:true}).forEach(file => {
                if (this.isCpp(file)) {
                    const temp = file.split(path.sep);
                    const cppFile: string = path.join(temp[temp.length - 2], temp[temp.length - 1])
                    data.files.push(cppFile)
                }
            })
            this.studentDatas.push(data);
        })

        this.index = 0;   
    }

    private isCpp(filePath) {
        return filePath.split('.').pop() == 'cpp';
    }

    hasNext(): boolean {
        return this.index < this.studentDatas.length;
    }
    next(): StudentFileData {
        return this.studentDatas[this.index++];
    }

}