export const PENDING = 'PENDING';
export const FULFILLED = 'FULFILLED';
export const REJECTED = 'REJECTED';
export const ADD_FRIEND = 'ADD_FRIEND';
export const getFriendList = () => async dispatch => {
  try {
    await dispatch(registerPending());
    const response = await fetch(
      'https://rnapp-mock-developer-edition.ap24.force.com/services/apexrest/apiservice',
    );
    const data = await response.json();
    console.log({data});
    await dispatch(registerFulfilled(data));
  } catch (error) {
    console.log('%c%s', 'color: red', '[ERROR] getInitData', error);
    dispatch(registerRejected());
  }
};
export const registerPending = () => ({
  type: PENDING,
});

export const registerFulfilled = data => ({
  type: FULFILLED,
  payload: data,
});

export const registerRejected = () => ({
  type: REJECTED,
});
export const addFriend = data => ({
  type: ADD_FRIEND,
  payload: data,
});
export default {
  getFriendList,
};
