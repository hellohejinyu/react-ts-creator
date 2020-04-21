# React&TypeScript App Creator &middot; [![npm](https://img.shields.io/npm/v/react-ts-creator.svg)](https://www.npmjs.com/package/react-ts-creator)

Create React&TypeScript apps by running one command. 

## Usage
`
react-ts-creator [command]
`

### Commands:
`
init|i [app-name]
`

> Create a React&Typescript app under the [app-name] folder. If there is no [app-name], create it 
directly in the current directory.

## Quick Overview

``` sh
npx react-ts-creator init [app-name]
```
Enter `npm run start` to start the development server

When you're ready to deploy to production, create a minified bundle with `npm run build`

## Q&A

Q: When I use `optional chaining` and `nullish-coalescing` in Typescript@3.7+.
It will throw error in terminal.

![](./assets/0.png)

A: You need to make sure your VSCode is using the correct version of TypeScript

![](./assets/1.png)

![](./assets/2.png)