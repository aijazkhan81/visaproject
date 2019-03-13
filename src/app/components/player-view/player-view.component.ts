import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import { DataService } from './../../services/data.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  playerName = _get(this._activeRoute, 'snapshot.queryParams.playerName', '');
  teamId = _get(this._activeRoute, 'snapshot.queryParams.teamId', '');

  player: any = {};
  playerCopy: any = {};
  visible = false;
  index: number;

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    if (this.teamId && this.playerName) {
      this._dataService.getPlayer(this.teamId, this.playerName).subscribe(
        (r) => {
          this.player = r.data;
          this.index = r.index;
          this.clonePlayer();
        },
        (e) => {
          this.createNotification('error', e);
          // feature possibility, reroute back to roster page
        }
      );
    }
    if (!this.teamId) {
      this.createNotification('error', `Team ID not found`);
    }
    if (!this.playerName) {
      this.createNotification('error', `Player name not found`);
    }
  }

  clonePlayer() {
    this.playerCopy = _cloneDeep(this.player);
  }

  cancel(): void {
    this.close();
    this.clonePlayer();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submit() {
    const teamsData = JSON.parse(sessionStorage.getItem('teamsdata'));
    const teamIndex = _findIndex(teamsData, t => t.id === this.teamId);
    teamsData[teamIndex]['roster'][this.index] = this.playerCopy;
    this.player = _cloneDeep(this.playerCopy);
    sessionStorage.setItem('teamsdata', JSON.stringify(teamsData));
    // set it back in session storage after editing
    this.close();
  }

  navigateBack() {
    const rosterRoute = _get(this._activeRoute, 'snapshot.data.rosterRoute');
    if (rosterRoute) {
      this._router.navigate(
        [rosterRoute],
        {
          queryParams: {
            id: this.teamId
          }
        }
      );
    }
  }

  createNotification(type: string, title: string, desc?): void {
    this.notification.create(type, title, desc);
  }

}
