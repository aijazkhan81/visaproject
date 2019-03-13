import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import { DataService } from './../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit {
  teamId = _get(this._activeRoute, 'snapshot.queryParams.id', '');
  team: any = {};
  roster = [];

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    if (this.teamId) {
      this._dataService.getRoster(this.teamId).subscribe(
        (r) => {
          this.team = r.data;
          this.roster = _sortBy(this.team.roster, ['position', 'depthOrder']);
        },
        (e) => {
          this.createNotification('error', e);
          // feature possibility, reroute back to teams page
        }
      );
    } else {
      this.createNotification('error', 'Team not found');
    }
  }


  navigatePlayer(p) {
    const playerRoute = _get(this._activeRoute, 'snapshot.data.playerRoute');
    if (playerRoute) {
      this._router.navigate(
        [playerRoute],
        {
          queryParams: {
            teamId: this.team.id,
            playerName: p.person.displayName
          }
        }
      );
    }
  }

  navigateBack() {
    const teamRoute = _get(this._activeRoute, 'snapshot.data.teamRoute');
    if (teamRoute) {
      this._router.navigate(
        [teamRoute]
      );
    }
  }

  createNotification(type: string, title: string, desc?): void {
    this.notification.create(type, title, desc);
  }

}
