#!/bin/bash
# Regenerates samkedemia-excel-cheatsheet.pdf, the file the PDF button on the page downloads,
# from index.html's print layout. Run this any time index.html changes: ./generate-excel-pdf.sh
# Needs Python with Playwright (pip3 install playwright && python3 -m playwright install chromium).

cd "$(dirname "$0")"
PY=/usr/local/bin/python3; [ -x "$PY" ] || PY=python3

"$PY" - <<'PYEOF'
import pathlib
from playwright.sync_api import sync_playwright
page_url = pathlib.Path('index.html').resolve().as_uri()
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(page_url, wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    page.wait_for_timeout(800)
    page.pdf(path='samkedemia-excel-cheatsheet.pdf', format='A4', print_background=True, prefer_css_page_size=True, margin={'top': '15mm', 'bottom': '15mm', 'left': '16mm', 'right': '16mm'})
    browser.close()
PYEOF

echo "Done: samkedemia-excel-cheatsheet.pdf regenerated."
