import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Time } from '@angular/common';

export interface GenomeTableItem {
    genome_id: number;
    genome_name: string;
    organization_name: string;
    file_url: string;
    virus_name: string;
    simularity_rate: string;
    origin: string;
    status: string;
    is_active         :boolean 
    is_sold           :boolean
    created_by        :string
    created_at        :Time
  }
  

// TODO: replace this with real data from your application
const EXAMPLE_DATA: GenomeTableItem[] = [];

export class GenomeTableDataSource extends DataSource<GenomeTableItem> {

  constructor(private genomes: GenomeTableItem[],private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  connect(): Observable<GenomeTableItem[]> {
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

  private getPagedData(data: GenomeTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: GenomeTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'genome_name': return compare(a.genome_name, b.genome_name, isAsc);
        case 'organization_name': return compare(+a.organization_name, +b.organization_name, isAsc);
        case 'virus_name': return compare(a.virus_name, b.virus_name, isAsc);
        case 'simularity_rate': return compare(a.simularity_rate, b.simularity_rate, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}