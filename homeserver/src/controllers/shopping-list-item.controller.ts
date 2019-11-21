import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ShoppingListItem} from '../models';
import {ShoppingListItemRepository} from '../repositories';

export class ShoppingListItemController {
  constructor(
    @repository(ShoppingListItemRepository)
    public shoppingListItemRepository : ShoppingListItemRepository,
  ) {}

  @post('/shopping-list-items', {
    responses: {
      '200': {
        description: 'ShoppingListItem model instance',
        content: {'application/json': {schema: {'x-ts-type': ShoppingListItem}}},
      },
    },
  })
  async create(@requestBody() shoppingListItem: ShoppingListItem): Promise<ShoppingListItem> {
    return await this.shoppingListItemRepository.create(shoppingListItem);
  }

  @get('/shopping-list-items/count', {
    responses: {
      '200': {
        description: 'ShoppingListItem model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ShoppingListItem)) where?: Where<ShoppingListItem>,
  ): Promise<Count> {
    return await this.shoppingListItemRepository.count(where);
  }

  @get('/shopping-list-items', {
    responses: {
      '200': {
        description: 'Array of ShoppingListItem model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ShoppingListItem}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ShoppingListItem)) filter?: Filter<ShoppingListItem>,
  ): Promise<ShoppingListItem[]> {
    return await this.shoppingListItemRepository.find(filter);
  }

  @patch('/shopping-list-items', {
    responses: {
      '200': {
        description: 'ShoppingListItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingListItem, {partial: true}),
        },
      },
    })
    shoppingListItem: ShoppingListItem,
    @param.query.object('where', getWhereSchemaFor(ShoppingListItem)) where?: Where<ShoppingListItem>,
  ): Promise<Count> {
    return await this.shoppingListItemRepository.updateAll(shoppingListItem, where);
  }

  @get('/shopping-list-items/{id}', {
    responses: {
      '200': {
        description: 'ShoppingListItem model instance',
        content: {'application/json': {schema: {'x-ts-type': ShoppingListItem}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ShoppingListItem> {
    return await this.shoppingListItemRepository.findById(id);
  }

  @patch('/shopping-list-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingListItem PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingListItem, {partial: true}),
        },
      },
    })
    shoppingListItem: ShoppingListItem,
  ): Promise<void> {
    await this.shoppingListItemRepository.updateById(id, shoppingListItem);
  }

  @put('/shopping-list-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingListItem PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() shoppingListItem: ShoppingListItem,
  ): Promise<void> {
    await this.shoppingListItemRepository.replaceById(id, shoppingListItem);
  }

  @del('/shopping-list-items/{id}', {
    responses: {
      '204': {
        description: 'ShoppingListItem DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.shoppingListItemRepository.deleteById(id);
  }
}
