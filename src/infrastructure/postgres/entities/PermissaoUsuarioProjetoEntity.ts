import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

// Domain
import { TPermissaoUsuarioProjeto } from '../../../domain/permissao-usuario-projeto/PermissaoUsuarioProjetoModel'

// Constantes
import { cTABELA_PERMISSAO_USUARIO_PROJETO } from '../constants/ConstantesPostgres'

// Entities
import UsuarioEntity from './UsuarioEntity'
import ProjetoEntity from './ProjetoEntity'

@Entity({ name: cTABELA_PERMISSAO_USUARIO_PROJETO })
export default class PermissaoUsuarioProjetoEntity
  implements TPermissaoUsuarioProjeto
{
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'alterar', nullable: false })
  alterar!: boolean

  @Column({ name: 'excluir', nullable: false })
  excluir!: boolean

  @Column({ name: 'visualizar', nullable: false })
  visualizar!: boolean

  // Relacionamentos
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id)
  usuarioId!: string

  @ManyToOne(() => ProjetoEntity, (projeto) => projeto.id)
  projetoId!: string

  // Padrão
  @CreateDateColumn({ name: 'criadoEm' })
  criadoEm!: Date

  @UpdateDateColumn({ name: 'alteradoEm' })
  alteradoEm!: Date
}
