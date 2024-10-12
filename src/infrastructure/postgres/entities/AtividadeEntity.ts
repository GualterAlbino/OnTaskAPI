import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TAtividadeModel } from '../../../domain/atividade/AtividadeModel'

// Constantes
import { cTABELA_ATIVIDADE } from '../constants/ConstantesPostgres'

// Entities

@Entity({ name: cTABELA_ATIVIDADE })
export default class AtividadeEntity implements TAtividadeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'inicio', nullable: false })
  inicio!: Date

  @Column({ name: 'termino', nullable: false })
  termino!: Date

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @Column({ name: 'emExecucao', nullable: false })
  emExecucao!: boolean

  @Column({ name: 'previsaoInicio', nullable: false })
  previsaoInicio!: Date

  @Column({ name: 'previsaoTermino', nullable: false })
  previsaoTermino!: Date

  @Column({ name: 'tempoEstimadoMinutos', nullable: false })
  tempoEstimadoMinutos!: number

  //Relaciaonamentos
  @Column({ name: 'usuarioId', type: 'uuid' })
  usuarioId!: string

  @Column({ name: 'projetoId', type: 'uuid' })
  projetoId!: string

  @Column({ name: 'statusId', type: 'uuid' })
  statusId!: string

  @Column({ name: 'tipoAtividadeId', type: 'uuid' })
  tipoAtividadeId!: string

  @Column({ name: 'dificuldadeAtividadeId', type: 'uuid' })
  dificuldadeAtividadeId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
