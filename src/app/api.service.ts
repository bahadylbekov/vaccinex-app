import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile, Genome, Virus, Vaccine, NucypherAccount, EthereumAccount, Policy, Receipt, NucypherCharacter, NucypherUsername, Grant, DecryptionRequest, EncryptionRequest, RequestedGrant } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://localhost:8000/private';
  nucypherServiceUri = 'http://localhost:5000'

  constructor(private http: HttpClient) { }

  getMyUserID$(): Observable<any> {
    return this.http.get(this.baseURL + '/whoami');
  }

  // PROFILE SECTION METHODS

  getMyProfile$(): Observable<any> {
    return this.http.get(this.baseURL + '/profile');
  }

  createProfile$(data: Profile): Observable<any> {
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
    return this.http.get(this.baseURL + '/genomes/virus/' + id);
  }

  getGenomesByOrganization$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/genomes/organization/' + id);
  }

  getGenomesByVaccine$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/genomes/vaccines/' + id);
  }

  // NUCYPHER-ACCOUNTS SECTION METHODS

  getMyNucypherAccounts$(): Observable<any> {
    return this.http.get(this.baseURL + '/accounts/nucypher');
  }

  getOrganizationNucypherAccounts$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/organization/accounts/nucypher/' + id);
  }

  createNucypherAccount$(data: NucypherAccount): Observable<any> {
    return this.http.post(this.baseURL + '/accounts/nucypher', data);
  }

  // ETHEREUM-ACCOUNTS SECTION METHODS

  getMyEthereumAccounts$(): Observable<any> {
    return this.http.get(this.baseURL + '/accounts/ethereum');
  }

  getOrganizationEthereumAccounts$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/organization/accounts/ethereum/' + id);
  }

  createEthereumAccount$(data: EthereumAccount): Observable<any> {
    return this.http.post(this.baseURL + '/accounts/ethereum', data);
  }  

  // ORGANIZATIONS SECTION METHODS

  getOrganizations$(): Observable<any> {
    return this.http.get(this.baseURL + '/organizations');
  }

  getOrganizationByID$(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/organizations/' + id);
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

  // VACCINES SECTION METHODS

  getVaccines$(): Observable<any> {
    return this.http.get(this.baseURL +  '/vaccines');
  }

  getVaccineByVirus$(id: string): Observable<any> {
    return this.http.get(this.baseURL +  '/vaccines/' + id);
  }

  createVaccine$(data: Vaccine): Observable<any> {
    return this.http.post(this.baseURL + '/vaccines', data);
  }

  // NUCYPHER POLICIES SECTION METHODS

  getPolicyByID$(id: number): Observable<any> {
    return this.http.get(this.baseURL +  '/policies/' + id);
  }

  createPolicy$(data: Policy): Observable<any> {
    return this.http.post(this.baseURL + '/policies', data);
  }  

  // NUCYPHER RECEIPTS SECTION METHODS

  getReceiptByID$(id: number): Observable<any> {
    return this.http.get(this.baseURL +  '/receipts/' + id);
  }

  createReceipt$(data: Receipt): Observable<any> {
    return this.http.post(this.baseURL + '/receipts', data);
  }    

  // NUCYPHER SERVICE SECTION METHODS

  createNucypherAlice$(data: NucypherCharacter): Observable<any> {
    return this.http.post(this.nucypherServiceUri + '/user', data)
  }

  revealPublicKeys$(data: NucypherUsername): Observable<any> {
    return this.http.post(this.nucypherServiceUri + '/public_keys', data)
  }

  grantAccess$(data: Grant): Observable<any> {
    return this.http.post(this.nucypherServiceUri + '/grant', data)
  }

  decryptData$(data: DecryptionRequest): Observable<any> {
    return this.http.post(this.nucypherServiceUri + '/decrypt', data)
  }

  uploadAndEncryptData$(data: any): Observable<any> {
    return this.http.post(this.nucypherServiceUri + '/encrypt', data)
  }


  // GRANTS HANDLERS SECTION METHODS

  createRequestedGrant$(data: RequestedGrant): Observable<any> {
    return this.http.post(this.baseURL + '/grants', data)
  }

  submitRequestedGrant$(data: any): Observable<any> {
    return this.http.put(this.baseURL + '/grants', data)
  }

  getRequestedGrants$(alice_nucypher_address: string): Observable<any> {
    return this.http.get(this.baseURL + '/grants/' + alice_nucypher_address)
  }

  getCompletedGrants$(): Observable<any> {
    return this.http.get(this.baseURL + '/completed/grants')
  }

}