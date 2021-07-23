import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MainPosts } from './MainPosts';
import { Stories } from './Stories';
import { Users } from './Users';

@Entity({ schema: 'travelover', name: 'announcements' })
export class Announcements {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'UserId ',
  })
  @Column()
  userId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'mainPost announcements',
    nullable: true,
  })
  @Column('int', { name: 'mainPostId', nullable: true })
  mainPostId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'story announcements',
    nullable: true,
  })
  @Column('int', { name: 'storyId', nullable: true })
  storyId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '新しいお知らせがあります',
    description: 'message to some user',
  })
  @Column('varchar', { name: 'content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.announcements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => MainPosts, (mainPosts) => mainPosts.announcements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'mainPostId' })
  mainPost: MainPosts;

  @ManyToOne(() => Stories, (stories) => stories.announcements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'storyId' })
  story: Stories;
}
