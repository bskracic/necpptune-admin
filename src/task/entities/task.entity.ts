import { Exam } from "src/exam/entities/exam.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    prompt: string;

    @Column({name: 'learning_outcome'})
    learningOutcome: number;

    @Column({name: 'exam_group'})
    group: string;

    @Column({name: 'max_points', type: "decimal", precision: 10, scale: 2, default: 0})
    maxPoints: number;

    @ManyToOne(() => Exam, (exam) => exam.tasks)
    @JoinColumn({ name: "exam_id" })
    exam: Exam;
}

