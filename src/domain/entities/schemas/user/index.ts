import { schema } from 'normalizr'
import { UserEntity } from '@/domain/entities/models/user'

export type UserNormalizedEntity = Record<number, UserEntity>

export const user = new schema.Entity('users')
export const users = [user]
