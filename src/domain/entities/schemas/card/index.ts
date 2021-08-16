import { schema } from 'normalizr'
import { CardEntity } from '../../models/card'

export type CardNormalizedEntity = Record<number, CardEntity>

export const card = new schema.Entity('cards')
export const cards = [card]
