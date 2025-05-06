import { createAction, props } from '@ngrx/store';
import { Port, Ship, VisitedCountry, Voyage } from './maritime.state';

export const loadPorts = createAction('[Maritime] Load Ports');
export const loadPortsSuccess = createAction(
  '[Maritime] Load Ports Success',
  props<{ ports: Port[] }>()
);

export const loadShips = createAction('[Maritime] Load Ships');
export const loadShipsSuccess = createAction(
  '[Maritime] Load Ships Success',
  props<{ ships: Ship[] }>()
);

export const loadCountries = createAction('[Maritime] Load Countries');
export const loadCountriesSuccess = createAction(
  '[Maritime] Load Countries Success',
  props<{ countries: VisitedCountry[] }>()
);

export const loadVoyages = createAction('[Maritime] Load Voyages');
export const loadVoyagesSuccess = createAction(
  '[Maritime] Load Voyages Success',
  props<{ voyages: Voyage[] }>()
);

// Ship Actions
export const addShip = createAction(
  '[Maritime] Add Ship',
  props<{ ship: Omit<Ship, 'id'> }>()
);
export const editShip = createAction(
  '[Maritime] Edit Ship',
  props<{ id: number; changes: Partial<Ship> }>()
);
export const deleteShip = createAction(
  '[Maritime] Delete Ship',
  props<{ id: number }>()
);

// Port Actions
export const addPort = createAction(
  '[Maritime] Add Port',
  props<{ port: Omit<Port, 'id'> }>()
);
export const editPort = createAction(
  '[Maritime] Edit Port',
  props<{ id: number; changes: Partial<Port> }>()
);
export const deletePort = createAction(
  '[Maritime] Delete Port',
  props<{ id: number }>()
);

// Voyage Actions
export const addVoyage = createAction(
  '[Maritime] Add Voyage',
  props<{ voyage: Omit<Voyage, 'id'> }>()
);
export const editVoyage = createAction(
  '[Maritime] Edit Voyage',
  props<{ id: number; changes: Partial<Voyage> }>()
);
export const deleteVoyage = createAction(
  '[Maritime] Delete Voyage',
  props<{ id: number }>()
);
