import { createMetadataMap } from '@automapper/pojos'
import mapper from '../mapper'

export interface User {
  id: number
  name: string
  title: string
  department: string
  user_name: string
  ip_address: string
  is_active: string
  sum_card: string
  sum_contact: string
  company_id?: number | null
  vip_id: number
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface UserEntity {
  id: number
  name: string
  title: string
  department: string
  userName: string
  ipAddress: string
  isActive: string
  sumCard: string
  sumContact: string
  companyId?: number | null
  vipId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

createMetadataMap<User>('User', {
  id: Number,
  name: String,
  title: String,
  department: String,
  user_name: String,
  ip_address: String,
  is_active: String,
  sum_card: String,
  sum_contact: String,
  company_id: Number,
  vip_id: Number,
  created_at: String,
  updated_at: String,
  deleted_at: String,
})

createMetadataMap<UserEntity>('UserEntity', {
  id: Number,
  name: String,
  title: String,
  department: String,
  userName: String,
  ipAddress: String,
  isActive: String,
  sumCard: String,
  sumContact: String,
  companyId: Number,
  vipId: Number,
  createdAt: String,
  updatedAt: String,
  deletedAt: String,
})

mapper.createMap<User, UserEntity>('User', 'UserEntity')

export const userMap = (user: User): UserEntity => mapper.map<User, UserEntity>(user, 'UserEntity', 'User')
export const userMapArray = (users: User[]): UserEntity[] =>
  mapper.mapArray<User, UserEntity>(users, 'UserEntity', 'User')
