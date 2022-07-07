import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { IReserva } from '../../../interfaces/i-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [ReservaCrudService]
})


export class ListarComponent implements OnInit {

  page = 0;
  size = 12;
  sort_item = 'dataReserva';
  ordem = 'desc';

  resultado: any = [];
  reservas! : IReserva[];
  resDataSource = new MatTableDataSource<any>();  
  displayedColumns: string[] = ['dataReserva', 'restaurante', 'seating', 'nomeCliente', 'apelidoCliente', 'tipoCliente', 'ativo', 'estado', 'actions'];
  searchKey = "";

  @ViewChild(MatSort) sort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
    
  constructor(public reservaCrudService: ReservaCrudService) { }

  ngOnInit(): void { 
    this.carregarReservas();
  }
  
  carregarReservas() {
    return this.reservaCrudService.findAll(this.page,this.size, this.sort_item, this.ordem).subscribe((data: {}) => {
          
          this.resultado = data;
          this.reservas = this.resultado._embedded.reservas;     
          
          this.reservas.forEach( (elem) =>{
            return this.reservaCrudService.getDataByURL(elem._links.cliente.href).subscribe((cli: {}) => {
              let cliente = JSON.stringify(cli);

              elem.nome = JSON.parse(cliente).nome;
              elem.apelido = JSON.parse(cliente).apelido;
              elem.tipo = JSON.parse(cliente).tipo;

              return this.reservaCrudService.getDataByURL(elem._links.restauranteSeating.href).subscribe((rst: {}) => {
                let resSeat = JSON.stringify(rst);
                
                return this.reservaCrudService.getDataByURL(JSON.parse(resSeat)._links.restaurante.href).subscribe((rest: {}) => {
                  let restaur = JSON.stringify(rest);
                  elem.nomesRest = JSON.parse(restaur).nome;

                return this.reservaCrudService.getDataByURL(JSON.parse(resSeat)._links.seating.href).subscribe((seat: {}) => {
                  let seating = JSON.stringify(seat);
                  elem.dataInitSeat = JSON.parse(seating).horaInicio;
                });

                });
                
              });
              
            });

          });

          this.resDataSource =  new MatTableDataSource(this.reservas);
          this.resDataSource.sort = this.sort;
          this.resDataSource.paginator = this.paginator;          
    });    
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.resDataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

}


