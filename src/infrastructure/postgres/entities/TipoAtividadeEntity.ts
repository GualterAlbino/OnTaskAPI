import {
  Column,
  Entity,
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
import GrupoEntity from './GrupoEntity'

@Entity({ name: cTABELA_TIPO_ATIVIDADE })
export default class TipoAtividadeEntity implements TTipoAtividadeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'tipo', length: 255, nullable: false })
  descricao!: string

  // Relacionamentos
  @ManyToOne(() => GrupoEntity, (grupo) => grupo.id)
  @Column({ name: 'grupoId', length: 255, nullable: false })
  grupoId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
