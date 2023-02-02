import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamptz' }) 
    createdAt: Date;
}
