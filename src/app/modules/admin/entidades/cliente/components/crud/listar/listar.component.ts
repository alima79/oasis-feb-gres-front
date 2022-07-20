import { ChangeDetectorRef, Component} from '@angular/core';
import { ICliente } from '../../../interfaces/i-cliente';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ViewChild, AfterViewInit} from '@angular/core';
import { catchError, map, merge } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements AfterViewInit {

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  displayedColumns: string[] = ['id', 'tipo', 'nome', 'apelido', 'email', 'telefone', 'ativo', 'actions'];
  clientes!: ICliente[];
  
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild(MatSort) sort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  
  constructor() {}

  ngAfterViewInit() {
            
  }

  /*ngOnInit(): void {
  }*/

  verDetalhesReserva(){

  }

  editarReserva(){

  }

  apagarReserva(){

  }

}

