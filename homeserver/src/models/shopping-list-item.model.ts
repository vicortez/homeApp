import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ShoppingListItem extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  crossedOut: boolean;


  constructor(data?: Partial<ShoppingListItem>) {
    super(data);
  }
}

export interface ShoppingListItemRelations {
  // describe navigational properties here
}

export type ShoppingListItemWithRelations = ShoppingListItem & ShoppingListItemRelations;
