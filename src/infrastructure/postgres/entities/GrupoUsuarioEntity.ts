import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column
} from 'typeorm'

// Domain
import { TGrupoUsuarioModel } from '../../../domain/grupo-usuario/GrupoUsuarioModel'

// Constantes
import { cTABELA_GRUPO_USUARIO } from '../constants/ConstantesPostgres'

// Entities
import GrupoEntity from './GrupoEntity'
import UsuarioEntity from './UsuarioEntity'

@Entity({ name: cTABELA_GRUPO_USUARIO })
export default class GrupoUsuarioEntity implements TGrupoUsuarioModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'grupoId', type: 'uuid' })
  grupoId!: string

  @Column({ name: 'usuarioId', type: 'uuid' })
  usuarioId!: string

  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
