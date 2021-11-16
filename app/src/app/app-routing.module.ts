import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ErrorPageComponent } from './views/error/error-page.component';
import { HomePageComponent } from './views/home/home-page.component';
import { YtComponent } from './views/convert-flow/yt-auth/yt.component';
import { FlowListComponent } from './views/convert-flow/flow-list/flow-list.component';
import { UserCanActivateFlowRoute } from './guards/canActivate.guard';
import { AuthHandlerComponent } from './views/convert-flow/auth-handler/auth-handler.component';
import { ChoosePlaylistComponent } from './views/convert-flow/choose-playlist/choose-playlist.component';
import { ChooseSongsComponent } from './views/convert-flow/choose-songs/choose-songs.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, children: [
    { path: "", component: FlowListComponent },
    { path: "authorize/:platform", component: AuthHandlerComponent },
    { path: "choose-playlist", component: ChoosePlaylistComponent },
    { path: "choose-songs", component: ChooseSongsComponent },
    { path: 'yt', component: YtComponent },
  ], canActivateChild: [ UserCanActivateFlowRoute ]},
  { path: 'about', component: AboutComponent},
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ UserCanActivateFlowRoute ]
})
export class AppRoutingModule { }
export const routingComponents = [YtComponent, ErrorPageComponent,HomePageComponent, FlowListComponent, ChoosePlaylistComponent, ChooseSongsComponent]
