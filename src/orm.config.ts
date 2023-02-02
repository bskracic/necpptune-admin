import { DataSource } from "typeorm";
import { Exam } from "./exam/entities/exam.entity";
import { Task } from "./task/entities/task.entity";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'ncpptAdmin',
    password: 'myselfpreorderblinkedalmanacchubby',
    database: 'necpptunedb',
    entities: [Exam, Task],
  });