from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
root=Path('out').resolve()
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.ids=set(); self.h1=0; self.meta={}; self.canonical=None; self.title=''; self.in_title=False; self.schema=[]; self.in_schema=False; self.schema_text=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        if tag=='h1':self.h1+=1
        if tag=='title':self.in_title=True
        if tag in ('a','link') and a.get('href'):self.links.append(a['href'])
        if tag in ('img','script') and a.get('src'):self.links.append(a['src'])
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
        if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True;self.schema_text=''
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag=='script' and self.in_schema:self.schema.append(json.loads(self.schema_text));self.in_schema=False
    def handle_data(self,text):
        if self.in_title:self.title+=text
        if self.in_schema:self.schema_text+=text
pages={}
for file in root.rglob('*.html'):
    page=Page();page.feed(file.read_text(encoding='utf-8'));pages[file]=page
errors=[]
for file,page in pages.items():
    if page.h1!=1:errors.append(f'{file.relative_to(root)}: {page.h1} h1 elements')
    if not page.title:errors.append(f'{file}: missing title')
    if '404' not in str(file) and '_not-found' not in str(file):
        for meta in ('description','og:title','og:image','twitter:card'):
            if not page.meta.get(meta):errors.append(f'{file}: missing {meta}')
        if not page.canonical or not page.canonical.startswith('https://'):errors.append(f'{file}: missing absolute canonical')
        if not page.schema:errors.append(f'{file}: missing schema')
    for link in page.links:
        parsed=urlsplit(link)
        if parsed.scheme or parsed.netloc:continue
        target=(root / unquote(parsed.path).lstrip('/')) if parsed.path.startswith('/') else (file.parent / unquote(parsed.path))
        if not parsed.path:target=file
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append(f'{file.relative_to(root)} -> missing {link}')
        elif parsed.fragment and target in pages and parsed.fragment not in pages[target].ids:errors.append(f'{file.relative_to(root)} -> missing anchor {link}')
for asset in ('sitemap.xml','robots.txt','images/jawad-iqbal.webp','images/engineering-banner.webp','M-Jawad-Iqbal-CV.pdf'):
    if not (root/asset).is_file():errors.append(f'Missing {asset}')
assert not (root/'axe.min.js').exists(), 'Do not ship temporary audit script'
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML files; internal links, assets, anchors, titles, metadata, and schema.')
