import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TDificuldadeAtividadeModel } from '../../../domain/dificuldade-atividade/DificuldadeAtividadeModel'

// Constantes
import { cTABELA_DIFICULDADE_ATIVIDADE } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'
import ProjetoEntity from './ProjetoEntity'

@Entity({ name: cTABELA_DIFICULDADE_ATIVIDADE })
export default class DificuldadeAtividadeEntity
  implements TDificuldadeAtividadeModel
{
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'tempoMinutos', nullable: false })
  tempoMinutos!: number

  //Relacionamentos
  @ManyToOne(() => ProjetoEntity, (projeto) => projeto.id)
  projetoId!: string

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  usuarioId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
