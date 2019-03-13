import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import _get from 'lodash/get';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  teams = [];

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._dataService.getAllTeams().subscribe(
      (r) => {
        this.teams = r;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  navigateTeam(t) {
    const rosterRoute = _get(this._activeRoute, 'snapshot.data.rosterRoute');
    if (rosterRoute) {
      this._router.navigate(
        [rosterRoute],
        {
          queryParams: {
            id: t.id
          }
        }
      );
    }
  }

}
