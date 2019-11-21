import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Notice extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
  })
  date?: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  crossedOut: boolean;


  constructor(data?: Partial<Notice>) {
    super(data);
  }
}

export interface NoticeRelations {
  // describe navigational properties here
}

export type NoticeWithRelations = Notice & NoticeRelations;
