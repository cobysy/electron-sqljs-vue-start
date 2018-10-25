# electron-sqljs-vue

```shell
$ # Scaffold Vue project
$ vue create electron-sqljs-vue-start
$ # (selected typescript, tslint, unit test)

$ cd electron-sqljs-vue-start

$ # Add Vue plugin for Electron 
$ vue add electron-builder
$ # (selected electron v 2)

$ # Fix linting issues with background.ts (added by Vue plugin for Electron )
$ tslint --fix src/background.ts

$ # Add pure JS sqlite and ts-node
$ yarn add sql.js ts-node

$ # Create TS script for generating database to include in the final application
$ # (a hello.sqlite will be created in the public folder)
$ mkdir utils
$ touch generatedb.ts
$ # ...

$ # Add generate db script in package.json
$ #     "gendb": "ts-node -O '{\"module\": \"commonjs\"}' utils/generatedb.ts"
$ # ...

$ # Add TS code in src/background.ts and src/components/[component].vue file
$ # which reads data from hello.sqlite and presents the data to the user
$ # (the `__static` global variable points to the public folder)
```

