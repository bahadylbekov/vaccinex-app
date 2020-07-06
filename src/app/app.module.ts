import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent, CreateProfileModalComponent } from './profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { GenomeTableComponent } from './genome-table/genome-table.component';
import { ResearchersListComponent } from './researchers-list/researchers-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { VirusComponent } from './virus/virus.component';
import { VirusesComponent } from './viruses/viruses.component';
import { GenomesComponent } from './genomes/genomes.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { NewGenomeComponent, NewGenomeModalComponent } from './new-genome/new-genome.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NewVirusComponent, NewVirusModalComponent } from './new-virus/new-virus.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VaccinesComponent } from './vaccines/vaccines.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { VaccineTableComponent } from './vaccine-table/vaccine-table.component';
import { NewVaccineComponent, NewVaccineModalComponent } from './new-vaccine/new-vaccine.component';
import { NewNucypherAccountComponent, NewNucypherAccountModalComponent } from './new-nucypher-account/new-nucypher-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    CreateProfileModalComponent,
    GenomeTableComponent,
    ResearchersListComponent,
    GenomeTableComponent,
    VirusComponent,
    VirusesComponent,
    GenomesComponent,
    OrganizationsComponent,
    OrganizationComponent,
    NewGenomeComponent,
    NewGenomeModalComponent,
    NewVirusComponent,
    NewVirusModalComponent,
    VaccinesComponent,
    VaccineComponent,
    VaccineTableComponent,
    NewVaccineComponent,
    NewVaccineModalComponent,
    NewNucypherAccountComponent,
    NewNucypherAccountModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
    ],
    exports: [

    ],
  providers: [],
  entryComponents: [
    NewGenomeModalComponent,
    NewVirusModalComponent,
    NewVaccineModalComponent,
    CreateProfileModalComponent,
    NewNucypherAccountModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
