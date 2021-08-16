import { createMetadataMap } from '@automapper/pojos'
import mapper from '../mapper'

export type StatusCard = 'pending' | 'active' | 'bans' | 'remove'

export interface Card {
  id: number
  user_id: number
  cover_picture: string
  profile_picture: string
  name: string
  title: string
  about: string
  qr_scan: string
  status: StatusCard
  meta: CardInformation[]
  company_id: number
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface CardInformation {
  card_id: number
  type: number
  value: string
  label: string
  position: number
  created_at: string
  updated_at: string
}

export interface CardEntity {
  id: number
  userId: number
  coverPicture: string
  profilePicture: string
  name: string
  title: string
  about: string
  qrScan: string
  status: StatusCard
  meta: CardInformationEntity[]
  companyId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface CardInformationEntity {
  cardId: number
  type: number
  value: string
  label: string
  position: number
  createdAt: string
  updatedAt: string
}

createMetadataMap<CardInformation>('CardInformation', {
  card_id: Number,
  type: Number,
  value: String,
  label: String,
  position: Number,
  created_at: String,
  updated_at: String,
})

createMetadataMap<CardInformationEntity>('CardInformationEntity', {
  cardId: Number,
  type: Number,
  value: String,
  label: String,
  position: Number,
  createdAt: String,
  updatedAt: String,
})

createMetadataMap<Card>('Card', {
  id: Number,
  user_id: Number,
  cover_picture: String,
  profile_picture: String,
  name: String,
  title: String,
  about: String,
  qr_scan: String,
  status: String,
  meta: 'CardInformation',
  company_id: Number,
  created_at: String,
  updated_at: String,
  deleted_at: String,
})

createMetadataMap<CardEntity>('CardEntity', {
  id: Number,
  userId: Number,
  coverPicture: String,
  profilePicture: String,
  name: String,
  title: String,
  about: String,
  qrScan: String,
  status: String,
  meta: 'CardInformationEntity',
  companyId: Number,
  createdAt: String,
  updatedAt: String,
  deletedAt: String,
})

mapper.createMap<CardInformation, CardInformationEntity>('CardInformation', 'CardInformationEntity')
mapper.createMap<Card, CardEntity>('Card', 'CardEntity')

export const cardMap = (card: Card): CardEntity => mapper.map<Card, CardEntity>(card, 'CardEntity', 'Card')
export const cardMapArray = (cards: Card[]): CardEntity[] =>
  mapper.mapArray<Card, CardEntity>(cards, 'CardEntity', 'Card')
