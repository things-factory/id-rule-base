import { config } from '@things-factory/env'
import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
const ORMCONFIG = config.get('ormconfig', {})
const DATABASE_TYPE = ORMCONFIG.type

export enum IdRuleType {
  PALLET_ID = 'pallet_id'
}

@Entity('id-rules')
@Index('ix_id_rule_0', (idRule: IdRule) => [idRule.domain, idRule.type], { unique: true })
@Index('ix_id_rule_1', (idRule: IdRule) => [idRule.domain])
@Index('ix_id_rule_2', (idRule: IdRule) => [idRule.type])
export class IdRule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column({
    nullable: false,
    type: DATABASE_TYPE == 'postgres' || DATABASE_TYPE == 'mysql' || DATABASE_TYPE == 'mariadb' ? 'enum' : 'smallint',
    enum: IdRuleType,
    default: IdRuleType.PALLET_ID
  })
  type: IdRuleType

  @Column()
  rule: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
