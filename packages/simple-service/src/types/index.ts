/* eslint-disable @typescript-eslint/no-explicit-any */
import type { i18n } from "i18next";

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

export interface GatewayEnvConfig {
  address?: string;
}

export type I18nType = i18n;