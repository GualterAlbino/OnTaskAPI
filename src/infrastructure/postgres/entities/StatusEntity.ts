import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TStatusModel } from '../../../domain/status/StatusModel'

// Constantes
import { cTABELA_STATUS } from '../constants/ConstantesPostgres'

// Entities
import GrupoEntity from './GrupoEntity'
import TipoStatusEntity from './TipoStatusEntity'

@Entity({ name: cTABELA_STATUS })
export default class StatusEntity implements TStatusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'status', length: 255, nullable: false })
  status!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  //Relacionamentos
  @Column({ name: 'tipoStatusId', type: 'uuid' })
  tipoStatusId!: string

  @Column({ name: 'grupoId', type: 'uuid' })
  grupoId!: string

  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
