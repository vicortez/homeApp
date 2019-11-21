import {DefaultCrudRepository} from '@loopback/repository';
import {ShoppingListItem, ShoppingListItemRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ShoppingListItemRepository extends DefaultCrudRepository<
  ShoppingListItem,
  typeof ShoppingListItem.prototype.id,
  ShoppingListItemRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ShoppingListItem, dataSource);
  }
}
