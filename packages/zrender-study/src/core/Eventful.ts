import { Dictionary, WithThisType } from './types';

export type EventCallbackSingleParam<EvtParam = any> = EvtParam extends any ? (params: EvtParam) => boolean | void : never;

export type EventCallback<EvtParams = any[]> = EvtParams extends any[] ? (...args: EvtParams) => boolean | void : never;

export type EventQuery = string | Object;

type CbThis<Ctx, Impl> = unknown extends Ctx ? Impl : Ctx;

type EventHandler<Ctx, Impl, EvtParams> = {
  h: EventCallback<EvtParams>,
  ctx: CbThis<Ctx, Impl>,
  query: EventQuery,
  callAtLast: boolean,
};

type DefaultEventDefinition = Dictionary<EventCallback<any[]>>;

export interface EventProcessor<EvtDef = DefaultEventDefinition> {
  normalizeQuery?: (query: EventQuery) => EventQuery;
  filter?: (eventType: keyof EvtDef, query: EventQuery) => boolean;
  afterTrigger?: (eventType: keyof EvtDef) => void;
}

export default class Eventful<EvtDef extends DefaultEventDefinition = DefaultEventDefinition> {
  private _$handlers: Map<string, EventHandler<any, any, any[]>[]>;

  protected _$eventProcessor: EventProcessor<EvtDef>;

  constructor(eventProcessor?: EventProcessor<EvtDef>) {
    if (eventProcessor) {
      this._$eventProcessor = eventProcessor;
    }
  }

  on<Ctx, EvtNm extends keyof EvtDef>(
    event: EvtNm,
    handler: WithThisType<EvtDef[EvtNm], CbThis<Ctx, this>>,
    context?: Ctx,
  ): this
  on<Ctx, EvtNm extends keyof EvtDef>(
    event: EvtNm,
    query: EventQuery,
    handler: WithThisType<EvtDef[EvtNm], CbThis<Ctx, this>>,
    context?: Ctx,
  ): this 
  on<Ctx, EvtNm extends keyof EvtDef>(
    event: EvtNm,
    query: EventQuery | WithThisType<EventCallback<EvtDef[EvtNm]>, CbThis<Ctx, this>>,
    handler?: WithThisType<EventCallback<EvtDef[EvtNm]>, CbThis<Ctx, this>> | Ctx,
    context?: Ctx
  ): this {
    if (!this._$handlers) {
      this._$handlers = new Map();
    }

    const _h = this._$handlers;

    if (typeof query === 'function') {
      context = handler as Ctx;
      handler = query as (...args: any) => any;
      query = null;
    }

    if (!handler || !event) {
      return this;
    }

    const eventProcessor = this._$eventProcessor;
    if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
      query = eventProcessor.normalizeQuery(query);
    }

    if (!_h.has(event as string)) {
      _h.set(event as string, []);
    }

    const eventHandlers = _h.get(event as string);
    for (let i = 0; i < eventHandlers.length; i++) {
      // @ts-ignore
      if (eventHandlers[i].h === handler) {
        return this;
      }
    }

    const wrap: EventHandler<Ctx, this, unknown[]> = {
      // @ts-ignore
      h: handler as EventCallback<unknown[]>,
      query,
      ctx: (context || this) as CbThis<Ctx, this>,
      callAtLast: (handler as any).zrEventfulCallAtLast
    };

    const lastIndex = eventHandlers.length - 1;
    const lastWrap = eventHandlers[lastIndex];

    // insert before latest item
    (lastWrap && lastWrap.callAtLast) ? eventHandlers.splice(lastIndex, 0, wrap) : eventHandlers.push(wrap);

    return this;
  }

  isSilent(eventName: keyof EvtDef): boolean {
    const handlers = this._$handlers;
    return !handlers || !handlers.has(eventName as string) || !handlers.get(eventName as string).length;
  }

  off(eventType?: keyof EvtDef, handler?: Function): this {
    const hs = this._$handlers;

    if (!hs) {
      return this;
    }

    if (!eventType) {
      this._$handlers = new Map();
      return this;
    }

    if (handler) {
      const es = hs.get(eventType as string);
      if (es) {
        const newList = [];
        for (let i = 0; i < es.length; i++) {
          if (es[i].h !== handler) {
            newList.push(es[i]);
          }
        }
        hs.set(eventType as string, newList);
      }

      if (hs.has(eventType as string) && !hs.get(eventType as string).length) {
        hs.delete(eventType as string);
      }
    } else {
      hs.delete(eventType as string);
    }

    return this;
  }

  trigger<EvtNm extends keyof EvtDef>(
    eventType: EvtNm,
    ...args: Parameters<EvtDef[EvtNm]>
  ): this {
    if (!this._$handlers) {
      return this;
    }

    const handlers = this._$handlers.get(eventType as string);
    const processor = this._$eventProcessor;

    if (handlers) {
      const len = handlers.length;

      for (let i = 0; i < len; i++) {
        const item = handlers[i];

        if (processor && processor.filter && item.query != null && !processor.filter(eventType, item.query)) {
          continue;
        }

        item.h.call(item.ctx, ...args);
      }
    }

    processor?.afterTrigger?.(eventType);

    return this;
  }

  triggerWithContext(type: keyof EvtDef, ...args: any[]): this {
    if (!this._$handlers) {
      return this;
    }

    const handlers = this._$handlers.get(type as string);
    const processor = this._$eventProcessor;

    if (handlers) {
      const len = handlers.length;
      const ctx = args.pop();

      for (let i = 0; i < len; i++) {
        const item = handlers[i];

        if (processor && processor.filter && item.query != null && !processor.filter(type, item.query)) {
          continue;
        }

        item.h.call(ctx, ...args);
      }
    }

    processor?.afterTrigger?.(type);

    return this;
  }
}