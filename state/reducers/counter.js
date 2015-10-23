import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/siteActions';

export default function counter(state, action) {
  if (state === undefined) state = 0;
  switch (action.type) {
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}
