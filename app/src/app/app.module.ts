import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule, CookieService } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routingComponents } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './views/about/about.component';
import { AlertModalComponent } from './views/alert-modal/alert-modal.component';
import { FlowItemComponent } from './components/flow/flow-item/flow-item.component';
import { FlowSelectComponent } from './components/flow/flow-select/flow-select.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { interceptorProvider } from './interceptors/interceptors';
import { AuthHandlerComponent } from './views/convert-flow/auth-handler/auth-handler.component';
import { ProfileBarComponent } from './components/profile-bar/profile-bar.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { ChoosePlaylistComponent } from './views/convert-flow/choose-playlist/choose-playlist.component';
import { ChooseSongsComponent } from './views/convert-flow/choose-songs/choose-songs.component';
import { SongItemComponent } from './components/song-item/song-item.component';
import { ArtistsToStringPipe } from './pipes/artists.pipe';
import { CreatePlaylistComponent } from './views/convert-flow/create-playlist/create-playlist.component';
import { FillPlaylistComponent } from './views/convert-flow/fill-playlist/fill-playlist.component';
import { FlowButtonComponent } from './components/flow/flow-button/flow-button.component';

// Lottie animations library
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// TODO: Create about page with listed technologies etc... (especially CockroachDB)

export function usePlayerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    AboutComponent,
    AlertModalComponent,
    FlowItemComponent,
    FlowSelectComponent,
    LoadingBarComponent,
    AuthHandlerComponent,
    ProfileBarComponent,
    PlaylistItemComponent,
    SongItemComponent,
    ChoosePlaylistComponent,
    ChooseSongsComponent,
    ArtistsToStringPipe,
    CreatePlaylistComponent,
    FillPlaylistComponent,
    FlowButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    LottieModule.forRoot({ player: usePlayerFactory })
  ],
  providers: [interceptorProvider, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
