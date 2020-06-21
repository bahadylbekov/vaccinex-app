import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { VirusComponent } from './virus/virus.component';
import { VirusesComponent } from './viruses/viruses.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { GenomesComponent } from './genomes/genomes.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'virus',
    component: VirusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'viruses',
    component: VirusesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organization',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
