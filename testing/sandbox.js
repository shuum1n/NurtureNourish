const { image_search } = require('duckduckgo-images-api');

image_search({ query: "rendang sapi", moderate: true }).then(results => console.log(results[0]))