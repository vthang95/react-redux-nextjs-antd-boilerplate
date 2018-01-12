A simple react + next example app. A boilerplate for server side rendering with react and nextjs

# React-Next.js-Antd Boilerplate

Next.js is a minimalistic framework for server-rendered React applications.

This boilerplate provide an example of how to use Nextjs, combine with Express, Redux, and UI library Ant.Design.
It use scss as a preprocessor with modern structure and it is compiled with node-sass (provide binding for Node.js).

This project was created to make easier to get started without concern about configuration and structuring of you codebase
when you need to kick off your own project. This minimalist boilerplate will help you and save your time

## Development environment

- With `yarn`

```
git clone https://github.com/vthang95/react-redux-nextjs-antd-boilerplate.git
yarn install
yarn dev
```

- With `npm`

```
git clone https://github.com/vthang95/react-redux-nextjs-antd-boilerplate.git
npm install
npm run dev
```

Now you project is running on default port 8090

## Production environment

- With `yarn`

```
yarn install
yarn build
yarn start
```

- With `npm`

```
npm install
npm run build
npm start
```

Everytime you change your source, you must rebuild with `yarn build` to apply the changes.

## Environment variables

You can define you own environment variables in `.env`. To access them, use `process.env.${VARIABLE_NAME}`.

## Test

This boilerplate is not include test. Please feel free to contribute!

## Contributing

I am not educated in computer science so it maybe contain many unreasonable problems. So, feel free to submit a PR or issues.
