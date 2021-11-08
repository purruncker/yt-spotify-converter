import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { YtComponent } from './yt/yt.component';

const routes: Routes = [
  { path: 'yt', component: YtComponent },
  { path: 'spotify', component: SpotifyComponent },
  { path: '', component: HomePageComponent},

  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotifyComponent, YtComponent, ErrorPageComponent]
