
module.exports = function parseRawInline (elt) {
  const [type, value] = elt.c
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
    return criarDialogo('Rachel', 'rachel', value)
  }

  if (value.startsWith('<phoebe')) {
    return criarDialogo('Phoebe', 'phoebe', value)
  }

  if (value.startsWith('<ross')) {
    return criarDialogo('Ross', 'ross', value)
  }

  if (value.startsWith('<chandler')) {
    return criarDialogo('Chandler', 'chandler', value)
  }

  if (value.startsWith('<monica')) {
    return criarDialogo('Monica', 'monica', value)
  }

  if (value.startsWith('<carol-one')) {
    return criarDialogo('Carol', 'carol-1', value)
  }

  if (value.startsWith('<carol')) {
    return criarDialogo('Carol', 'carol', value)
  }

  if (value.startsWith('<joey')) {
    return criarDialogo('Joey', 'joey', value)
  }

  if (value.startsWith('<janice')) {
    return criarDialogo('Janice', 'janice', value)
  }

  if (value.startsWith('<obsession-girl')) {
    return criarDialogo('Girl', 'obsession-girl', value)
  }

  if (value.startsWith('<david')) {
    return criarDialogo('David', 'david', value)
  }

  if (value.startsWith('<gloria')) {
    return criarDialogo('Gloria', 'gloria', value)
  }

  if (value.startsWith('<max')) {
    return criarDialogo('Max', 'max', value)
  }

  if (/^<\/(carol|chandler|david|gloria|janice|joey|max|monica|obsession|phoebe|rachel|ross)/.test(value)) {
    return {
      type: 'dialogo',
      content: '',
      hasNext: true
    }
  }

  if (value.startsWith('<musica')) {
    return {
      type: 'musica',
      content: beginMusica(),
      hasNext: true
    }
  }

  if (value === '</musica>') {
    return {
      type: 'musica',
      content: endMusica(),
      hasNext: false
    }
  }

  if (value.startsWith('<letra')) {
    return {
      type: 'letra',
      content: adicionarIconeLetra(value),
      hasNext: true
    }
  }

  if (value.startsWith('</letra')) {
    return {
      type: 'letra',
      content: '',
      hasNext: false
    }
  }

  return {
    type: 'desconhecido',
    content: value,
    hasNext: false
  }
}

function beginCena () {
  return `\\begin{tcolorbox}[enhanced,center upper,
    drop fuzzy shadow southeast, boxrule=0.3pt,
    lower separated=false,
    colframe=black!30!dialogoBorder,colback=white]
`
}

function beginMusica () {
  return `\\bigskip
\\begin{tcolorbox}[enhanced,
    drop fuzzy shadow southeast, boxrule=0.3pt,
    lower separated=false, sidebyside, sidebyside align=top,
    halign=flush right, halign lower=left,
    colframe=black!30!dialogoBorder,colback=musicaBg]
`
}

function endCena () {
  return `\\end{tcolorbox}
`
}

function endMusica () {
  return `\\end{tcolorbox}
`
}

function criarDialogo(personagem, imgFilename, value) {
    const matchOrig = value.match(/original="(.*)"/)
    const matchTrad = value.match(/traducao="(.*)"/)
    return {
      type: 'dialogo',
      content: dialogo(`./assets/img/${imgFilename}.png`, personagem, matchOrig[1], matchTrad[1]),
      hasNext: true
    }
}

function adicionarIconeLetra(value) {
  let icon = 'icon-music.png'
  if (value.includes('traducao')) {
    icon = 'icon-language.png'
  }
  return `\\includegraphics[width=0.4cm]{./assets/img/${icon}}\\\\
`
}

function cena (value) {
  return `\\begin{mdframed}[roundcorner=5pt,leftmargin=1, rightmargin=1,
  linecolor=dialogoBorder,outerlinewidth=.3,
  innerleftmargin=8,innertopmargin=8,innerbottommargin=8]
${value}
\\end{mdframed}
`
}

function dialogo (imagem, personagem, original, traducao) {
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
