# Digital Business Card

A tiny, free **tap-to-save digital business card**. Someone taps your NFC tag
(or scans your QR), your card page opens, and **one tap adds you to their
contacts**. Everything is driven by **one config file** — no coding — and there's
a browser **setup wizard** to fill it out visually.

**This instance:** <https://colbyadams.com/>

---

## Make your own in 3 steps

1. **Copy this repo** — use the green **Use this template** button (or fork it).
2. **Add your info** — either:
   - open **`setup.html`** in your browser, fill the form, and click
     **Download `config.js`** → replace the repo's `config.js`, **or**
   - edit **`config.js`** directly (it's plain and commented).
3. **Turn on GitHub Pages** — repo **Settings → Pages → Deploy from a branch →
   `main` / `(root)`**. Your card is live in ~1 minute at
   `https://<your-username>.github.io/<repo>/`.

Then write that URL to an NFC tag (any "NFC Tools" app) and/or print your QR.

## Editing your card (`config.js`)

`config.js` is the **only** file you touch. It looks like:

```js
window.CARD_CONFIG = {
  url: "https://colbyadams.com/",
  name: "Colby Adams",
  title: "Technical Director",
  org: "Stockbridge Theatre",
  theme: { accent: "#14b8a6", accent2: "#5eead4", onAccent: "#03231f" },
  phones: [ { label: "Cell", value: "(603) 548-5547", dial: "+16035485547", primary: true } ],
  emails: [ { label: "Email", value: "you@example.com" } ],
  links:  [ { label: "LinkedIn", value: "linkedin.com/in/you", url: "https://…", icon: "linkedin" } ]
};
```

- **Theme:** any two hex colors.
- **Link icons:** `globe`, `linkedin`, `github`, `instagram`, `youtube`,
  `facebook`, `x`, `tool`, `calendar`, `location`.
- Change a value, commit — the card **and** the saved contact update automatically.
  The same NFC tag and QR keep working; you never re-write them.

## QR code

A ready QR lives in `assets/card-qr.png` / `.svg` (also hosted at
`…/assets/card-qr.png`). Scan it → card opens → **Save to Contacts**.

Regenerate it if your URL changes:

```bash
pip install segno
python3 tools/generate-qr.py https://colbyadams.com/
```

(Or paste your URL into any online QR generator.)

## Custom domain (this repo uses `colbyadams.com`)

The `CNAME` file points GitHub Pages at `colbyadams.com`. To finish it, add
these records at your domain registrar (where you bought the domain):

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `colbyadams5.github.io.` |

(Optional IPv6 — add four `AAAA` records on `@`: `2606:50c0:8000::153`,
`2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

Then **Settings → Pages** should show the domain verified — tick
**Enforce HTTPS** once the certificate is issued (can take a few minutes to an
hour). Using a plain `<user>.github.io` URL instead? Just delete the `CNAME`
file and clear the custom domain in Settings.

## Apple Wallet (optional)

Want it in Apple Wallet? Any Wallet pass must be signed with an Apple Developer
certificate, so the easiest no-cost route is a third-party pass builder
(e.g. **pass2u**, **WalletPasses**, **PassKit**): create a "generic" pass, add a
**QR code** with your card URL, and it hands you an installable pass.
*Note:* NFC inside a Wallet pass talks to reader terminals, not phones — the
physical NFC tag is what does phone-to-phone tapping.

## What's in here

| File | Purpose |
|------|---------|
| `config.js` | **Your data** — the only file you edit. |
| `setup.html` | Visual wizard: fill a form, preview live, download your `config.js`. |
| `index.html` | Thin shell that renders the card from your config. |
| `card.js` | Renders the card + builds the vCard + SEO/JSON-LD. (No need to edit.) |
| `styles.css` | Card styling (theme colors come from your config). |
| `assets/card-qr.*` | Your QR code. |
| `tools/generate-qr.py` | Regenerate the QR for a new URL. |
| `CNAME` | Custom domain for GitHub Pages. |

## How the "Save to Contacts" works

Tapping the button builds a **vCard** from your config on the spot and hands it
to the phone, which shows the native **Add Contact** sheet. Because it's
generated from `config.js`, the contact always matches what's on the card.

Hosted free on **GitHub Pages**.
