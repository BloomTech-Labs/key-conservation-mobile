import * as SecureStore from 'expo-secure-store';

function filterSearch(query, key, arr) {
  if (query === '') return arr;
  const match = new RegExp(query, 'i');
  return arr.filter((obj) => match.test(obj[key.toLowerCase()]));
}

import * as actions from '../actions';

const initialState = {
  error: '',
  openCampaigns: {},
  exchangingTokens: false,
  tokenExchangeCallbacks: [],
  errors: {
    getFeed: '',
    getCampaign: '',
    updateProfile: '',
    bookmarks: '',
    getComments: '',
  },
  newPostQueue: [],
  postUploadQueue: {},
  pending: {
    getComments: false,
    getFeed: false,
    getCampaign: false,
    updateProfile: false,
    bookmarks: false,
    deletePost: [], // An array of currently deleting posts
  },
  currentUser: {
    sub: '',
    role: '',
    email: '',
    name: '',
    token: '',
  },
  currentUserProfile: {
    campaigns: [],
    connections: [],
  },
  selectedProfile: {
    campaigns: [],
    connections: [],
  },
  allCampaigns: [],
  firstLogin: false,
  campaignsToggled: [],
  campaignsBySkill: [],
  token: '',
  profileReset: false,
  userRegistered: true,
  organizations: [], // All Organizations
  organizationWithCoords: [], // Organizations with coordinates that can be displayed on map,
  filteredOrganization: [], // Filtered Organizations
  reports: {
    currentReport: null,
    data: null,
    loading: false,
    error: '',
  },
  bookmarks: [],
  submissions: [],
  // This is to make sure only video is ever playing at any given time
  // The last video ID in this array will be the active video,
  // The array is ordered from least to most recently entered the viewport
  activeVideos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return {
        ...state,
        pending: { ...state.pending, login: true },
        error: '',
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: action.payload,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, login: false },
        error: '',
      };
    //Amplitude.logEventWithProperties('logged in', currentUser);

    case actions.LOGOUT:
      return {
        ...initialState,
        error: action.payload,
      };
    case actions.AFTER_FIRST_LOGIN:
      return {
        ...state,
        firstLogin: false,
      };
    case actions.GET_AUTH_START:
      return {
        ...state,
      };
    case actions.GET_AUTH_USER:
      return {
        ...state,
        userRegistered: true,
      };
    case actions.GET_AUTH_REGISTER:
      return {
        ...state,
        userRegistered: false,
      };
    case actions.GET_AUTH_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getAuth: false },
        error: action.payload,
      };
    case actions.GET_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, getProfile: true, bookmarks: true },
        error: '',
        profileReset: false,
      };
    case actions.GET_PROFILE_SUCCESS:
      let { user } = action.payload;
      if (action.payload.myProfile) {
        return {
          ...state,
          pending: {
            ...state.pending,
            getProfile: false,
            bookmarks: false,
          },
          errors: {
            bookmarks: '',
          },
          bookmarks: user.bookmarks,
          currentUserProfile: user,
          profileReset: false,
        };
      } else {
        return {
          ...state,
          pending: {
            ...state.pending,
            getProfile: false,
            bookmarks: false,
          },
          selectedProfile: user,
          profileReset: false,
        };
      }
    case actions.GET_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getProfile: false },
        error: action.payload,
        profileReset: true,
      };
    case actions.EDIT_PROFILE_START:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: true },
        currentUserProfile: {
          ...state.currentUserProfile,
          ...action.payload,
        },
        error: '',
      };
    case actions.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        currentUserProfile: {
          ...state.currentUserProfile,
          ...action.payload,
        },
      };
    case actions.EDIT_PROFILE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, updateProfile: false },
        error: action.payload,
      };
    case actions.POST_USER_START:
      return {
        ...state,
        pending: { ...state.pending, postUser: true },
        error: '',
      };
    case actions.POST_USER_SUCCESS:
      SecureStore.setItemAsync('id', `${action.payload.id}`);
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        currentUserProfile: action.payload,
        firstLogin: true,
        error: '',
      };
    case actions.POST_USER_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postUser: false },
        error: action.payload,
      };
    case actions.GET_FEED_START:
      return {
        ...state,
        pending: { ...state.pending, getFeed: true },
        errors: { ...state.errors, getFeed: '' },
      };
    case actions.GET_FEED_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, getFeed: false },
        allCampaigns: action.payload,
      };
    case actions.EXPAND_FEED_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, getFeed: false },
        allCampaigns: mergePosts([...action.payload, ...state.allCampaigns]),
      };
    case actions.GET_FEED_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getFeed: false },
        errors: { ...state.errors, getFeed: action.payload },
        allCampaigns: [],
      };
    case actions.GET_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: true },
        error: '',
      };
    case actions.GET_CAMPAIGN_SUCCESS:
      const campaign = action.payload;
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        openCampaigns: {
          ...state.openCampaigns,
          [campaign.id]: campaign,
        },
      };
    case actions.GET_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaign: false },
        error: action.payload,
      };
    case actions.OPEN_CAMPAIGN:
      return {
        ...state,
        openCampaigns: {
          ...state.openCampaigns,
          [action.payload.id]: action.payload,
        },
      };
    case actions.GET_CAMPAIGNS_BY_SKILL_START:
      return {
        ...state,
        pending: { ...state.pending, getCampaignsBySkill: true },
        error: '',
      };
    case actions.GET_CAMPAIGNS_BY_SKILL_SUCCESS:
      const campaigns = action.payload;
      return {
        ...state,
        pending: { ...state.pending, getCampaignsBySkill: false },
        campaignsBySkill: campaigns,
      };
    case actions.GET_CAMPAIGNS_BY_SKILL_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getCampaignsBySkill: false },
        error: action.payload,
      };
    case actions.DELETE_POST_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          deletePost: [...state.pending.deletePost, action.payload],
        },
        error: '',
      };
    case actions.DELETE_POST_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          deletePost: state.pending.deletePost.filter(
            (id) => id !== action.payload
          ),
        },
        allCampaigns: state.allCampaigns?.filter?.(
          (campaign) => campaign.id !== Number(action.payload)
        ),
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: state.currentUserProfile.campaigns?.filter?.(
            (campaign) => campaign.id !== action.payload
          ),
        },
      };
    case actions.DELETE_POST_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          deletePost: state.pending.deletePost.filter(
            (id) => id !== action.payload.id
          ),
        },
        error: action.payload.error,
      };
    case actions.POST_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: true },
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: action.payload.campaign,
        },
        error: '',
      };
    case actions.POST_CAMPAIGN_PROGRESS:
      return {
        ...state,
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: {
            ...state.postUploadQueue[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case actions.POST_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        postUploadQueue: removeFromUploadQueue(
          state.postUploadQueue,
          action.payload.id
        ),
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: [
            ...(state.currentUserProfile?.campaigns || []),
            action.payload.campaign,
          ],
        },
      };
    case actions.POST_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: {
            ...state.postUploadQueue[action.payload.id],
            status: 'Failed',
          },
        },
        error: action.payload.error,
      };
    case actions.POST_CAMPAIGN_CANCEL:
      return {
        ...state,
        pending: { ...state.pending, postCampaign: false },
        postUploadQueue: removeFromUploadQueue(
          state.postUploadQueue,
          action.payload
        ),
      };
    case actions.EDIT_CAMPAIGN_START:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: true },
        error: '',
      };
    case actions.EDIT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        openCampaigns: {
          ...state.openCampaigns,
          [action.payload.id]: action.payload,
        },
      };
    case actions.EDIT_CAMPAIGN_ERROR:
      return {
        ...state,
        pending: { ...state.pending, editCampaign: false },
        error: action.payload,
      };
    case actions.POST_CAMPAIGN_UPDATE_START:
      return {
        ...state,
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: {
            ...action.payload.campaignUpdate,
            isUpdate: true,
          },
        },
        pending: { ...state.pending, postCampaignUpdate: true },
        error: '',
      };
    case actions.POST_CAMPAIGN_UPDATE_PROGRESS:
      return {
        ...state,
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: {
            ...state.postUploadQueue[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case actions.POST_CAMPAIGN_UPDATE_SUCCESS:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: false },
        postUploadQueue: removeFromUploadQueue(
          state.postUploadQueue,
          action.payload.id
        ),
        currentUserProfile: {
          ...state.currentUserProfile,
          campaigns: [
            ...(state.currentUserProfile?.campaigns || []),
            action.payload.campaignUpdate,
          ],
        },
      };
    case actions.POST_CAMPAIGN_UPDATE_ERROR:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: false },
        postUploadQueue: {
          ...state.postUploadQueue,
          [action.payload.id]: {
            ...state.postUploadQueue[action.payload.id],
            status: 'Failed',
          },
        },
        error: action.payload.error,
      };
    case actions.POST_CAMPAIGN_UPDATE_CANCEL:
      return {
        ...state,
        pending: { ...state.pending, postCampaignUpdate: false },
        postUploadQueue: removeFromUploadQueue(
          state.postUploadQueue,
          action.payload
        ),
      };
    case actions.UPDATE_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: {
          ...state.currentUserProfile,
          ...action.payload,
        },
      };
    case actions.TOGGLE_CAMPAIGN_TEXT:
      return {
        ...state,
        campaignsToggled: [...state.campaignsToggled, action.payload],
      };
    case actions.POST_COMMENT_START:
      return {
        ...state,
        error: '',
      };
    case actions.POST_COMMENT_SUCCESS:
      return {
        ...state,
        openCampaigns: setComments(state.openCampaigns, action.payload),
      };
    case actions.POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actions.DELETE_COMMENT_START:
      return {
        ...state,
        error: '',
      };
    case actions.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        openCampaigns: deleteComment(state.openCampaigns, action.payload),
      };
    case actions.DELETE_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actions.GET_ORGANIZATIONS_STARTED:
      return {
        ...state,
        error: '',
      };
    case actions.GET_ORGANIZATIONS_SUCCESS:
      const organizationWithCoords = action.payload.filter(
        (coords) => coords.latitude && coords.longitude !== null
      );

      return {
        ...state,
        organizations: action.payload,
        organizationWithCoords: organizationWithCoords,
        filteredOrganization: organizationWithCoords,
        error: '',
      };
    case actions.GET_ORGANIZATIONS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actions.SET_MAP_SEARCH_QUERY:
      const query = action.payload['query'];
      const key = action.payload['field'];
      return {
        ...state,
        filteredOrganization: filterSearch(
          query,
          key,
          state.organizationWithCoords
        ),
      };
    case actions.GET_REPORTS_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: '',
        },
      };
    case actions.GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: action.payload,
          loading: false,
        },
      };
    case actions.GET_REPORTS_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload,
        },
      };
    case actions.GET_REPORT_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: '',
        },
      };
    case actions.GET_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          currentReport: action.payload,
        },
      };
    case actions.GET_REPORT_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload,
        },
      };
    case actions.GET_ORIGINAL_POST_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          getCampaign: true,
        },
        errors: {
          ...state.errors,
          getCampaign: '',
        },
      };
    case actions.GET_ORIGINAL_POST_SUCCESS: {
      return {
        ...state,
        pending: {
          ...state.pending,
          getCampaign: false,
        },
        openCampaigns: {
          ...state.openCampaigns,
          [action.payload.id]: action.payload,
        },
      };
    }
    case actions.GET_ORIGINAL_POST_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          getCampaign: false,
        },
        errors: {
          ...state.errors,
          getCampaign: action.payload,
        },
      };
    case actions.ARCHIVE_REPORT_START:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: '',
        },
      };
    case actions.ARCHIVE_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
        },
      };
    case actions.ARCHIVE_REPORT_ERROR:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload,
        },
      };
    case actions.ADD_BOOKMARK_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: true,
        },
        errors: {
          ...state.errors,
          bookmarks: '',
        },
      };
    case actions.REMOVE_BOOKMARK_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: true,
        },
        errors: {
          ...state.errors,
          bookmarks: '',
        },
      };
    case actions.FETCH_BOOKMARKS_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: true,
        },
        errors: {
          ...state.errors,
          bookmarks: '',
        },
      };
    case actions.ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: false,
        },
        bookmarks: [...new Set([...state.bookmarks, action.payload])],
      };
    case actions.REMOVE_BOOKMARK_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: false,
        },
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.campaign_id !== action.payload
        ),
      };
    case actions.FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          bookmarks: false,
        },
        bookmarks: action.payload,
      };
    case actions.ADD_BOOKMARK_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          bookmarks: action.payload,
        },
        pending: {
          ...state.pending,
          bookmarks: false,
        },
      };
    case actions.REMOVE_BOOKMARK_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          bookmarks: action.payload,
        },
        pending: {
          ...state.pending,
          bookmarks: false,
        },
      };
    case actions.FETCH_BOOKMARK_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          bookmarks: action.payload,
        },
        pending: {
          ...state.pending,
          bookmarks: false,
        },
      };
    case actions.APPEND_TO_FEED:
      const newCampaigns =
        action.payload.length > 0
          ? mergePosts([...action.payload, ...state.allCampaigns])
          : [...state.allCampaigns];

      return {
        ...state,
        allCampaigns: newCampaigns,
        newPostQueue: [],
      };
    case actions.QUEUE_NEW_POSTS:
      return {
        ...state,
        newPostQueue: [action.payload, ...state.newPostQueue],
      };
    case actions.DEQUEUE_NEW_POSTS:
      return {
        ...state,
        allCampaigns: mergePosts([
          ...state.newPostQueue,
          ...state.allCampaigns,
        ]),
        newPostQueue: [],
      };
    case actions.GET_APPLICATIONS_BY_USER_START:
      return {
        ...state,
        pending: { ...state.pending, getApplicationsByUser: true },
        error: '',
      };
    case actions.GET_APPLICATIONS_BY_USER_SUCCESS:
      const submissions = action.payload;
      return {
        ...state,
        pending: { ...state.pending, getApplicationsByUser: false },
        submissions,
      };
    case actions.GET_APPLICATIONS_BY_USER_ERROR:
      return {
        ...state,
        pending: { ...state.pending, getApplicationsByUser: true },
        error: action.payload,
      };
    case actions.SET_ACTIVE_VIDEO:
      return {
        ...state,
        activeVideos: [...state.activeVideos, action.payload],
      };
    case actions.UNSET_ACTIVE_VIDEO:
      return {
        ...state,
        activeVideos: state.activeVideos.filter((v) => v !== action.payload),
      };
    case actions.UPDATE_PROFILE_DATA:
      return {
        ...state,
        currentUserProfile: {
          ...state.currentUserProfile,
          ...action.payload,
        },
      };
    case actions.BEGIN_EXCHANGE_TOKEN:
      return {
        ...state,
        exchangingTokens: true,
        tokenExchangeCallbacks: [],
      };
    case actions.LISTEN_FOR_EXCHANGE_TOKEN:
      return {
        ...state,
        tokenExchangeCallbacks: [
          ...state.tokenExchangeCallbacks,
          action.payload,
        ],
      };
    case actions.EXCHANGE_TOKEN_SUCCESS:
      state.tokenExchangeCallbacks.forEach((cb) => {
        cb.resolve(action.payload);
      });
      return {
        ...state,
        exchangingTokens: false,
        tokenExchangeCallbacks: [],
      };
    case actions.EXCHANGE_TOKEN_FAILURE:
      state.tokenExchangeCallbacks.forEach((cb) => {
        cb.reject('Failed to exchange tokens with authentication server');
      });
      return {
        ...state,
        exchangingTokens: false,
        tokenExchangeCallbacks: [],
      };
    case actions.GET_CAMPAIGN_COMMENTS_START:
      return {
        ...state,
        pending: {
          ...state.pending,
          getComments: true,
        },
        errors: {
          ...state.errors,
          getComments: '',
        },
      };
    case actions.GET_CAMPAIGN_COMMENTS_SUCCESS:
      return {
        ...state,
        pending: {
          ...state.pending,
          getComments: false,
        },
        openCampaigns: setComments(state.openCampaigns, action.payload),
      };
    case actions.GET_CAMPAIGN_COMMENTS_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          getComments: false,
        },
        errors: {
          ...state.errors,
          getComments: action.payload,
        },
      };
    default:
      return state;
  }
};

