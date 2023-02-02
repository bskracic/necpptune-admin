import { Student } from "src/student/entities/student.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Submission } from "./submission.entity";


@Entity({name: "submission_task"})
export class SubmissionTask {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Student, (student) => [])
    @JoinColumn({ name: "student_id" })
    student: Student;

    @ManyToOne(() => Task, (task) => [])
    @JoinColumn({ name: "task_id" })
    task: Task;

    @ManyToOne(() => Submission, (submission) => [])
    @JoinColumn({ name: "submission_id" })
    submission: Submission;

    @Column({ name: "file_details" })
    fileDetails: string;

    @Column({ name: "file_link" })
    fileLink: string;

    @Column({ name: 'max_points', type: "decimal", precision: 10, scale: 2, nullable: true })
    scorredPoints: Double;

    @Column({ nullable: true })
    note: string;
}