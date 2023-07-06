OPTIMADE dot Science
==========

[![DOI](https://zenodo.org/badge/190895428.svg)](https://doi.org/10.5281/zenodo.7693406)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_shield)

This is a minimalistic in-browser OPTIMADE aggregator, written in TypeScript language on top of the [Svelte](https://svelte.dev) frontend framework. It fetches the official OPTIMADE providers list, looks for the structure endpoints, and allows simultaneous querying against all of them, collecting the results together at the single webpage.

Technically this is just the single file `index.html`, highly-portable, can be opened from anywhere, on any environment (e.g. at the smartphone or locally from the USB-stick).

[Svelte-Spectre](https://kit.metis.science) (based on [Spectre CSS framework](https://picturepan2.github.io/spectre)) is used as a user interface kit. A standalone [Optimade client](https://github.com/tilde-lab/optimade-client) written in isomorphic TypeScript is employed.

Live demo
------

[optimade.science](https://optimade.science)

Installation
------

To build the project, [nodejs](https://nodejs.org) version greater than `8.x.x` should be installed in your system. Run the following commands in your terminal/command line:

```sh
cd ./project-folder/

npm install

npm run build
```

After the build process succeeds, the resulting `index.html` file will be available in `dist` folder. It can be simply opened in your browser. Run the following command to start the static web-server locally:

```sh
npm run start
```

and open [http://localhost:5000/](http://localhost:5000/) in your browser.

Development
------

To run the project in development and watch mode, run the following command in your terminal/command line:

```sh
npm run dev
```

Don't close the terminal window to watch file changes and automatically apply to and reload the page.

Sources file layout
------

`assets` - static files

`components` - low-level (dumb, pure, reusable) UI parts

`helpers` - pure functions for the templates (that cannot be inlined)

`layouts` - CSS framework components wrapped around the *slots* and providing the *props*

`services` - singletons sharing the business logic across the app (e.g. Optimade API consumption)

`stores` - shareable and reusable data flows

`types` - TS definitions

`views` - smarter high-level multi-purpose UI parts, mostly not reusable, cf. `components`

License
------

[MIT](https://en.wikipedia.org/wiki/MIT_License)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_large)
