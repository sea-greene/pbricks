# Purple Bricks Test Readme

## To run

Install dependencies with `npm install`

Run with `npm run dev`

## Tests

There are few tests - if this test was supposed be longer than two hours there would be more coverage

Run tests with `npx jest`

## Notes

- I've used Vite as scaffolding to meet the time constraints.
- Redux would seem like overkill for the scope of this test and therefore is not used.
- Localstorage is being used as a storage method for this test, but in real life it would be better to store this information in a database.
- Although I'm using React components, there are not separated to the extent they would be if they were being re-used in other contexts in a wider system. Often when componentising and modularising code, it's useful to know which components will be re-used and which will not, to avoid modularising prematurely which can lead to overly fragmented components.
- I've prioritised accessibility, speed and functionality over an enhanced appearance and have opted not to use Material UI, for example, which can often lead to accessibility issues. This approach should make it user friendly to a wide range of users and fundamentally means the code and html is structured well.
- The design is mobile first - which avoids responsiveness issues.
- I've added very basic validation due to time constraints.
