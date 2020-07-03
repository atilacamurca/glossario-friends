var pandoc = require('pandoc-filter-promisified')
const fromPairs = require('lodash.frompairs')
const { paramCase } = require('param-case')
const { Str, RawInline } = pandoc

async function action (elt, format, meta) {
  // Identificar Vue, usar RawInline
  // if (elt.t === 'RawInline') {
  //   return RawInline('latex', `RawInline: ${JSON.stringify(elt)}`)
  // }

  if (elt.t === 'Image') {
    const optionsArray = elt.c[0]
    const captionArray = elt.c[1]
    const figureArray = elt.c[2]

    const filepath = figureArray[0]
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

module.exports = function () {
  pandoc.stdio(action)
}
