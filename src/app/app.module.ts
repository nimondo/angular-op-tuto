import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { MonPremierComponentComponent } from './mon-premier-component/mon-premier-component.component';
import { RouterModule,Routes,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService} from './auth-guard.service';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes: Routes = [
  { path: 'appareils', canActivate: [AuthGuardService], component: AppareilViewComponent },
  { path: 'appareils/:id', canActivate: [AuthGuardService], component: SingleAppareilComponent },
  { path: 'edit', canActivate: [AuthGuardService], component: EditAppareilComponent },
  { path: 'users', component: UserListComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AppareilViewComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];
@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
	AppareilViewComponent,
	AuthComponent,
    MonPremierComponentComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
