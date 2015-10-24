export const GOTO_PAGE      = 'GOTO_PAGE';
export const SET_SITE_STATE = 'SET_SITE_STATE';
export const SET_CARDS_STATE = 'SET_CARDS_STATE';

export function setSiteState (state) {
  return {
    type: SET_SITE_STATE,
    state
  };
}

export function setCardsState (state) {
  return {
    type: SET_CARDS_STATE,
    state
  };
}
export function gotoPage(pageId) {
  return {
    type: GOTO_PAGE,
    pageId
  };
}

