## neworganisation-webpart

SharePoint Framework web part utilising the React Framework to submit an item into the list 'Organisation' utilising user defined parameters. Links with the SPFx New Bid web part.

Done:

* Submits to list using user defined parameters


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
