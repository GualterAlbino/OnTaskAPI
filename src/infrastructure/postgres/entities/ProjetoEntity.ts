import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

// Domain
import { TProjetoModel } from '../../../domain/projeto/ProjetoModel'

// Constantes
import { cTABELA_PROJETO } from '../constants/ConstantesPostgres'

// Entities
import StatusEntity from './StatusEntity'
import UsuarioEntity from './UsuarioEntity'

@Entity({ name: cTABELA_PROJETO })
export default class ProjetoEntity implements TProjetoModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao!: string

  @Column({ name: 'nome', length: 255, nullable: false })
  nome!: string

  @Column({ name: 'logo', length: 255, nullable: false })
  logo!: string

  @Column({ name: 'inicio', nullable: false })
  inicio!: Date

  @Column({ name: 'termino', nullable: false })
  termino!: Date

  @Column({ name: 'previsaoInicio', nullable: false })
  previsaoInicio!: Date

  @Column({ name: 'previsaoTermino', nullable: false })
  previsaoTermino!: Date

  //Relacionamentos
  @Column({ name: 'statusId', type: 'uuid' })
  statusId!: string

  @Column({ name: 'grupoId', type: 'uuid' })
  grupoId!: string

  @Column({ name: 'usuarioResponsavelId', type: 'uuid' })
  usuarioResponsavelId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
