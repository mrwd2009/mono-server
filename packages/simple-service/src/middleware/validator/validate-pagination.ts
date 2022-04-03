import Joi, { isSchema, ObjectSchema } from 'joi';
import _ from 'lodash';
import { DefaultContext } from 'koa';
import { Order, WhereOptions, Op } from '@sequelize/core';
import { Middleware } from '@koa/router';
import { validator, SchemaGroup } from './validator';

interface Options {
  filter?: (Schema: typeof Joi) => SchemaGroup;
  sorter?: Array<string>;
  format?: {
    like?: Array<string>;
    equal?: Array<string>;
  };
}
export const validatePagination = (options: Options = {}): Middleware => {
  let filter: ObjectSchema;
  if (options.filter) {
    filter = options.filter(Joi) as ObjectSchema;
    filter = isSchema(filter) ? filter : Joi.object(filter).optional();
  } else {
    filter = Joi.object().optional();
  }

  const formatData = (context: DefaultContext) => {
    if (!options.format) {
      return;
    }
    const {
      filter,
      sorter,
      pagination: { current, pageSize },
    } = context.mergedParams;

    let order: Order = [];
    if (sorter) {
      order = [[sorter.field, sorter.order]];
    }

    const where: WhereOptions = {};
    if (filter) {
      _.forEach(options.format.like, (field) => {
        where[field] = {
          [Op.like]: `%${filter[field]}%`,
        };
      });
      _.forEach(options.format.equal, (field) => {
        where[field] = {
          [Op.eq]: `%${filter[field]}%`,
        };
      });
    }

    return {
      limit: pageSize,
      offset: (current - 1) * pageSize,
      order,
      where,
    };
  };
  return validator(
    (Schema) => {
      return Schema.object({
        pagination: Schema.object({
          current: Schema.number().integer().min(1),
          pageSize: Schema.number().integer().min(1).max(100),
        }),
        filter,
        sorter: Schema.object({
          field: options.sorter ? Schema.string().valid(...options.sorter) : Schema.string(),
          order: Schema.string().valid('ASC', 'DESC', 'asc', 'desc'),
        }).optional(),
      });
    },
    {
      formatData,
    },
  );
};
