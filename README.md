# Notes App

A simple notes/cart management application built with [Nuxt 3](https://nuxt.com/), [Vue 3](https://vuejs.org/), [Pinia](https://pinia.vuejs.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- Create, edit, and delete carts/notes with different styles:
  - Default
  - Image
  - Checkbox (with options)
- Filter carts by type
- Upload and preview images
- Responsive and modern UI
- State management with Pinia
- Data persistence via `localStorage`

## Project Structure

```
assets/         # CSS and media assets
components/     # Vue components (modals, inputs, cards, etc.)
layouts/        # Nuxt layouts
pages/          # Application pages (index, note details)
public/         # Static files (favicon, robots.txt)
stores/         # Pinia stores (cartStore)
```

## Setup

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Technologies Used

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT