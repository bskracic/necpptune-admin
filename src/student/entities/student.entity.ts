import { SubmissionTask } from "src/submission/entities/submission.task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'infoeduka_slug', unique: true})
    infoedukaSlug: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    group: string;

    @OneToMany(type => SubmissionTask, st => st.student)
    submissionTasks: SubmissionTask[]
}
