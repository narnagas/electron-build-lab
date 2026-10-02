# React reporting POC

A standalone React application built with Vite, Recharts for graphics, and @react-pdf/renderer for PDF preview and download. All orders are synthetic sample data; there is no live API connection yet.

## Run

Use Node.js 24.19.0 (the same version as the Angular and Electron POCs):

```powershell
cd react-reports
npm ci
npm start
```

Open http://localhost:5173. The server uses a strict port so Electron always receives the expected URL.

In a second terminal, from the repository root:

```powershell
cd electron
$env:ELECTRON_LAB_URL = "http://localhost:5173"
npm start
```

Use `Remove-Item Env:ELECTRON_LAB_URL` to restore the shell's default Angular URL. Angular does not need to run for this React example.

## Features

- Inclusive From/To date filtering with invalid-range feedback and reset.
- Order count, total value, and distinct customer count.
- Orders-by-day bar chart and job-ID-sorted table.
- Letter portrait grayscale PDF with non-splitting rows and page numbers.
- Preview and download share the same PDF document and filtered rows.

PDF generation runs in the browser. Large production reports may need server generation; measure that separately. Electron PDF download/viewer integration should be checked on Windows.

## Build and test

```powershell
npm run build
npm test
npm run preview
```

Production files are written to `dist/`. Serve them independently of Electron.

## Code map

- `src/main.jsx`: report screen, React state, filters, and summary.
- `src/services/orders.js`: sample-data boundary and report calculations; replace with a reporting-service client later.
- `src/charts/OrdersChart.jsx`: reusable chart.
- `src/reports/DailyOrdersPdf.jsx`: shared PDF layout.
- `src/styles/app.css`: responsive screen styles.

Next: introduce the independent .NET reporting service, then connect its reporting endpoint to the React data boundary. Existing UI/Admin API integration follows sample-data validation.
