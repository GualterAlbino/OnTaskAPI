import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'

// Domain
import { THistoricoAtividadeModel } from '../../../domain/historico-atividade/HistoricoAtividadeModel'

// Constantes
import { cTABELA_HISTORICO_ATIVIDADE } from '../constants/ConstantesPostgres'

// Entities
import AtividadeEntity from './AtividadeEntity'

@Entity({ name: cTABELA_HISTORICO_ATIVIDADE })
export default class HistoricoAtividadeEntity
  implements THistoricoAtividadeModel
{
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'inicio', nullable: false })
  inicio!: Date

  @Column({ name: 'termino', nullable: false })
  termino!: Date

  //Relacionamentos
  @ManyToOne(() => AtividadeEntity, (atividade) => atividade.id)
  @Column({ name: 'statusId', length: 255, nullable: false })
  atividadeId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
