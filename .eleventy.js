module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

eleventyConfig.addPassthroughCopy({ "src/files": "files" });
eleventyConfig.addPassthroughCopy({ "src/js": "js" });
eleventyConfig.addPassthroughCopy({ "src/css": "css" });
eleventyConfig.addPassthroughCopy({ "src/css": "css" });

// .eleventy.js (inside module.exports = function(eleventyConfig) { ... })
eleventyConfig.addFilter("slug", s =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
);


  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date)
  );
  return {
    dir: { input: "src", output: "dist", includes: "_includes" },
    templateFormats: ["njk", "md", "html"]
  };
};

