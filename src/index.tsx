import { Hono } from 'hono'
import { html } from 'hono/html'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files: /static/* maps to public/static/
app.use('/static/*', serveStatic({ root: './' }))

// Serve favicon inline (avoids serveStatic path edge case for root files)
app.get('/favicon.svg', (c) => {
  c.header('Content-Type', 'image/svg+xml')
  return c.body(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💞</text></svg>`)
})

app.get('/', (c) => {
  return c.html(html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Love Languages Workbook</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>
  <div id="app"></div>
  <div id="print-doc"></div>
  <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
