import normalizeUrl from 'normalize-url';

export const normaliseLink = (
  link: string,
  ignoredFileExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.svg']
) => {
  if (!link) return;

  const normalisedLink = normalizeUrl(link, {
    stripWWW: true,
    stripHash: true,
    removeTrailingSlash: true,
    removeQueryParameters: [/.*/i]
  });

  for (const ignoredFileExtension of ignoredFileExtensions) {
    if (normalisedLink.endsWith(ignoredFileExtension)) {
      return;
    }
  }

  return normalisedLink;
};
