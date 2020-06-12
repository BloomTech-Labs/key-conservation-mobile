import configureStore from 'redux-mock-store';
const {
  setCampaign,
  toggleCampaignText,
  getCampaignPost,
} = require('../store/actions');
import thunk from 'redux-thunk';

const middlewares = [thunk];
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

test('toggleCampaignText', () => {
  const initialState = {};
  const store = mockStore(initialState);
  store.dispatch(toggleCampaignText());
  expect(store.getActions()).toMatchSnapshot();
});

describe('getCampaignPost', () => {
  const fakeCampaignPost = { test: 'test', id: 1 };
  let { id, test } = fakeCampaignPost;
  const initialState = {};
  const store = mockStore(initialState);

  const getCampSuccess = () => {
    return {
      type: 'GET_REPORTS_SUCCESS',
    };
  };

  const getCampaigns = () => {
    return (dispatch) => {
      return getCampaignPost({ id }).then(() => dispatch(getCampSuccess()));
    };
  };

  it('should fetch proper post', () => {
    store.dispatch(getCampaigns()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(getCampSuccess());
    });
  });
});
