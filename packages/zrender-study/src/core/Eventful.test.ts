import Eventful, { EventProcessor } from './Eventful';

test('Eventful/on, off and trigger', () => {
  type HandlerType = {
    click: (n: number) => void,
    dbClick: (nn: number) => void,
  };
  const eventOjb = new Eventful<HandlerType>();
  let clicked = 0;
  let dbClicked = 0;

  let thisOjb = eventOjb.on('click', null);
  expect(thisOjb === eventOjb).toBe(true);
  thisOjb = eventOjb.on(null, () => {});
  expect(thisOjb === eventOjb).toBe(true);

  eventOjb.on('click', (count) => {
    clicked = count;
  });
  eventOjb.on('dbClick', (nn) => {
    dbClicked = nn;
  });
  eventOjb.trigger('click', 1);
  expect(clicked).toBe(1);
  eventOjb.trigger('dbClick', 2);
  expect(dbClicked).toBe(2);

  eventOjb.off('click');
  eventOjb.off('dbClick');
  eventOjb.trigger('click', 3);
  eventOjb.trigger('dbClick', 4);
  expect(clicked).toBe(1);
  expect(dbClicked).toBe(2);
});

test('Eventful/with event processor', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  let calledNor = false;
  let calledFil = false;
  let calledAf = false;
  const processor: EventProcessor<HandlerType> = {
    normalizeQuery: (query) => {
      calledNor = true;
      return query;
    },
    filter: (type, query) => {
      calledFil = true;
      return true;
    },
    afterTrigger: (type) => {
      calledAf = true;
    }
  }
  const eventOjb = new Eventful<HandlerType>(processor);
  let clicked = 0;
  let gotContext;

  const callback = function (this: any, count: number) {
    gotContext = this;
    clicked += 1;
  };
  const context = {};
  eventOjb.on('click', 'query', callback, context);

  eventOjb.trigger('click', 2);

  expect(gotContext === context).toBe(true);
  expect(clicked).toBe(1);
  expect(calledNor).toBe(true);
  expect(calledFil).toBe(true);
  expect(calledAf).toBe(true);
});

test('Eventful/trigger with context', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  const eventOjb = new Eventful<HandlerType>();
  let clicked = 0;
  let gotContext;

  const callback = function (this: any, count: number) {
    gotContext = this;
    clicked += 1;
  };
  const context = {};
  const context2 = {};
  eventOjb.on('click', 'query', callback, context);

  eventOjb.triggerWithContext('click', 2, context2);

  expect(gotContext === context2).toBe(true);
  expect(clicked).toBe(1);
});

test('Eventful/off without on', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  const eventOjb = new Eventful<HandlerType>();

  let result = eventOjb.trigger('click', 1);
  expect(result === eventOjb).toBe(true);

  result = eventOjb.triggerWithContext('click', 1, {});
  expect(result === eventOjb).toBe(true);

  const callback1 = ()=> {

  };
  const callback2 = () => {

  };
  result = eventOjb.off('click');
  expect(result === eventOjb).toBe(true);
  result = eventOjb.off();
  expect(result === eventOjb).toBe(true);
  
  eventOjb.on('click', callback1);
  eventOjb.on('click', callback2);
  result = eventOjb.off('click', callback1);
  expect(result === eventOjb).toBe(true);
  result = eventOjb.off('click', callback2);
  expect(result === eventOjb).toBe(true);

  result = eventOjb.off();
  expect(result === eventOjb).toBe(true);

  result = eventOjb.off('click', callback1);
  expect(result === eventOjb).toBe(true);
  result = eventOjb.triggerWithContext('click', callback1);
  expect(result === eventOjb).toBe(true);

});

test('Eventful/duplicated on', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  const eventOjb = new Eventful<HandlerType>();

  let count = 0;
  const callback1 = ()=> {
    count++;
  };
  eventOjb.on('click', callback1);
  eventOjb.on('click', callback1);
  eventOjb.trigger('click', 1);
  expect(count).toBe(1);
});

test('Eventful/filter return false', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  const processor: EventProcessor<HandlerType> = {
    filter: (type, query) => {
      return false;
    },
  }
  const eventOjb = new Eventful<HandlerType>(processor);
  let clicked = 0;

  const callback = () => {
    clicked += 1;
  };
  eventOjb.on('click', 'query', callback);

  eventOjb.trigger('click', 2);
  expect(clicked).toBe(0);
  eventOjb.triggerWithContext('click', 2);
  expect(clicked).toBe(0);
});

test('Eventful/always triggered at last', () => {
  type HandlerType = {
    click: (n: number) => void,
  };
  const processor: EventProcessor<HandlerType> = {
    filter: (type, query) => {
      return false;
    },
  }
  const eventOjb = new Eventful<HandlerType>(processor);
  let result = '';

  const callback1 = () => {
    result += 'ifcl';
  };
  callback1.zrEventfulCallAtLast = true;
  const callback2 = () => {
    result += 'ilcf';
  };
  eventOjb.on('click', callback1);
  eventOjb.on('click', callback2);
  eventOjb.trigger('click', 1);
  expect(result).toBe('ilcfifcl');
});

test('Eventful/isSilent', () => {
  type HandlerType = {
    click: (n: number) => void,
    click2: (n: number) => void,
  };
  const eventOjb = new Eventful<HandlerType>();

  let count = 0;
  const callback1 = ()=> {
    count++;
  };
  expect(eventOjb.isSilent('click')).toBe(true);
  eventOjb.on('click', callback1);
  eventOjb.off('click', callback1);
  expect(eventOjb.isSilent('click2')).toBe(true);
  expect(eventOjb.isSilent('click')).toBe(true);
});