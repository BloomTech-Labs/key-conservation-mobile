import configureStore from 'redux-mock-store';
const { setCampaign } = require('../store/actions');

const middlewares = [];
const mockStore = configureStore(middlewares);

test('setCampaign("test")', () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  const fakeCampaign = { test: 'test' };

  store.dispatch(setCampaign(fakeCampaign));

  expect(store.getActions()).toMatchSnapshot();
});

test('setCampaign(null)', () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(setCampaign());

  expect(store.getActions()).toMatchSnapshot();
});
