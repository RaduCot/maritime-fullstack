import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MaritimeDataService } from './data.service';
import * as MaritimeActions from './maritime.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MaritimeEffects {
  private actions$ = inject(Actions);
  private maritimeDataService = inject(MaritimeDataService);

  loadPorts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.loadPorts),
      mergeMap(() =>
        this.maritimeDataService
          .getPorts()
          .pipe(map((ports) => MaritimeActions.loadPortsSuccess({ ports })))
      )
    )
  );

  loadShips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.loadShips),
      mergeMap(() =>
        this.maritimeDataService
          .getShips()
          .pipe(map((ships) => MaritimeActions.loadShipsSuccess({ ships })))
      )
    )
  );

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.loadCountries),
      mergeMap(() =>
        this.maritimeDataService
          .getCountries()
          .pipe(
            map((countries) =>
              MaritimeActions.loadCountriesSuccess({ countries })
            )
          )
      )
    )
  );

  loadVoyages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.loadVoyages),
      mergeMap(() =>
        this.maritimeDataService
          .getVoyages()
          .pipe(
            map((voyages) => MaritimeActions.loadVoyagesSuccess({ voyages }))
          )
      )
    )
  );

  // SHIP ACTIONS

  addShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.addShip),
      mergeMap(({ ship }) =>
        this.maritimeDataService.addShip(ship).pipe(
          map(() => MaritimeActions.loadShips()),
          catchError((error) => {
            console.error('Error adding ship:', error);
            return of();
          })
        )
      )
    )
  );

  editShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.editShip),
      mergeMap(({ id, changes }) =>
        this.maritimeDataService.editShip(id, changes).pipe(
          map(() => MaritimeActions.loadShips()),
          catchError((error) => {
            console.error('Error editing ship:', error);
            return of();
          })
        )
      )
    )
  );

  deleteShip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.deleteShip),
      mergeMap(({ id }) =>
        this.maritimeDataService.deleteShip(id).pipe(
          map(() => MaritimeActions.loadShips()), // Reload ships after deletion
          catchError((error) => {
            console.error('Error deleting ship:', error);
            return of();
          })
        )
      )
    )
  );

  // PORT ACTIONS

  addPort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.addPort),
      mergeMap(({ port }) =>
        this.maritimeDataService.addPort(port).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadPorts(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error adding port:', error);
            return of();
          })
        )
      )
    )
  );

  editPort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.editPort),
      mergeMap(({ id, changes }) =>
        this.maritimeDataService.editPort(id, changes).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadPorts(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error editing port:', error);
            return of();
          })
        )
      )
    )
  );

  deletePort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.deletePort),
      mergeMap(({ id }) =>
        this.maritimeDataService.deletePort(id).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadPorts(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error deleting port:', error);
            return of();
          })
        )
      )
    )
  );

  // VOYAGE ACTIONS

  addVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.addVoyage),
      mergeMap(({ voyage }) =>
        this.maritimeDataService.addVoyage(voyage).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadVoyages(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error adding voyage:', error);
            return of();
          })
        )
      )
    )
  );

  editVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.editVoyage),
      mergeMap(({ id, changes }) =>
        this.maritimeDataService.editVoyage(id, changes).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadVoyages(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error editing voyage:', error);
            return of();
          })
        )
      )
    )
  );

  deleteVoyage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MaritimeActions.deleteVoyage),
      mergeMap(({ id }) =>
        this.maritimeDataService.deleteVoyage(id).pipe(
          mergeMap(() =>
            of(MaritimeActions.loadVoyages(), MaritimeActions.loadCountries())
          ),
          catchError((error) => {
            console.error('Error deleting voyage:', error);
            return of();
          })
        )
      )
    )
  );
}
