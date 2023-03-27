# Simple Node Express URL Crawler

A simple, lightweight, and efficient URL crawler API built with Node.js, Express, and TypeScript. Given a starting URL,
the crawler visits each URL it finds on the same domain, printing each URL visited alongside a list of links found on
that page. The crawler is limited to one subdomain to prevent crawling external links.

_Note: This api currently only supports crawling static websites. It does not support crawling dynamic websites that require authentication or use JavaScript to render content._

### Features

- Crawls all pages within a single subdomain.
- Prints visited URLs and the list of links found on each page.
- Built with Node.js, Express, TypeScript, Docker, and Docker Compose for easy integration, scaling, and
  containerization.

### Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

#### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v16.x.x or higher)
- npm (v8.x.x or higher)
- TypeScript (v4.x.x or higher)
- Docker (v20.x.x or higher)
- Docker Compose (v2.x.x or higher)

### Installation

1. Clone the repository to your local machine.

```shell
git clone https://github.com/abshirahmed/express-url-scrapper.git
```

2. Navigate to the project directory.

```shell
cd express-url-scrapper
```

3. Install dependencies.

```shell
yarn install
```

4. Build the project.

```shell
yarn build
```

5. Run the project.

```shell
yarn start
```

The API should now be running on port `http://localhost:3000`. You can test it by sending a `POST` request to the `/crawl` endpoint with the starting URL as a parameter. 

### Usage

The API exposes a single endpoint, `/crawl`, which accepts a `POST` request with a single parameter, `url`, which is the starting URL for the crawler. To crawl a website, send a POST request to the /crawl endpoint with the following JSON payload:

```json
{
  "url": "https://www.example.com"
}
```
Replace https://example.com with the URL you want to start crawling. The API will respond with a list of visited URLs and the links found on each page, limited to the specified subdomain.

#### Example response:
  
  ```json
  {
  "https://example.com": [
    "https://example.com/about",
    "https://example.com/contact"
  ],
  "https://example.com/about": [
    "https://example.com",
    "https://example.com/contact"
  ],
  "https://example.com/contact": [
    "https://example.com",
    "https://example.com/about"
  ]
}
  ```

### Running tests

To run the tests, run the following command:

```shell
yarn test
```

### Deployment

The project is configured to run in a Docker container. To build the Docker image, run the following command:

```shell
docker build -t express-url-scrapper .
``` 

To run the Docker container, run the following command:

```shell
docker run -p 3000:3000 express-url-scrapper
```

Alternatively, you can use Docker Compose to run the project. To do so, run the following command:

```shell
docker-compose up
```

To run the Docker container in `dev` mode, run the following command:

```shell
docker-compose -f docker-compose.dev.yml up
```


### Built With

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Axios](https://axios-http.com/) - HTTP client
- [Cheerio](https://cheerio.js.org/) - HTML parser
- [Pino](https://getpino.io/) - Logging framework
- [Jest](https://jestjs.io/) - Testing framework
- [MSW](https://mswjs.io/) - API mocking
- [Supertest](https://github.com/ladjs/supertest) - HTTP assertions
