import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { YtComponent } from './yt/yt.component';

const routes: Routes = [
  { path: 'yt', component: YtComponent },
  { path: 'spotify', component: SpotifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotifyComponent, YtComponent]
