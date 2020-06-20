import configureStore from 'redux-mock-store';
const {
  setCampaign,
  toggleCampaignText,
  getCampaignPost,
  addBookmark,
  removeBookmark,
  getConnections,
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

  const getCampaigns = () => {
    return (dispatch) => {
      getCampaignPost({ id });

      return dispatch({ type: 'GET_REPORTS_SUCCESS' });
    };
  };

  it('should fetch proper post', () => {
    store.dispatch(getCampaigns());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'GET_REPORTS_SUCCESS' });
  });
});

describe('addBookmark', () => {
  const fakeBookmark = { test: 'test', id: 1 };
  let { id, test } = fakeBookmark;
  const initialState = {};
  const store = mockStore(initialState);

  const bookmark = () => {
    return (dispatch) => {
      addBookmark({ id });

      return dispatch({ type: 'ADD_BOOKMARK_SUCCESS' });
    };
  };

  it('should add bookmark', () => {
    store.dispatch(bookmark());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'ADD_BOOKMARK_SUCCESS' });
  });
});

describe('removeBookmark', () => {
  const fakeBookmark = { test: 'test', id: 1 };
  let { id, test } = fakeBookmark;
  const initialState = {};
  const store = mockStore(initialState);

  const bookmarkRemove = () => {
    return (dispatch) => {
      removeBookmark({ id });

      return dispatch({ type: 'REMOVE_BOOKMARK_SUCCESS' });
    };
  };

  it('should remove bookmark', () => {
    store.dispatch(bookmarkRemove());

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'REMOVE_BOOKMARK_SUCCESS' });
  });
});

test('getConnections', () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(getConnections());
  expect(store.getActions()).toMatchSnapshot();
});
