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
import {Recipe} from '../models';
import {RecipeRepository} from '../repositories';

export class RecipeController {
  constructor(
    @repository(RecipeRepository)
    public recipeRepository : RecipeRepository,
  ) {}

  @post('/recipes', {
    responses: {
      '200': {
        description: 'Recipe model instance',
        content: {'application/json': {schema: {'x-ts-type': Recipe}}},
      },
    },
  })
  async create(@requestBody() recipe: Recipe): Promise<Recipe> {
    return await this.recipeRepository.create(recipe);
  }

  @get('/recipes/count', {
    responses: {
      '200': {
        description: 'Recipe model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Recipe)) where?: Where<Recipe>,
  ): Promise<Count> {
    return await this.recipeRepository.count(where);
  }

  @get('/recipes', {
    responses: {
      '200': {
        description: 'Array of Recipe model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Recipe}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Recipe)) filter?: Filter<Recipe>,
  ): Promise<Recipe[]> {
    return await this.recipeRepository.find(filter);
  }

  @patch('/recipes', {
    responses: {
      '200': {
        description: 'Recipe PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {partial: true}),
        },
      },
    })
    recipe: Recipe,
    @param.query.object('where', getWhereSchemaFor(Recipe)) where?: Where<Recipe>,
  ): Promise<Count> {
    return await this.recipeRepository.updateAll(recipe, where);
  }

  @get('/recipes/{id}', {
    responses: {
      '200': {
        description: 'Recipe model instance',
        content: {'application/json': {schema: {'x-ts-type': Recipe}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Recipe> {
    return await this.recipeRepository.findById(id);
  }

  @patch('/recipes/{id}', {
    responses: {
      '204': {
        description: 'Recipe PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recipe, {partial: true}),
        },
      },
    })
    recipe: Recipe,
  ): Promise<void> {
    await this.recipeRepository.updateById(id, recipe);
  }

  @put('/recipes/{id}', {
    responses: {
      '204': {
        description: 'Recipe PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recipe: Recipe,
  ): Promise<void> {
    await this.recipeRepository.replaceById(id, recipe);
  }

  @del('/recipes/{id}', {
    responses: {
      '204': {
        description: 'Recipe DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recipeRepository.deleteById(id);
  }
}
