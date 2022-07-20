import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { IReserva } from '../../../interfaces/i-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CriaralterarComponent } from '../criaralterar/criaralterar.component';
import { DetalheComponent } from '../detalhe/detalhe.component';
import { ApagarComponent } from '../apagar/apagar.component';

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

  filterObj = {};

  @ViewChild(MatSort) sort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
    
  constructor(public reservaCrudService: ReservaCrudService, private router: Router, private dialog : MatDialog) {

   }

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

          //nao esta a funcionar so verifica duas colunas do array e para. a tabela tambem deixa de funcionar
          /*this.resDataSource.filterPredicate = (data, filter) => {
            console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-----> " + filter);
            return this.displayedColumns.some(ele => {
              console.log("ELEM--->" + ele);
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          }*/
          
    });    
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter(this.searchKey, "");
  }

  applyFilter(filterValue: string, key: string){
    //this.resDataSource.filter = this.searchKey.trim().toLowerCase();
    console.log(key);
    this.filterObj = {
      value: filterValue.trim().toLowerCase(),
      key: key
    }
    this.resDataSource.filter = filterValue;
    if (this.resDataSource.paginator) {
        this.resDataSource.paginator.firstPage();
    }
  }

  /*navegarParaCriarAlterarReserva(){
    this.router.navigate(["./oa-admin/gestao/entidades/reserva/criar"])
    //console.log("criar");
  }*/

  openDialog() {
      const dialogRef = this.dialog.open(CriaralterarComponent, {
          width: '30%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  verDetalhesReserva(){
      const dialogRef = this.dialog.open(DetalheComponent, {
          width: '30%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  editarReserva(){
    
    const dialogRef = this.dialog.open(CriaralterarComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  apagarReserva(){
    
    const dialogRef = this.dialog.open(ApagarComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

}