const setComments = (openCampaigns, payload) => {
  return Object.fromEntries(
    Object.entries(openCampaigns)
      .filter(([key, value]) => key !== undefined && value !== undefined)
      .map(([key, value]) => {
        if (value.campaign_id === payload.campaign_id) {
          return [key, { ...value, comments: payload.comments }];
        } else return value;
      })
  );
};

const deleteComment = (openCampaigns, commentId) => {
  const newEntries = Object.entries(openCampaigns)
    .filter(([key, value]) => key !== undefined && value !== undefined)
    .map(([key, value]) => {
      const newComments = value.comments.filter((c) => {
        return parseInt(c.id) !== parseInt(commentId);
      });

      return [
        key,
        {
          ...value,
          comments: newComments,
        },
      ];
    });

  return Object.fromEntries(newEntries);
};

const removeFromUploadQueue = (queue, id) => {
  const newQueue = Object.create(queue);

  delete newQueue[id];

  return newQueue;
};

const mergePosts = (posts) => {
  // Refresh posts
  // Take out duplicates by adding
  // first instance to array, and duplicates
  // afterwards are ignored
  // The first instances are the newer ones,
  // so we take advantage of that
  let refreshedPosts = [];
  let ids = [];

  for (const i in posts) {
    if (!ids.includes(posts[i].id)) {
      ids.push(posts[i].id);
      refreshedPosts.push(posts[i]);
    }
  }

  return refreshedPosts.sort(
    (a, b) =>
      new Date(a.created_at).getTime() < new Date(b.created_at).getTime()
  );
};

export default reducer;
