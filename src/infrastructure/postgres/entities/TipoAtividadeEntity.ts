import {
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

// Domain
import { TTipoAtividadeModel } from '../../../domain/tipo-atividade/TipoAtividadeModel'

// Constantes
import { cTABELA_TIPO_ATIVIDADE } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'

@Entity({ name: cTABELA_TIPO_ATIVIDADE })
export default class TipoAtividadeEntity implements TTipoAtividadeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'tipo', length: 255, nullable: false })
  descricao!: string

  // Relacionamentos
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  @Column({ name: 'usuarioId', length: 255, nullable: false })
  usuarioId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
