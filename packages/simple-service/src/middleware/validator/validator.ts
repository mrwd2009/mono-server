import Joi, { AsyncValidationOptions, Schema } from 'joi';
import { Middleware } from '@koa/router';
import keys from 'lodash/keys';
import get from 'lodash/get';
import { ParamError } from '../../lib/error';

interface _SchemaGroup {
  [index: string]: Schema;
}

export type SchemaGroup = _SchemaGroup | Schema;

export type SchemaConstructor = (schema: typeof Joi) => SchemaGroup;

export const validator = (schemaC: SchemaConstructor, opts: AsyncValidationOptions = {}): Middleware => {
  const schema: SchemaGroup = schemaC(Joi);
  const options: AsyncValidationOptions = {
    allowUnknown: true,
    presence: 'required',
    ...opts,
  };
  const isSchema = Joi.isSchema(schema);
  const fieldKeys = isSchema ? ['mergedParams'] : keys(schema);
  const checkingSchema = isSchema ? { mergedParams: schema } : schema;
  return async (context, next) => {
    try {
      for (const field of fieldKeys) {
        await (get(checkingSchema, field) as Schema).validateAsync(get(context, field), options);
      }
      await next();
    } catch (error) {
      if (Joi.isError(error)) {
        throw new ParamError(error.message);
      }
      throw error;
    }
  };
};

export default validator;
