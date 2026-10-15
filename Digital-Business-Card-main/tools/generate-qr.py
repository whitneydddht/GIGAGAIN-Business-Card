#!/usr/bin/env python3
"""
Regenerate the QR code for your card.

Usage:
    pip install segno
    python3 tools/generate-qr.py                       # uses https://colbyadams.com/
    python3 tools/generate-qr.py https://your-url/     # or pass your own URL

Writes assets/card-qr.png and assets/card-qr.svg (teal on white).
No account or online service needed.
"""
import sys
import segno

URL = sys.argv[1] if len(sys.argv) > 1 else "https://colbyadams.com/"
DARK = "#134e4a"   # dark teal (high contrast, scans reliably)
LIGHT = "#ffffff"

qr = segno.make(URL, error="h")
qr.save("assets/card-qr.png", scale=12, border=4, dark=DARK, light=LIGHT)
qr.save("assets/card-qr.svg", scale=12, border=4, dark=DARK, light=LIGHT)
print("Wrote assets/card-qr.png and assets/card-qr.svg for", URL)
