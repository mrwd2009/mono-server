/* eslint-disable @typescript-eslint/no-explicit-any */

export type MergedParams = any;

export interface PageParams {
  filter?: any,
  sorter?: {
    field: string,
    order: string
  },
  pagination: {
    current: number,
    pageSize: number,
  },
  [otherKey: string]: any,
}

