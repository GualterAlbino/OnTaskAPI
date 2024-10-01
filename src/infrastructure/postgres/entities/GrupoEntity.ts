import {
  Entity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

// Domain
import { TGrupoModel } from '../../../domain/grupo/GrupoModel'

// Constantes
import { cTABELA_GRUPO } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'

@Entity({ name: cTABELA_GRUPO })
export default class GrupoEntity implements TGrupoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.id)
  usuarioResponsavelId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
