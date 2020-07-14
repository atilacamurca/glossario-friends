#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

# bibtex main

# compile episodes
mkdir -p ./book/S01
pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o ./book/S01/S01E01.tex \
  ./temporadas/S01/S01E01.md \
  --filter ./scripts/pandoc-filter/bin.js

pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o ./book/S01/S01E02.tex \
  ./temporadas/S01/S01E02.md \
  --filter ./scripts/pandoc-filter/bin.js

pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o ./book/S01/S01E03.tex \
  ./temporadas/S01/S01E03.md \
  --filter ./scripts/pandoc-filter/bin.js

pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o ./book/S01/S01E04.tex \
  ./temporadas/S01/S01E04.md \
  --filter ./scripts/pandoc-filter/bin.js

cd book
pdflatex -shell-escape -interaction=nonstopmode main.tex

cd -

xdg-open ./book/main.pdf
