import { createReducer, on } from '@ngrx/store';
import { MaritimeState } from './maritime.state';
import * as MaritimeActions from './maritime.actions';

const initialState: MaritimeState = {
  ports: [],
  ships: [],
  visitedCountries: [],
  voyages: [],
  isLoading: false,
};

export const maritimeReducer = createReducer(
  initialState,
  on(MaritimeActions.loadPorts, (state) => ({ ...state, isLoading: true })),
  on(MaritimeActions.loadPortsSuccess, (state, { ports }) => ({
    ...state,
    ports,
    isLoading: false,
  })),
  on(MaritimeActions.loadShips, (state) => ({ ...state, isLoading: true })),
  on(MaritimeActions.loadShipsSuccess, (state, { ships }) => ({
    ...state,
    ships,
    isLoading: false,
  })),
  on(MaritimeActions.loadCountries, (state) => ({ ...state, isLoading: true })),
  on(MaritimeActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    visitedCountries: countries,
    isLoading: false,
  })),
  on(MaritimeActions.loadVoyages, (state) => ({ ...state, isLoading: true })),
  on(MaritimeActions.loadVoyagesSuccess, (state, { voyages }) => ({
    ...state,
    voyages,
    isLoading: false,
  }))
);
