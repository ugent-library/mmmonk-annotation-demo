# Annotation demo

A web application showcasing annotations in different categories in a simulated [Mirador 3](https://projectmirador.org/) environment.

The app is written in TypeScript using [React](https://reactjs.org/) and [Material UI](https://mui.com/) to keep the interface as close as possible to Mirador.

[Vite](https://vitejs.dev/) is used as development server and build tool.

## Installing

[Node.js](https://nodejs.org/) is required to build or develop the app.

Install the dependencies:

```bash
npm install
```

## Developing

Start a development server:

```bash
npm run dev
```

Fast refresh is disabled for now because of [this bug](https://github.com/vitejs/vite/issues/3301) in Vite.

## Building

Build a production version of the app:

```bash
npm run build
```

The build output can be found in `dist`.

`dist/index.html` is an example of a page with the app embedded. The app will mount a `div` with `id="annotation-demo"` and needs the linked `.css` and `.js` files as seen there.

> You can preview the built app with `npm run preview`. This should _not_ be used to serve the app in production.

## Structure

- [`public`](public) contains static assets like the images of the Liber Floridus used in the demo.
- [`src`](src) contains the sourcecode of the
- [`src/main.tsx`](src/main.tsx) is the entrypoint of the React app.
- [`src/config.ts`](src/config.ts) contains the available categories, their initial state and icon.
- [`src/annotations.json`](src/annotations.json) contains the annotations using the [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) with an added `category` key that maps to the `id` key found in the categories in `src/config.ts`
- [`src/pages.json`](src/pages.json) contains a simplified subset of an IIIF-manifest. The `body.src` in here maps to the files in `public`. The page `id` is used as target by the annotations in `src/annotations.json`.
