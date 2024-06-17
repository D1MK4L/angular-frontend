import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { RestrictedContentComponent } from './components/restricted-content/restricted-content.component';
import { LoadingComponentComponent } from './components/loading-component/loading-component.component';
import { BuggyToolsComponent } from './components/buggy-tools/buggy-tools.component';
import { CrudLoginComponent } from './components/crud-login/crud-login.component';
import { CrudPanelComponent } from './components/crud-panel/crud-panel.component';
import { CrudReadComponent } from './components/crud-read/crud-read.component';
import { CrudCreateComponent } from './components/crud-create/crud-create.component';
import { CrudDeleteComponent } from './components/crud-delete/crud-delete.component';
import { CrudUpdateComponent } from './components/crud-update/crud-update.component';

export const routes: Routes = [    
    { path: 'user-registration-example', component: UserRegistrationComponent},
    { path: 'restricted-content-example', component: RestrictedContentComponent, 
    canActivate: [authGuard],
    },
    {path: 'buggy-tools', component: BuggyToolsComponent },
    {path: 'crud-login', component: CrudLoginComponent},
    {path: 'crud-panel', component: CrudPanelComponent },
    {path: 'crud-read', component: CrudReadComponent},
    {path: 'crud-create', component: CrudCreateComponent},
    {path: 'crud-delete', component: CrudDeleteComponent},
    {path: 'crud-update', component: CrudUpdateComponent},
    {path: 'loading-component', component: LoadingComponentComponent},   
    {path: 'login', component: UserLoginComponent},
    {path: '', component: WelcomeComponent},  
];
