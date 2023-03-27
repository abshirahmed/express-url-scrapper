import { normaliseLink } from '../../../src/utils/normaliseLink';

describe('normaliseLink', () => {
  // parametrized test
  it.each([
    { link: 'https://www.monzo.com/', expected: 'https://monzo.com' },
    { link: 'https://www.monzo.com#contacts', expected: 'https://monzo.com' },
    {
      link: 'https://www.monzo.com?foo=bar&ref=test_ref',
      expected: 'https://monzo.com'
    },
    {
      link: 'https://www.monzo.com/contacts',
      expected: 'https://monzo.com/contacts'
    },
    { link: 'https://www.monzo.com/file.jpg', expected: undefined },
    { link: 'https://www.monzo.com/file.jpeg', expected: undefined },
    { link: 'https://www.monzo.com/file.png', expected: undefined },
    { link: 'https://www.monzo.com/file.gif', expected: undefined },
    { link: 'https://www.monzo.com/file.svg', expected: undefined },
    {
      link: 'https://www.monzo.com/file.html',
      expected: 'https://monzo.com/file.html'
    }
  ])('should return $expected when given $link', ({ link, expected }) => {
    const actual = normaliseLink(link);

    expect(actual).toBe(expected);
  });
});
