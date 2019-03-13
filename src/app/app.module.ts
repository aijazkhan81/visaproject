import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerViewComponent } from './components/player-view/player-view.component';
import { TeamRosterComponent } from './components/team-roster/team-roster.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TeamViewComponent,
    TeamRosterComponent,
    PlayerViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
