import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn
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

  // Relacionamento com o GrupoEntity
  @ManyToOne(() => GrupoEntity, (grupo) => grupo.id)
  @JoinColumn({ name: 'grupoId' })
  grupoId!: string

  // Relacionamento com o UsuarioEntity
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  @JoinColumn({ name: 'usuarioId' })
  usuarioId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
