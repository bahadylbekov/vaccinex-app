import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, Genome, TezosAccount, Organization, Virus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://localhost:8000/private';

  constructor(private http: HttpClient) { }

  getMyUserID$(): Observable<any> {
    return this.http.get(this.baseURL + '/whoami');
  }

  // PROFILE SECTION METHODS

  getMyProfile$(): Observable<any> {
    return this.http.get(this.baseURL + '/profile');
  }

  createProfile$(data: Profile): Observable<any> {
    console.log('send new profile')
    console.log(data)
    return this.http.post(this.baseURL + '/profile', data);
  }

  // GENOME SECTION METHODS

  getMyGenomes$(): Observable<any> {
    return this.http.get(this.baseURL + '/genome');
  }

  createGenome$(data: Genome): Observable<any> {
    return this.http.post(this.baseURL + '/genomes', data);
  }

  getGenomes$(): Observable<any> {
    return this.http.get(this.baseURL + '/genomes');
  }

  getGenomesByVirus$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/genomes/' + id);
  }

  getGenomesByOrganization$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/organization-genome/' + id);
  }

  // TEZOS-ACCOUNT SECTION METHODS

  getMyTezosAccounts$(): Observable<any> {
    return this.http.get(this.baseURL + '/tezos/accounts');
  }

  createTezosAccount$(data: TezosAccount): Observable<any> {
    return this.http.post(this.baseURL + '/tezos/account', data);
  }

  // ORGANIZATIONS SECTION METHODS

  getOrganizations$(): Observable<any> {
    return this.http.get(this.baseURL + '/organizations');
  }

  getOrganizationByID$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/organizations/' + id);
  }

  createOrganization$(data: Organization): Observable<any> {
    return this.http.post(this.baseURL + '/organizations', data);
  }

  // VIRUS SECTION METHODS

  getViruses$(): Observable<any> {
    return this.http.get(this.baseURL + '/viruses');
  }

  createVirus$(data: Virus): Observable<any> {
    return this.http.post(this.baseURL + '/viruses', data);
  }

  getVirusByID$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/viruses/' + id);
  }

}