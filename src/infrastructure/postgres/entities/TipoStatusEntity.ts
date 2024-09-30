import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TTipoStatusModel } from '../../../domain/tipo-status/TipoStatusModel'

// Constantes
import { cTABELA_TIPO_STATUS } from '../constants/ConstantesPostgres'

@Entity({ name: cTABELA_TIPO_STATUS })
export default class TipoStatusEntity implements TTipoStatusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'tipo', length: 255, nullable: false })
  tipo!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
