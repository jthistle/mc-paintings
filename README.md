# Minecraft Painting Resource Pack Creator

This is a website that allows users to crop images and automatically compile them into a resource pack, without
any server-side processing - it uses tools that all work in the browser, and base64 image encoding.

## Development

### Yarn commands

MC Paintings is run with `yarn`.

#### `yarn dev`

Run MC Paintings in development mode with the local development server.

#### `yarn build`

Build MC Paintings. Shouldn't be needed.

#### `yarn start`

Serve the compiled website in the `build` folder.

#### `yarn release`

(Owner only) Bump the version of the website, tag it and push it.

### General development

This website is developed on the branch `develop`. `master` only accepts pull requests from `develop`. Any changes
should be made as commits to `develop` (or, if you're an external contributor, as a PR to `develop`).

Heroku automatically builds and deploys master when it is pushed to.

### Project structure overview

There's a pretty simple structure:

- src
  - components: All the shareable components used in the website. Components should be created as much as possible, even if there isn't an immediate use for them in more than one page.
  - pages: All the pages used in the website. Routing to these pages in `App.js`.
  - fonts: the fonts used in this website, licensed under the OFL

## Contributing

Contributions are welcomed. Please make a PR into the `develop` branch.
