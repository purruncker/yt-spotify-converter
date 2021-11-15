import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

// TODO: Create about page with listed technologies etc... (especially CockroachDB)

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
