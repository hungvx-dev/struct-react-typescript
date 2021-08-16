import { CardInformation, Card } from '@/domain/entities/models/card'
import { User } from '@/domain/entities/models/user'

export const cardInformation: CardInformation[] = [
  {
    card_id: 123,
    type: 123,
    value: 'string',
    label: 'string',
    position: 123,
    created_at: 'string',
    updated_at: 'string',
  },
  {
    card_id: 123,
    type: 123,
    value: 'string',
    label: 'string',
    position: 123,
    created_at: 'string',
    updated_at: 'string',
  },
]

export const cards: Card[] = [
  {
    id: 123,
    user_id: 123,
    cover_picture: 'string',
    profile_picture: 'string',
    name: 'string',
    title: 'string',
    about: 'string',
    qr_scan: 'string',
    status: 'pending',
    meta: cardInformation,
    company_id: 123,
    created_at: 'string',
    updated_at: 'string',
    deleted_at: 'string',
  },
  {
    id: 12,
    user_id: 123,
    cover_picture: 'string',
    profile_picture: 'string',
    name: 'string',
    title: 'string',
    about: 'string',
    qr_scan: 'string',
    status: 'pending',
    meta: cardInformation,
    company_id: 123,
    created_at: 'string',
    updated_at: 'string',
    deleted_at: 'string',
  },
]

export const user: User = {
  id: 12,
  name: 'hung',
  title: 'asf',
  department: 'adf',
  user_name: 'ha',
  ip_address: 'string',
  is_active: 'string',
  sum_card: 'string',
  sum_contact: 'string',
  company_id: 123,
  vip_id: 123,
  created_at: 'string',
  updated_at: 'string',
  deleted_at: 'string',
}

export const users: User[] = [
  {
    id: 2,
    name: 'hung',
    title: 'asf',
    department: 'adf',
    user_name: 'ha',
    ip_address: 'string',
    is_active: 'string',
    sum_card: 'string',
    sum_contact: 'string',
    company_id: 123,
    vip_id: 123,
    created_at: 'string',
    updated_at: 'string',
    deleted_at: 'string',
  },
  {
    id: 1,
    name: 'hung',
    title: 'asf',
    department: 'adf',
    user_name: 'ha',
    ip_address: 'string',
    is_active: 'string',
    sum_card: 'string',
    sum_contact: 'string',
    company_id: 123,
    vip_id: 123,
    created_at: 'string',
    updated_at: 'string',
    deleted_at: 'string',
  },
]
