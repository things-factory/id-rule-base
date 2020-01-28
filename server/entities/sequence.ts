import { Domain } from '@things-factory/shell'
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('sequences')
@Index('ix_sequence_0', (seq: Sequence) => [seq.domain, seq.pattern], { unique: true })
@Index('ix_sequence_1', (seq: Sequence) => [seq.pattern])
@Index('ix_sequence_2', (seq: Sequence) => [seq.expiresAt])
export class Sequence {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Domain)
  domain: Domain

  @Column()
  pattern: string

  @Column({
    type: 'smallint'
  })
  seq: number

  @Column()
  expiresAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
