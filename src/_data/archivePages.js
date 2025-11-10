// src/_data/archivePages.js
const archive = require("./archive.json");

// same slug rules as the template links
const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

module.exports = () => {
  const out = [];
  if (!archive || !archive.sections) return out;

  for (const section of archive.sections) {
    for (const item of section.items) {
      out.push({
        title: item.title,
        file: item.file,          // e.g. "/files/Grief and School Counseling.pdf"
        slug: slugify(item.title),
        section: section.title
      });
    }
  }
  return out;
};
