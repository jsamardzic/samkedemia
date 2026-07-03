#!/bin/bash
# Regenerates samkedemia-excel-cheatsheet.pdf from index.html's print stylesheet.
# Run this any time index.html changes: ./generate-pdf.sh

cd "$(dirname "$0")"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox \
  --print-to-pdf="samkedemia-excel-cheatsheet.pdf" \
  --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  "file://$(pwd)/index.html"

echo "Done: samkedemia-excel-cheatsheet.pdf regenerated."
