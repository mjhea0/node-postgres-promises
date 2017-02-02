# Test Driven Development With Node, Postgres, and Knex (Red/Green/Refactor)

## Want to learn how to build this project?

Check out the [blog post](http://mherman.org/blog/2016/04/28/test-driven-development-with-node).

## Want to use this project?

1. Fork/Clone
1. Install dependencies - `npm install`
1. Create two local Postgres databases - `mocha_chai_tv_shows` and `mocha_chai_tv_shows_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `gulp`
1. Test - `npm test`
