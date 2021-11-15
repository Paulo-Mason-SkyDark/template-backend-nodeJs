import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './image';

@Entity('adm')
export default class Adm {

	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	nome: string;

	@Column()
	nome_empresa: string;

	@Column()
	email: string;

	@Column()
	senha: string;

	@Column()
	chave_acesso: string;

	@OneToMany(() => Image, image => image.adm, {
		cascade: ['insert', 'update']
	})
	@JoinColumn({ name: 'adm_id' })
	images: Image[];
}