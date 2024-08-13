import * as Joi from 'joi-sql-injector-validator';

const quoteAndVendoQueryArraySchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
  sort: Joi.array().items(Joi.string().sqlInjectionFilter()).optional(),
  or: Joi.array().items(Joi.string().sqlInjectionFilter()).optional(),
});

const quoteAndVendoQueryStringSchema = Joi.object({
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).optional(),
  sort: Joi.alternatives().try(
    Joi.array().items(Joi.string().sqlInjectionFilter()).optional(),
    Joi.string().sqlInjectionFilter().optional(),
  ),
  or: Joi.alternatives().try(
    Joi.array().items(Joi.string().sqlInjectionFilter()).optional(),
    Joi.string().sqlInjectionFilter().optional(),
  ),
});

export const quoteAndVendoQuerySchema = Joi.alternatives(
  quoteAndVendoQueryArraySchema,
  quoteAndVendoQueryStringSchema,
);

export interface QuoteAndVendoQueryDto {
  page: number;
  limit: number;
  sort: string | Array<string>;
  or: string | Array<string>;
}
