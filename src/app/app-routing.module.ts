import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerViewComponent } from './components/player-view/player-view.component';
import { TeamRosterComponent } from './components/team-roster/team-roster.component';
import { TeamViewComponent } from './components/team-view/team-view.component';

const routesData = {
  teamRoute: '/team',
  playerRoute: '/player',
  rosterRoute: '/roster'
};

const routes: Routes = [
  {
    path: '',
    component: TeamViewComponent,
    pathMatch: 'full',
    data: {
      ...routesData
    }
  },
  {
    path: 'team',
    component: TeamViewComponent,
    data: {
      ...routesData
    }
  },
  {
    path: 'roster',
    component: TeamRosterComponent,
    data: {
      ...routesData
    }
  },
  {
    path: 'player',
    component: PlayerViewComponent,
    data: {
      ...routesData
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
