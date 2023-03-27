import normalizeUrl from 'normalize-url';

export const normaliseLink = (
  link: string,
  ignoredFileExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.pdf']
) => {
  if (!link) return;

  const normalisedLink = normalizeUrl(link, {
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
