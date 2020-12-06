[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_shield)

OPTIMADE dot Science
==========

This is a very simple minimalistic in-browser OPTIMADE client, written in a vanilla ES5 JavaScript.
It fetches the OPTIMADE providers list, looks for the structure endpoints, and allows sequential querying against all of them, aggregating the results together.
Technically this is just the single file `index.html`.
All relatively modern web-browsers including IE11 are supported.

Live demo
------

[optimade.science](https://optimade.science)

Installation
------

To build the  project, [nodejs](https://nodejs.org/) version greater than `8.x.x` should be installed on your system. Perform the following commands in your terminal/command line:

```sh
cd ./project-folder/

npm install

npm run build
```

After the build process completed resulting `index.html` file will be available in `dist` folder. It can be simply opened in your browser or perform the following command to start the static web-server locally:

```sh
npm run start
```

and open [http://localhost:5000/](http://localhost:5000/) in your browser.

Development
------

To run the project in development and watch mode, perform the following command in your terminal/command line:

```sh
npm run dev
```

Don't close the terminal window to watch file changes and automatically apply to and reload the page.

License
------

[MIT](https://en.wikipedia.org/wiki/MIT_License)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftilde-lab%2Foptimade.science?ref=badge_large)
