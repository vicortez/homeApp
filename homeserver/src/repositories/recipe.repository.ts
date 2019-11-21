import {DefaultCrudRepository} from '@loopback/repository';
import {Recipe, RecipeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RecipeRepository extends DefaultCrudRepository<
  Recipe,
  typeof Recipe.prototype.id,
  RecipeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Recipe, dataSource);
  }
}
