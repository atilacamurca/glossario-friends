var pandoc = require('pandoc-filter-promisified')
const fromPairs = require('lodash.frompairs')
const { paramCase } = require('param-case')
const padStart = require('lodash.padstart')
const { Str, RawInline } = pandoc

async function action (elt, format, meta) {
  const temporada = await meta2val(meta.temporada)
  // Identificar Vue, usar RawInline
  // if (elt.t === 'RawInline') {
  //   return RawInline('latex', `RawInline: ${JSON.stringify(temporada)}`)
  // }

  if (elt.t === 'Image') {
    const optionsArray = elt.c[0]
    const captionArray = elt.c[1]
    const figureArray = elt.c[2]

    const filepath = `./S${padTwo(temporada)}${figureArray[0].substring(1)}`
    const caption = captionArray.reduce(function (prevVal, currVal, idx) {
      if (currVal.t === 'Space') return prevVal + ' '
      if (currVal.t === 'Str') return prevVal + currVal.c
    }, '')

    const imgOptions = fromPairs(optionsArray[2])
    if (!imgOptions.fullpage) {
      return toFigure(filepath, caption)
    }

    return toFigureFullPage(filepath, caption, imgOptions)
  }
}

function toFigureCaption(caption) {
  return `\\caption{${caption}\\label{fig:${paramCase(caption)}}}`
}

function toFigureFullPage (filepath, caption, { clipb, clipt}) {
  return RawInline('latex', `\\begin{figure}[!ht]
  \\begin{adjustwidth}{-\\oddsidemargin-1in}{-\\rightmargin}
    \\centering
    \\includegraphics[trim={0 ${clipb} 0 ${clipt}}, clip, width=\\paperwidth]{${filepath}}
    ${toFigureCaption(caption)}
  \\end{adjustwidth}
\\end{figure}`)
}

function toFigure (filepath, caption) {
  return RawInline('latex', `\\begin{figure}
  \\centering
  \\includegraphics[width=\\columnwidth]{${filepath}}
  ${toFigureCaption(caption)}
\\end{figure}`)
}

async function meta2val (v) {
  switch (v.t) {
    case 'MetaMap':
      return metaMap2obj(v.c);
    case 'MetaList':
      return Promise.all(v.c.map(meta2val));
    case 'MetaBool':
    case 'MetaString':
      return v.c;
    case 'MetaInlines':
    case 'MetaBlocks':
      return pandoc.stringify(v.c);
    default:
      throw new Error(`Unknown meta type ${JSON.stringify(v)}`);
  }
}
async function metaMap2obj (m) {
  const result = {};
  for (const [k, v] of Object.entries(m)) {
    result[k] = await meta2val(v);
  }
  return result;
}
async function meta2obj (varName, meta) {
  if (meta === undefined)
    return {};
  const e = meta[varName];
  if (e === undefined)
    return {};
  if (e.t !== 'MetaMap') {
    throw new Error(`${varName} should be MetaMap, but got ${e.t}`);
  }
  return metaMap2obj(e.c);
}

function padTwo (value) {
  return padStart(value, 2, '0')
}

module.exports = function () {
  pandoc.stdio(action)
}
