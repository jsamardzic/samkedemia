#!/bin/bash
# Regenerates samkedemia-excel-cheatsheet.pdf from excel.html's print stylesheet.
# Run this any time excel.html changes: ./generate-excel-pdf.sh

cd "$(dirname "$0")"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox \
  --print-to-pdf="samkedemia-excel-cheatsheet.pdf" \
  --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  "file://$(pwd)/excel.html"

echo "Done: samkedemia-excel-cheatsheet.pdf regenerated."
