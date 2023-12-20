import { ActionReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es';
import { State } from './index';

function setSavedState(state: object, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string) {
  if (localStorage.getItem(localStorageKey) !== null) {
    return JSON.parse(localStorage.getItem(localStorageKey) ?? '');
  }
}

// the keys from state which we'd like to save.
const stateKeys = ['blogs', 'profile'];
// the key for the local storage.
const localStorageKey = '__app_storage__';

export function storageMetaReducer(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  let onInit = true; // after load/refresh…
  return function (state, action) {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);
    }
    // save the next state to the application storage.
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
