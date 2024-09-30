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
import { TAtividadeModel } from '../../../domain/atividade/AtividadeModel'

// Constantes
import { cTABELA_ATIVIDADE } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'
import TipoStatusEntity from './TipoStatusEntity'
import ProjetoEntity from './ProjetoEntity'
import TipoAtividadeEntity from './TipoAtividadeEntity'
import StatusEntity from './StatusEntity'
import DificuldadeAtividadeEntity from './DificuldadeAtividadeEntity'

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
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  usuarioId!: string

  @ManyToOne(() => ProjetoEntity, (projeto) => projeto.id)
  projetoId!: string

  @ManyToOne(() => StatusEntity, (status) => status.id)
  statusId!: string

  @ManyToOne(() => TipoAtividadeEntity, (tipoAtividade) => tipoAtividade.id)
  tipoAtividadeId!: string

  @ManyToOne(
    () => DificuldadeAtividadeEntity,
    (dificuldadeAtividade) => dificuldadeAtividade.id
  )
  dificuldadeAtividadeId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
