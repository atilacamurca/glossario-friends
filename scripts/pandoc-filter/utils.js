function normalizeText (text) {
  return text
    .replace(/\&quot;/g, '"')
    .replace(/\&/g, '\\&')
}

module.exports = {
  normalizeText
}
