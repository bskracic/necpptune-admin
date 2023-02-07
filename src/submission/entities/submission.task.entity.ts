import { Student } from "src/student/entities/student.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Submission } from "./submission.entity";


@Entity({name: "submission_task"})
export class SubmissionTask {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Student, s => s.submissionTasks)
    @JoinColumn({ name: "student_id" })
    student: Student;

    @ManyToOne(() => Task, (task) => [])
    @JoinColumn({ name: "task_id" })
    task: Task;

    @ManyToOne(() => Submission, (submission) => submission.submissionTasks)
    @JoinColumn({ name: "submission_id" })
    submission: Submission;

    @Column({ name: "file_details" })
    fileDetails: string;

    @Column({ name: "file_link" })
    fileLink: string;

    @Column({ name: 'max_points', type: "decimal", precision: 10, scale: 2, nullable: true })
    scorredPoints: number;

    @Column({ nullable: true })
    note: string;
}