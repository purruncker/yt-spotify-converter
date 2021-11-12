import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { ErrorPageComponent } from './views/error/error-page.component';
import { HomePageComponent } from './views/home/home-page.component';
import { SpotifyComponent } from './views/spotify/spotify.component';
import { YtComponent } from './views/yt/yt.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'yt', component: YtComponent },
  { path: 'spotify', component: SpotifyComponent },
  { path: 'about', component: AboutComponent},
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SpotifyComponent, YtComponent, ErrorPageComponent,HomePageComponent]
