#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

# bibtex main

# compile episodes

# season 1
mkdir -p ./book/S01
for i in $(seq -f "%02g" 1 8)
do
  echo "Gerando tex do episódio S01E${i} ..."
  pandoc \
  -f markdown \
  --shift-heading-level-by=-1 \
  -o "./book/S01/S01E${i}.tex" \
  "./temporadas/S01/S01E${i}.md" \
  --filter ./scripts/pandoc-filter/bin.js
done

cd book
pdflatex -shell-escape -interaction=nonstopmode main.tex

cd -

xdg-open ./book/main.pdf
