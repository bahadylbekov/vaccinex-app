import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { VirusComponent } from './virus/virus.component';
import { VirusesComponent } from './viruses/viruses.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { GenomesComponent } from './genomes/genomes.component';
import { InterceptorService } from './interceptor.service';
import { VaccineComponent } from './vaccine/vaccine.component';
import { VaccinesComponent } from './vaccines/vaccines.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viruses/:id',
    component: VirusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viruses',
    component: VirusesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organizations/:id',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'genomes',
    component: GenomesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vaccines/:id',
    component: VaccineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vaccines',
    component: VaccinesComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
