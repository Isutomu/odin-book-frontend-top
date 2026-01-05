# odin-book-frontend-top

> [!IMPORTANT]
> This is only the **frontend** part of the project. Be sure to also visit the [backend](https://github.com/Isutomu/odin-book-backend-top) part.

## Pointlessly long preface

This project is referent to the [Project: Odin Book](https://www.theodinproject.com/lessons/node-path-nodejs-odin-book) of [The Odin Project](https://www.theodinproject.com). The extra credits functionalities were also considered upon conception.

The planing phase was done, as per usual, in the form of scribbles on paper that can be found [here](). Potentially there are even more documents there if I deemed necessary to add it, so I'd recommend you to check it out.

As this is the first of the two repositories (backend and frontend) that I'm using for this project I also would like to share some thoughts about how I approached this project, both in terms of structures and development philosophy.

### Structure

In general, the idea is as following:

1. Outline the basic functionalities (what was required on the project description) along with some (in this case, all) extra credits functionalities
2. Sketch the interfaces for each of the functionalities (a slightly improved wireframe)
3. Loop for each functionality
   1. Implement the functionality on frontend (visual only)
   2. Define the necessary API calls
   3. Make tests for the necessary routes on backend (one route at a time)
   4. Implement the routes
   5. Connect to frontend
4. Initialize the production database
5. Deploy backend
6. Deploy frontend

Designing the database model, determining (if any) the information needed to initialize the database, and implementing said database is first priority once any work is to be done on the backend.

The overreliance on PaaS is one of (certainly) various weakness in this project as an educational venture. But as you're learning there's only so much you should do at once, so I will deploy it more "traditionally" later (maybe right after the WCAG stuff, who knows).

### Development Philosophy

First, English is not my first language, so this title surely sounds strange and also probably doesn't convey what I actually wanted to say, but I did not find a replacement (didn't look that hard too, to be honest).

This project will be a lot different from my previous projects (unless I update them later). What I mean by that is that I'll pull out all the stops to make this like I actually want it. Will this take double the time (maybe 3x, 4x)? Probably. But sometimes you have to challenge yourself, and so I'm borrowing the new year's energy to make this work.

For example, while I'll certainly learn a lot during this project (things that I can hardly imagine now, at the beginning), some things that I'll actively incorporate are:

1. Write it with Typescript
2. Use the git feature branch workflow
3. Implement lighter tests on frontend and proper(ish) tests on the backend

Which, being completely honest, is a respectable undertaking (also new year's energy to recognize my efforts). I would love to go one at a time with these things, but the timing worked out like that... so we ball!

There will also be some heavy refactoring later on regarding WCAG compliance, as I'm doing a lot already and don't think I can also include this (but again, I will refactor upon 1.0, because it's really important!!!).

## Features to implement

> [!IMPORTANT]
> Modifiers ("not priority" and the like) don't imply importance. Most of the time they simply mean that I thought they were too difficult to tackle for now.

## Features in consideration
