import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Vaccine } from 'src/models';

export class VaccineTableDataSource extends DataSource<Vaccine> {

  constructor(public vaccines: Vaccine[],private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<Vaccine[]> {
    const dataMutations = [
      observableOf(this.vaccines),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.vaccines.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.vaccines]));
    }));
  }

  disconnect() {}

  private getPagedData(genomes: Vaccine[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return genomes.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(genomes: Vaccine[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return genomes;
    }

    return genomes.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'vaccine_name': return compare(a.vaccine_name, b.vaccine_name, isAsc);
        case 'virus_name': return compare(+a.virus_name, +b.virus_name, isAsc);
        case 'requested_amount': return compare(a.requested_amount, b.requested_amount, isAsc);
        case 'funded_amount': return compare(a.funded_amount, b.funded_amount, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}