var pandoc = require('pandoc-filter')
const fromPairs = require('lodash.frompairs')
const { paramCase } = require('param-case')
const padStart = require('lodash.padstart')
const parseRawInline = require('./parse-raw-inline')
const { Str, RawInline, Plain, RawBlock } = pandoc
const debug = require('debug')('filter')

const builder = {
  cena: '',
  dialogo: [],
  musica: '',
  consumirLetra: false,
  iconeLetra: '',
  letraAtual: '',
  letra: []
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
        case 'musica':
          builder.musica += aux.content
          break;
        case 'letra':
          builder.consumirLetra = true
          builder.iconeLetra = aux.content
          break;
      }
      return
    } else {
      let content
      switch (aux.type) {
        case 'cena':
          content = builder.cena
            + builder.dialogo.join('\n\\medskip\n')
            + aux.content
          builder.cena = ''
          builder.dialogo = []
          return RawInline('latex', content)
        case 'musica':
          content = builder.musica
            + builder.letra.join('\n\\tcblower\n')
            + '\n'
            + aux.content
          builder.musica = ''
          builder.letra = []
          return RawInline('latex', content)
        case 'letra':
          builder.letra.push(builder.letraAtual)
          builder.letraAtual = ''
          builder.iconeLetra = ''
          builder.consumirLetra = false
          break;
        case 'desconhecido':
          return RawInline('latex', JSON.stringify(elt))
      }
      return
    }
  }

  if (builder.consumirLetra) {
    // return RawInline('latex', `RawInline: ${JSON.stringify(elt)}`)
    if (!builder.letraAtual && elt.t === 'SoftBreak') {
      // skip first SoftBreak
      builder.letraAtual += builder.iconeLetra
      return
    }
    builder.letraAtual += await elt2val(elt)
    return Str('') // consume text
  }

  if (elt.t === 'Link') {
    const [[id, classes, kv], inline, [url, targetTitle]] = elt.c;
    const title = metaArray2Val(inline)
    if (url.includes('/temporada')) {
      // link interno, deixar como estar por enquanto
      return RawInline('latex', `\\textbf{\\textcolor{primarycolor}{${title}}}`)
    }
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
      if (currVal.t === 'Quoted') {
        if (currVal.c[0].t == 'DoubleQuote') {
          return prevVal + '``' + metaArray2Val(currVal.c[1]) + "''"
        }
      }
      // fallback para valor raw
      return prevVal + JSON.stringify(currVal)
    }, '')

    const imgOptions = fromPairs(optionsArray[2])
    if (!imgOptions.fullpage) {
      return toFigure(filepath, caption, imgOptions)
    }

    return toFigureFullPage(filepath, caption, imgOptions)
  }

  if (elt.t === 'RawBlock') {
    const [type, value] = elt.c
    if (type === 'html' && value.indexOf('<!--') !== -1) {
      const options = JSON.parse(value.replace('<!--', '').replace('-->', '').trim())
      let latex = ''
      if (!options.latex) {
        return []
      }

      for (let i in options.latex) {
        debug(options.latex[i])
        const opt = options.latex[i]
        if (opt.begin) {
          if (opt.begin.tag === 'col-1') {
            latex += `\\saveparinfos
\\noindent
\\begin{minipage}[c]{${opt.begin.width}\\textwidth}\\useparinfo\n`
          } else if (opt.begin.tag === 'col-2') {
            latex += `\\begin{minipage}[c]{${opt.begin.width}\\textwidth}\n`
          }
        } else if (opt.end) {
          if (opt.end.tag === 'col-1') {
            latex += `\\end{minipage}\\hfill\n`
          } else if (opt.end.tag === 'col-2') {
            latex += `\\end{minipage}\n`
          }
        }
      }
      return RawBlock('latex', latex)
    }
  }
}

function toFigureCaption (caption) {
  return `\\caption{${caption}\\label{fig:${paramCase(caption.replace('"', ''))}}}`
}

function toFigureFullPage (filepath, caption, { clipb, clipt }) {
  return RawInline('latex', `\\begin{figure}[!ht]
  \\begin{adjustwidth}{-\\oddsidemargin-1in}{-\\rightmargin}
    \\centering
    \\includegraphics[trim={0 ${clipb} 0 ${clipt}}, clip, width=\\paperwidth]{${filepath}}
    % ${toFigureCaption(caption)}
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

function metaArray2Val (a) {
  return a.reduce(function (prevVal, currVal, idx) {
    // debug(currVal.t)
    if (currVal.t === 'Space') return prevVal + ' '
    if (currVal.t === 'Str') return prevVal + currVal.c
    if (currVal.c[0].t == 'DoubleQuote') {
      return prevVal + '``' + metaArray2Val(currVal.c[1]) + "''"
    } else if (currVal.c[0].t == 'SingleQuote') {
      return prevVal + '`' + metaArray2Val(currVal.c[1]) + "'"
    }
  }, '')
}

async function elt2val (elt) {
  if (elt.t === 'Space') return ' '
  if (elt.t === 'SoftBreak') return '\\\\'
  if (elt.t === 'Str') return elt.c
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
