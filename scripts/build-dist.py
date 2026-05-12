from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]

html = (ROOT / "index.html").read_text()
css = (ROOT / "styles.css").read_text()
js = (ROOT / "script.js").read_text()
hot = (ROOT / "data" / "hot-rounds.json").read_text().strip()
favicon = (ROOT / "favicon.svg").read_text()

favicon_uri = "data:image/svg+xml," + quote(favicon)
html = html.replace(
    '<link rel="icon" href="./favicon.svg" type="image/svg+xml" />',
    f'<link rel="icon" href="{favicon_uri}" type="image/svg+xml" />',
)
html = html.replace('<link rel="stylesheet" href="./styles.css" />', f"<style>\n{css}\n</style>")
js = (
    "window.__HOT_ROUNDS__ = "
    + hot
    + ";\n"
    + js.replace(
        'const response = await fetch("./data/hot-rounds.json", { cache: "no-store" });\n'
        "    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n"
        "    const hotRounds = await response.json();",
        "const hotRounds = window.__HOT_ROUNDS__ || [];",
    )
)
html = html.replace('<script src="./script.js"></script>', f"<script>\n{js}\n</script>")

dist = ROOT / "dist"
dist.mkdir(exist_ok=True)
(dist / "index.html").write_text(html)
print(f"Wrote {dist / 'index.html'}")
