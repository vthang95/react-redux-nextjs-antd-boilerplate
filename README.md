A simple react + next example app. A boilerplate for server side rendering with react and nextjs

# React-Next.js-Antd Boilerplate

Next.js is a minimalistic framework for server-rendered React applications.

This boilerplate provide an example of how to use Nextjs, combine with Express, Redux, and UI library Ant.Design.
It use scss as a preprocessor with modern structure and it is compiled with node-sass (provide binding for Node.js).

This project was created to make easier to get started without concern about configuration and structuring of you codebase
when you need to kick off your own project. This minimalist boilerplate will help you and save your time

# Server: Express, MongoDB, Mongoose

This project use MongoDB to store data and use Express.js to handle logic.But it is not recommended. It is just examples to put some logics
that make you understand how these things work. For bussiness server, You need to create another backend server seperately. Next.js is just used for rendering. Don't mix it.

Backend structure:

|--/src
|----/api
|------/users
|--------/index.js
|--------/user.controller.js
|--------/user.dao.js
|--------/user.schema.js
|----/authentication.js
|----/global-controller.js
|----/server.js

# UI library Ant.design

When i found Antd, i just thought: "Oh my god! This tiny ant is really powerful!". Antd has modern design and rich components. The documentations is very clear with detailed functionality and examples. This is reason why i will choose ant for my next projects.
You can check it out at: https://ant.design

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

I am not educated in computer science so it may contain many unreasonable problems. Feel free to submit a PR or issues.
