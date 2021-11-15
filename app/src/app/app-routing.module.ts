import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ErrorPageComponent } from './views/error/error-page.component';
import { HomePageComponent } from './views/home/home-page.component';
import { SpotifyComponent } from './views/convert-flow/spotify-auth/spotify.component';
import { YtComponent } from './views/convert-flow/yt-auth/yt.component';
import { FlowListComponent } from './views/convert-flow/flow-list/flow-list.component';
import { UserCanActivateFlowRoute } from './guards/canActivate.guard';
import { AuthHandlerComponent } from './views/convert-flow/auth-handler/auth-handler.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, children: [
    { path: "", component: FlowListComponent },
    { path: "authorize/:platform", component: AuthHandlerComponent },
    { path: 'yt', component: YtComponent },
    { path: 'spotify', component: SpotifyComponent },
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
export const routingComponents = [SpotifyComponent, YtComponent, ErrorPageComponent,HomePageComponent, FlowListComponent]
