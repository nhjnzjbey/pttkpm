import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './user/upload/upload.component';
import { GoComponent } from './go/go.component';
import { LoginService } from './service/user/login.service';
import { AboutUsComponent } from './aboutus/aboutus.component';


// routes configuration

export const routes: Routes = [
    { path: 'go', component: GoComponent },
    { path: 'aboutus', component: AboutUsComponent},
    { path: 'user/upload', component: UploadComponent, canActivate: [LoginService] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

