export interface Contact {
  id: number
  user_id: number
  card_id: number
  name: string
  title: string
  about: string
  qr_scan: string
  meta: ContactInformation[]
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface ContactInformation {
  contact_id: number
  value: string
  label: string
  position: number
  created_at: string
  updated_at: string
}

export interface ContactEntity {
  id: number
  userId: number
  cardId: number
  name: string
  title: string
  about: string
  qrScan: string
  meta: ContactInformation[]
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface ContactInformationEntity {
  contactId: number
  value: string
  label: string
  position: number
  createdAt: string
  updatedAt: string
}

