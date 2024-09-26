import {
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TUsuarioModel } from '../../../domain/usuario/UsuarioModel'

// Constantes
import { cTABELA_USUARIO } from '../constants/ConstantesPostgres'

@Entity({ name: cTABELA_USUARIO })
export default class UsuarioEntity implements TUsuarioModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Unique(['email'])
  @Column({ name: 'email', length: 255, nullable: false })
  email!: string

  @Column({ name: 'senha', length: 255, nullable: false })
  senha!: string

  @Column({ name: 'role', length: 255, nullable: false })
  role!: string

  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
