import { rest } from 'msw';

const URL = 'https://example.com';

const homePageHandler = rest.get(URL, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text(`
<a href="https://example.com/about">About</a>
<a href="https://example.com/blogs">Blogs</a>
`)
  );
});

const aboutPageHandler = rest.get(URL + '/about', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text(`
<a href="https://example.com">Home</a>
<a href="https://example.com/blogs">Blogs</a>
`)
  );
});

const blogsPageHandler = rest.get(URL + '/blogs', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text(
      `
<a href="https://example.com">Home</a>
<a href="https://example.com/about">About</a>
<a href="https://example.com/blogs/1">Blog 1</a>
<a href="https://example.com/blogs/2">Blog 2</a>
`
    )
  );
});

const blog1PageHandler = rest.get(URL + '/blogs/1', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.text(`
<a href="https://example.com/">Home</a>
<a href="https://example.com/about">About</a>
<a href="https://example.com/blogs">Blogs</a>
<a href="https://google.com">Google</a>
<a href="https://example.com/pic/random.jpg">random pic</a>
`)
  );
});

const blog2PageHandler = rest.get(URL + '/blogs/2', (req, res, ctx) => {
  return res(ctx.status(200));
});

const blog3PageHandler = rest.get(URL + '/blogs/3', (req, res, ctx) => {
  return res(ctx.status(404));
});
export const handlers = [
  homePageHandler,
  aboutPageHandler,
  blogsPageHandler,
  blog1PageHandler,
  blog2PageHandler,
  blog3PageHandler
];
