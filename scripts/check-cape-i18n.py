#!/usr/bin/env python3
"""Render the CAPE tool in French and fail if English text is left.
Needs Playwright with Chromium (pip install playwright). Run after `npm run build`
or against the source folder:  python3 scripts/check-cape-i18n.py [public-dir]
Exercises every named scenario and every corridor with all panels open."""
import re, subprocess, sys, time, pathlib
from playwright.sync_api import sync_playwright
ROOT = sys.argv[1] if len(sys.argv) > 1 else str(pathlib.Path(__file__).parent.parent / 'public')
EN = set("the of and to for is are with from or at it its all any one two per each can may will which when where than then only also your you our their these those into over under after before between both has have been being was were more most less other such some using use used if but so exposed route routes vessel vessels cargo corridor listed area scenario risk war".split())
FR_OK = {'via', 'cargo', 'route', 'routes', 'corridor', 'risk'}   # words that are also French or proper in context
srv = subprocess.Popen(['python3', '-m', 'http.server', '8767', '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
bad = {}
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1400, 'height': 2400})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8767/cape.html?lang=fr'); pg.wait_for_timeout(1500)
    def snap(tag):
        pg.evaluate("document.querySelectorAll('.vbody').forEach(e=>e.classList.add('open'));['b1','b2','b3','b4','t1','t2','t3','t4'].forEach(i=>{const e=document.getElementById(i);if(e)e.classList.remove('c')})")
        for ln in pg.evaluate("document.body.innerText").split('\n'):
            w = re.findall(r"[A-Za-z']+", ln)
            hits = [x for x in w if x.lower() in EN and x.lower() not in FR_OK]
            if len(hits) >= 2: bad.setdefault(ln.strip(), tag)
    snap('initial')
    for key in ['red_sea_2024', 'panama_drought', 'ever_given', 'hormuz_closure', 'taiwan_strait', 'cascade']:
        pg.click(f'.scn-preset[data-key="{key}"]'); pg.wait_for_timeout(300); snap(key)
    for c in ['hormuz', 'bab_el_mandeb', 'malacca', 'panama', 'suez', 'lombok', 'bosphorus', 'danish_straits']:
        pg.click(f'#corrChips .chip[data-c="{c}"]'); pg.wait_for_timeout(250); snap(c)
    b.close()
srv.terminate()
for e in errs: print('PAGE ERROR', e)
for l, t in bad.items(): print(f'ENGLISH [{t}] {l[:160]}')
print('FAIL' if (bad or errs) else 'OK: CAPE tool French render has no English left')
sys.exit(1 if (bad or errs) else 0)
