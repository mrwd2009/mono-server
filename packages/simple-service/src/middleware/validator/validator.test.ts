import validator from './validator';

test('test with a schema object', async () => {
  const fn = validator(Schema => Schema.object({
    first: Schema.string(),
    second: Schema.number().integer().min(1),
  }));
  await fn({mergedParams: { first: 'correct', second: 2} } as any, () => Promise.resolve());
});

test('test with schema map', async () => {
  const fn = validator(Schema => ({
    body: Schema.object({
      first: Schema.string(),
      second: Schema.number().integer().min(1),
    }),
  }));
  await fn({body: { first: 'correct', second: 2} } as any, () => Promise.resolve());
});

test('failed to test with schema map', async () => {
  const fn = validator(Schema => ({
    body: Schema.object({
      first: Schema.string(),
      second: Schema.number().integer().min(1),
    }),
  }));
  expect(async () => {
    await fn({body: { first: 'correct', second: 0} } as any, () => Promise.resolve());
  }).rejects.toThrow();
});