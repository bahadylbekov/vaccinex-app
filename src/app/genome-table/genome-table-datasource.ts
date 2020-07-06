import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Time } from '@angular/common';
import { Genome } from 'src/models';
  
export class GenomeTableDataSource extends DataSource<Genome> {

  constructor(public genomes: Genome[],private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<Genome[]> {
    const dataMutations = [
      observableOf(this.genomes),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.genomes.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.genomes]));
    }));
  }

  disconnect() {}

  private getPagedData(genomes: Genome[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return genomes.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(genomes: Genome[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return genomes;
    }

    return genomes.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'genome_name': return compare(a.genome_name, b.genome_name, isAsc);
        case 'organization_name': return compare(+a.organization_name, +b.organization_name, isAsc);
        case 'virus_name': return compare(a.virus_name, b.virus_name, isAsc);
        case 'vaccine_name': return compare(a.vaccine_name, b.vaccine_name, isAsc);
        case 'simularity_rate': return compare(a.simularity_rate, b.simularity_rate, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}