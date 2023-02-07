import { Exam } from "src/exam/entities/exam.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubmissionTask } from "./submission.task.entity";

@Entity()
export class Submission {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    term: string;

    @Column({name: "zip_file"})
    zipFile: string;

    @Column({name: "created_by"})
    createdBy: string;

    @Column({ type: 'timestamptz', name: 'created_at' }) 
    createdAt: Date;

    @ManyToOne(() => Exam, (exam) => exam.tasks)
    @JoinColumn({ name: "exam_id" })
    exam: Exam;

    @OneToMany(type => SubmissionTask, (submissionTask) => submissionTask.submission)
    submissionTasks: SubmissionTask[]

    
}
