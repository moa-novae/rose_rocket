# Rose Rocket Coding Challenge July 2020

## Getting Started

You can look at the app at [Netlify](https://gallant-yalow-f12555.netlify.app/). If you want to check it out locally, clone the repo onto your computer with

```bash
git clone https://github.com/moa-novae/rose_rocket.git

cd rose_rocket

yarn install

```

And then start the developmental server at localhost:3000/ with

``` bash
yarn start
```

To look at the production build at localhost:5000/, you will need to do

```bash
yarn build
yarn global add serve
serve -s build
```

I have tried to keep dependency to a minimum. No component library is used at all, so the install should be fairly quick.

## description

This is my submission to the Rose Rocket coding challenge for junior dev July 2020. It is a calendar app that keeps track of various tasks a driver might have.