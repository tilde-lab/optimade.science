[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_shield)

OPTIMADE dot Science
==========

This is a minimalistic in-browser OPTIMADE client, written in [Svelte](https://svelte.dev) and TypeScript.
It fetches the OPTIMADE providers list, looks for the structure endpoints, and allows sequential querying against all of them, aggregating the results together.

Technically this is just the single file `index.html`, can be opened locally from anywhere, on any environment.

[Spectre](https://picturepan2.github.io/spectre) is used as a CSS framework. A standalone [Optimade](https://www.npmjs.com/package/optimade) client written in isomorphic TypeScript is employed.

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

`assets` - static files etc.
`components` - low-level modules
`helpers` - auxiliary utils
`layouts` - CSS framework modules
`services` - Optimade API consumption
`stores` - functionality extensions
`types` - TS definitions
`views` - high-level (smarter) modules, cf. `components`

License
------

[MIT](https://en.wikipedia.org/wiki/MIT_License)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_large)
