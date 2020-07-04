#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

# bibtex main

# compile episodes
mkdir -p ./book/S01
pandoc \
  -f markdown \
  -o ./book/S01/S01E01.tex \
  ./temporadas/S01/S01E01.md \
  --filter ./scripts/pandoc-filter/bin.js
  # --filter pandoc-fignos -M fignos-caption-name=Figura

cd book
pdflatex -shell-escape -interaction=nonstopmode main.tex

cd -

xdg-open ./book/main.pdf
