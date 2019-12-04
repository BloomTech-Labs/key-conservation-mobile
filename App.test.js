/******* A NOTE ON TESTING TO FUTURE LAMBDA STUDENTS********/
/*
On December 3, 2019, I went to office hours to get help with this app because, after an entire day of two people researching, we could not get the app's basic tests to run.

It turns out that our version of react-native is a year and a half old: we are running version 33, and the current version is 61. Furthermore, over the past 18 or so months, jest testing technology has significantly developed, making our version of react-native incompatible with current testing. 

We commented out the code in node_modules/react-native/jest/mockComponent just to get our "sanity check" code to work. We left some tests that *ought* to work commented out just because we could. 

Feel free to play around with it if you feel so inclined!!!

Julie Gumerman
*/


// import { getLoadingData } from "../store/actions.index.js";
// import React from 'react';
// import renderer from 'react-test-renderer';

// import App from './App';

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });

describe('sanity check', () => {
  it ("does math", () => {
    const sum = (x, y) => {
      return x + y;
    }
    const results = sum(2, 3);
  
    expect(results).toBe(5);
  })
})

// describe('get loading data', () => {
//   it ('loads data', async () => {
//     const loadData = await getLoadingData();
//     expect(loadData).toBeDefined();

//   })
// })

