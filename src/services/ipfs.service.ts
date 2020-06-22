import { Injectable } from '@angular/core';
import * as IPFS from 'ipfs-mini' 
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  constructor(
    private http: HttpClient,
  ) { }

  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  public async UploadData(data: string): Promise<any> {
    await this.ipfs.add(data)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  public async GetData(path: string): Promise<any> {
    await this.ipfs.cat(path, (err, result) => {
      console.log(err, result);
      return result
    });
  }
}
