import Joi, { AsyncValidationOptions, Schema } from 'joi';
import { DefaultContext } from 'koa'
import { Middleware } from '@koa/router';
import keys from 'lodash/keys';
import get from 'lodash/get';
import { ParamError } from '../../lib/error';

interface _SchemaGroup {
  [index: string]: Schema;
}

declare module 'koa' {
  interface DefaultContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validatorFormattedData?: any;
  }
}

export type SchemaGroup = _SchemaGroup | Schema;

export type SchemaConstructor = (schema: typeof Joi) => SchemaGroup;

interface Options extends AsyncValidationOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatData?: (data: DefaultContext) => any;
}

export const validator = (schemaC: SchemaConstructor, opts: Options = {}): Middleware => {
  const schema: SchemaGroup = schemaC(Joi);
  const options: Options = {
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
      // custom method to generate formatted data.
      if (options.formatData) {
        context.validatorFormattedData = options.formatData(context);
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
