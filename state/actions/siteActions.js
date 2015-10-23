export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const GOTO_PAGE      = 'GOTO_PAGE';
export const SET_SITE_STATE = 'SET_SITE_STATE';

export function setSiteState (state) {
  return {
    type: SET_SITE_STATE,
    state
  };
}

export function gotoPage(pageId) {
  return {
    type: GOTO_PAGE,
    pageId
  };
}

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

