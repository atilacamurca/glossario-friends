var pandoc = require('pandoc-filter-promisified')
const fromPairs = require('lodash.frompairs')
const { paramCase } = require('param-case')
const padStart = require('lodash.padstart')
const { Str, RawInline } = pandoc

const builder = {
  cena: '',
  dialogo: []
}

async function action (elt, format, meta) {
  const temporada = await meta2val(meta.temporada)
  // Identificar Vue, usar RawInline
  if (elt.t === 'RawInline') {
    // return RawInline('latex', `RawInline: ${JSON.stringify(elt)}`)
    const aux = parseRawInline(elt)
    if (aux.hasNext) {
      switch (aux.type) {
        case 'cena':
          builder.cena += aux.content
          break;
        case 'dialogo':
          if (aux.content) {
            builder.dialogo.push(aux.content)
          }
          break;
      }
      return
    } else {
      switch (aux.type) {
        case 'cena':
          const content = builder.cena
            + builder.dialogo.join('\n\\bigskip\n')
            + aux.content
          builder.cena = ''
          builder.dialogo = []
          return RawInline('latex', content)
      }
      return
    }
  }

  if (elt.t === 'Link') {
    const [[id, classes, kv], inline, [url, targetTitle]] = elt.c;
    if (url.includes('/temporada')) {
      // link interno, deixar como estar por enquanto
      return
    }
    const title = await metaArray2Val(inline)
    return RawInline('latex', `\\sloppy ${title}. \\url{${url}}`)
  }

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
      return toFigure(filepath, caption, imgOptions)
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

function toFigure (filepath, caption, opt) {
  let width = '0.8\\textwidth'
  if (opt.bookwidth) {
    if (opt.bookwidth.includes('%')) {
      const percentage = opt.bookwidth.replace(/\D/g, '')
      const decimal = parseFloat((percentage / 100).toFixed(1))
      width = `${decimal}\\textwidth`
    }
  }
  return RawInline('latex', `\\begin{figure}
  \\centering
  \\begin{tikzpicture}
    \\node [inner sep=0pt] at (0,0) {
      \\includegraphics[width=${width},keepaspectratio]{${filepath}}
    };
    \\draw [white, rounded corners=\\ClipSep, line width=\\ClipSep]
    (current bounding box.north west) --
    (current bounding box.north east) --
    (current bounding box.south east) --
    (current bounding box.south west) -- cycle
    ;
    \\end{tikzpicture}
    ${toFigureCaption(caption)}
\\end{figure}`)
}

async function metaArray2Val(a) {
  return a.reduce(function (prevVal, currVal, idx) {
    if (currVal.t === 'Space') return prevVal + ' '
    if (currVal.t === 'Str') return prevVal + currVal.c
  }, '')
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

function parseRawInline(elt) {
  const [ type, value ] = elt.c
  if (value === '<cena>') {
    return {
      type: 'cena',
      content: beginCena(),
      hasNext: true
    }
  }

  if (value === '</cena>') {
    return {
      type: 'cena',
      content: endCena(),
      hasNext: false
    }
  }

  if (value.startsWith('<rachel')) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo('./assets/img/rachel.png', 'Rachel', matchOrig[1], matchTrad[1]),
      hasNext: true
    }
  }

  if (value.startsWith('<phoebe')) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo('./assets/img/phoebe.png', 'Phoebe', matchOrig[1], matchTrad[1]),
      hasNext: true
    }
  }

  if (value.startsWith('<ross')) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo('./assets/img/ross.png', 'Ross', matchOrig[1], matchTrad[1]),
      hasNext: true
    }
  }

  if (value.startsWith('<chandler')) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo('./assets/img/chandler.png', 'Chandler', matchOrig[1], matchTrad[1]),
      hasNext: true
    }
  }

  if (value.startsWith('<monica')) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo('./assets/img/monica.png', 'Monica', matchOrig[1], matchTrad[1]),
      hasNext: true
    }
  }

  if (value.startsWith('</')) {
    return {
      type: 'dialogo',
      content: '',
      hasNext: true
    }
  }

  return {
    type: 'cena',
    content: '',
    hasNext: true
  }
}

// function beginCena() {
//   return `\\begin{mdframed}[roundcorner=5pt,leftmargin=1, rightmargin=1,
//   linecolor=dialogoBorder,outerlinewidth=.3,
//   innerleftmargin=8,innertopmargin=8,innerbottommargin=8]
// `
// }

function beginCena() {
  return `\\begin{tcolorbox}[enhanced,center upper,
    drop fuzzy shadow southeast, boxrule=0.3pt,
    lower separated=false,
    colframe=black!30!dialogoBorder,colback=white]
`
}

// function endCena() {
//   return `\\end{mdframed}
// `
// }

function endCena() {
  return `\\end{tcolorbox}
`
}

function cena(value) {
  return `\\begin{mdframed}[roundcorner=5pt,leftmargin=1, rightmargin=1,
  linecolor=dialogoBorder,outerlinewidth=.3,
  innerleftmargin=8,innertopmargin=8,innerbottommargin=8]
${value}
\\end{mdframed}
`
}

function dialogo(imagem, personagem, original, traducao) {
  return `\\begin{minipage}[c]{0.14\\linewidth}
  \\raisebox{\\dimexpr-\\height+\\ht\\strutbox\\relax}{
    \\includegraphics[width=1.5cm]{${imagem}}
  }
   & \\centering \\scriptsize{${personagem}}
\\end{minipage}
\\hspace{.1mm}
\\begin{minipage}[c]{0.8\\linewidth}
  \\textbf{${original}}\\\\
  ${traducao}
\\end{minipage}
`
}

module.exports = function () {
  pandoc.stdio(action)
}
