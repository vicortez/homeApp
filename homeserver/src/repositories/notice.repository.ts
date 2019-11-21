import {DefaultCrudRepository} from '@loopback/repository';
import {Notice, NoticeRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NoticeRepository extends DefaultCrudRepository<
  Notice,
  typeof Notice.prototype.id,
  NoticeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Notice, dataSource);
  }
}
