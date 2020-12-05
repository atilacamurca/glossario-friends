#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

# bibtex main

# compile episodes

# season 1
mkdir -p ./book/S01
for i in $(seq -f "%02g" 1 24)
do
  echo "Gerando tex do episódio S01E${i} ..."
  pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o "./book/S01/S01E${i}.tex" \
  "./temporadas/S01/S01E${i}.md" \
  --filter ./scripts/pandoc-filter/bin.js
done

# exit 0

cd book
pandoc -f markdown -o welcome.tex welcome.md
pdflatex -shell-escape \
  -interaction=nonstopmode \
  -jobname=glossario-friends-temporada-1 \
  main.tex

cd -

xdg-open ./book/main.pdf
