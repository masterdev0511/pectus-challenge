
## 🚀 Getting started

First of all you need to have `node` and `yarn`(or `npm`) installed on your machine.

1. `yarn` or `npm install`
2. `yarn start` or `npm run start`

To run the tests, after the dependencies are installed, run `yarn test`.

`yarn test:watch` to keep testing observing changes.

`yarn test:coverage` to generate the test coverage report in the files.

## Explanation
Using papaparse, I get data from the csv file.
I have built the UI with MUI components.
# The description of functions
    sortedData - get sorted data by each field (MainTable.tsx)
    getDataByGroup - get grouped data by each field (AmountTable.tsx)
    getTotalAmount - get total amounts of the data (AmountTable.tsx)
