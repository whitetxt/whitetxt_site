module.exports = {
  extractors: [
    {
      extractor: (content) => content.match(/[A-z0-9-:\/]+/g) || [],
      extensions: ["html"],
    },
  ],
};
