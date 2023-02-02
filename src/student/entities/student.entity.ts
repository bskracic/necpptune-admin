import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'infoeduka_slug'})
    infoedukaSlug: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    group: string;
}
