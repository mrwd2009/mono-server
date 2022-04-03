/* eslint-disable @typescript-eslint/no-explicit-any */
import type { i18n } from "i18next";
import { Order, WhereOptions, } from '@sequelize/core';

export type MergedParams = any;

export interface PageParams {
  filter?: any;
  sorter?: {
    field: string;
    order: string;
  };
  pagination: {
    current: number;
    pageSize: number;
  };
  [otherKey: string]: any;
}

export interface FormattedPageParams {
  limit: number;
  offset: number;
  order: Order;
  where: WhereOptions;
}

export interface GatewayEnvConfig {
  address?: string;
}

export type I18nType = i18n;