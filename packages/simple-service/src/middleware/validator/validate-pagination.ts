import Joi, { isSchema, ObjectSchema } from 'joi';
import { Middleware } from '@koa/router';
import { validator, SchemaGroup } from './validator';

interface Options {
  filter?: (Schema: typeof Joi) => SchemaGroup;
  sorter?: Array<string>;
}
export const validatePagination = (options: Options = {}): Middleware => {
  let filter: ObjectSchema;
  if (options.filter) {
    filter = options.filter(Joi) as ObjectSchema;
    filter = isSchema(filter) ? filter : Joi.object(filter).optional();
  } else {
    filter = Joi.object().optional();
  }
  return validator((Schema) => {
    return Schema.object({
      pagination: Schema.object({
        current: Schema.number().integer().min(1),
        pageSize: Schema.number().integer().min(1).max(100),
      }),
      filter,
      sorter: Schema.object({
        field: options.sorter ? Schema.string().valid(options.sorter) : Schema.string(),
        order: Schema.string().valid('ASC', 'DESC', 'asc', 'desc'),
      }).optional(),
    });
  });
};
