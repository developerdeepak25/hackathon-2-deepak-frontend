# PolicyHawk Web

Next.js frontend for PolicyHawk, based on the dark HTML prototype.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js App Router
- Tailwind CSS v4 + shadcn/ui tokens
- TanStack Query (API wiring in progress)
- Redux Toolkit (theme, directory filters, demo session, toasts)

## API

Set `NEXT_PUBLIC_API_URL` (see `.env.example`). Directory and tracker pages use static layout until the Nest API is connected.
