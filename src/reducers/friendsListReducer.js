import {
  FULFILLED,
  PENDING,
  REJECTED,
  ADD_FRIEND,
} from '../actions/friendListActions';

export const initialState = {
  friendsList: [],
  isFetching: false,
  errorData: null,
};

const friendsListReducer = (state = initialState, {type, payload = {}}) => {
  switch (type) {
    case FULFILLED:
      return {
        ...state,
        friendsList: payload,
      };
    case PENDING:
      return {
        ...state,
        isFetching: payload,
      };
    case REJECTED:
      return {
        ...state,
        errorData: payload,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friendsList: [...state.friendsList, payload],
      };
    default:
      return state;
  }
};

export default friendsListReducer;
