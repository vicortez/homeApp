import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Recipe extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  ingredientsList?: string[];

  @property({
    type: 'string',
  })
  method?: string;


  constructor(data?: Partial<Recipe>) {
    super(data);
  }
}

export interface RecipeRelations {
  // describe navigational properties here
}

export type RecipeWithRelations = Recipe & RecipeRelations;
