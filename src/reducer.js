import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote (state, entry) {
  console.log("Wha thuh fuck?");
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state,action.entry);
  }
  return state;
}

