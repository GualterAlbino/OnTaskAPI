import {
  Entity,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TParticipanteProjetoModel } from '../../../domain/participante_projeto/ParticipanteProjetoModel'

// Constantes
import { cTABELA_PARTICIPANTE_PROJETO } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'
import ProjetoEntity from './ProjetoEntity'

@Entity({ name: cTABELA_PARTICIPANTE_PROJETO })
export default class ParticipanteProjetoEntity
  implements TParticipanteProjetoModel
{
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.id)
  usuarioId!: string

  @ManyToMany(() => ProjetoEntity, (projeto) => projeto.id)
  projetoId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
