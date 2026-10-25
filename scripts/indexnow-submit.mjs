// Submits every sitemap URL to IndexNow (Bing, Yandex, Seznam; Bing also
// feeds Copilot/ChatGPT search). Run after a content deploy:
//   node scripts/indexnow-submit.mjs
// The key file is public/7e3af31e1f81082dc84d49ec5da5f995.txt (served at the site root).
const HOST = 'www.bsolution.eu'
const KEY = '7e3af31e1f81082dc84d49ec5da5f995'
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length === 0) throw new Error('sitemap has no URLs')
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
})
console.log(`IndexNow: ${response.status} for ${urls.length} URLs`)
if (!response.ok && response.status !== 202) process.exit(1)
