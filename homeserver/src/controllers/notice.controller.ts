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
import {Notice} from '../models';
import {NoticeRepository} from '../repositories';

export class NoticeController {
  constructor(
    @repository(NoticeRepository)
    public noticeRepository : NoticeRepository,
  ) {}

  @post('/notices', {
    responses: {
      '200': {
        description: 'Notice model instance',
        content: {'application/json': {schema: {'x-ts-type': Notice}}},
      },
    },
  })
  async create(@requestBody() notice: Notice): Promise<Notice> {
    return await this.noticeRepository.create(notice);
  }

  @get('/notices/count', {
    responses: {
      '200': {
        description: 'Notice model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Notice)) where?: Where<Notice>,
  ): Promise<Count> {
    return await this.noticeRepository.count(where);
  }

  @get('/notices', {
    responses: {
      '200': {
        description: 'Array of Notice model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Notice}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Notice)) filter?: Filter<Notice>,
  ): Promise<Notice[]> {
    return await this.noticeRepository.find(filter);
  }

  @patch('/notices', {
    responses: {
      '200': {
        description: 'Notice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notice, {partial: true}),
        },
      },
    })
    notice: Notice,
    @param.query.object('where', getWhereSchemaFor(Notice)) where?: Where<Notice>,
  ): Promise<Count> {
    return await this.noticeRepository.updateAll(notice, where);
  }

  @get('/notices/{id}', {
    responses: {
      '200': {
        description: 'Notice model instance',
        content: {'application/json': {schema: {'x-ts-type': Notice}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Notice> {
    return await this.noticeRepository.findById(id);
  }

  @patch('/notices/{id}', {
    responses: {
      '204': {
        description: 'Notice PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notice, {partial: true}),
        },
      },
    })
    notice: Notice,
  ): Promise<void> {
    await this.noticeRepository.updateById(id, notice);
  }

  @put('/notices/{id}', {
    responses: {
      '204': {
        description: 'Notice PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notice: Notice,
  ): Promise<void> {
    await this.noticeRepository.replaceById(id, notice);
  }

  @del('/notices/{id}', {
    responses: {
      '204': {
        description: 'Notice DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.noticeRepository.deleteById(id);
  }
}
