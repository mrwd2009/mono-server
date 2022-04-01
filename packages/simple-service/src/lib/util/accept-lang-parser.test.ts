import { pick } from './accept-lang-parser';

test('pick lang', () => {
  const result = pick(['en-US'], 'en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8');
  expect(result).toBe('en-US');
});