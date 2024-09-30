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
import { TStatusModel } from '../../../domain/status/StatusModel'

// Constantes
import { cTABELA_STATUS } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'
import TipoStatusEntity from './TipoStatusEntity'

@Entity({ name: cTABELA_STATUS })
export default class StatusEntity implements TStatusModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'status', length: 255, nullable: false })
  status!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  @Column({ name: 'usuarioId', length: 255, nullable: false })
  usuarioId!: string

  @ManyToOne(() => TipoStatusEntity, (tipoStatus) => tipoStatus.id)
  tipoStatusId!: string

  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
