import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import _unescape from 'lodash/unescape';
import _findIndex from 'lodash/findIndex';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  // Get data from the json file
  getTeamsFromFile(): Observable<any> {
    const observable = Observable.create((o) => {
      this.http.get('assets/data.json').subscribe(
        (r) => {
          const teams = r['teams'];
          if (teams) {
            sessionStorage.setItem('teamsdata', JSON.stringify(teams));
            o.next(teams);
            o.complete();
          }
        },
        () => {
          o.next('Data not found');
          o.complete();
        }
      );
    });

    return observable;
  }

  // get data from session Storage, else get from physical json file
  getAllTeams(): Observable<any> {
    const observable = Observable.create((o) => {
      if (sessionStorage.getItem('teamsdata')) {
        o.next(JSON.parse(sessionStorage.getItem('teamsdata')));
        o.complete();
      } else {
        this.getTeamsFromFile().subscribe(
          (teams) => {
            o.next(teams);
            o.complete();
          },
          () => {
            o.next('Data not found');
            o.complete();
          }
        );
      }
    });

    return observable;
  }

  // get data for specific roster
  // Feature idea, handle observable if roster not found by wrong id
  getRoster(id) {
    const observable = Observable.create((o) => {
      this.getAllTeams().subscribe(
        (r) => {
          const ind = _findIndex(r, t => t.id === id);
          if (r[ind]) {
            const data = {
              data: r[ind],
              index: ind
            };
            o.next(data);
            o.complete();
          }
        },
        () => {
          o.next('Team not found');
          o.complete();
        }
      );
    });

    return observable;
  }

  // get data for specific player
  // Feature idea, handle observable if player not found by wrong id
  getPlayer(tid, name) {
    const observable = Observable.create((o) => {
      this.getRoster(tid).subscribe(
        (team) => {
          const roster = _get(team, 'data.roster', []);
          const ind = _findIndex(roster, p => _get(p, 'person.displayName') === _unescape(name));
          if (roster[ind]) {
            const data = {
              data: roster[ind],
              index: ind
            };
            o.next(data);
            o.complete();
          }
        },
        () => {
          o.next('Player not found');
          o.complete();
        }
      );
    });

    return observable;
  }


}
