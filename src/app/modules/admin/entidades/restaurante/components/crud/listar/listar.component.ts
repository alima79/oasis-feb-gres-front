import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { IMyPages } from 'src/app/my-shared/interfaces-shared/i-my-pages';
import { IResponsePageableRestaurante } from '../../../interfaces/i-response-pageable-restaurante';
import { IRestaurante } from '../../../interfaces/i-restaurante';
import { RestauranteCrudService } from '../../../services/restaurante-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [
    RestauranteCrudService
  ]
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome','lotacaoMaxima', 'dataCriacao', 'dataUltimaActualizacao', 'ativo', 'acoes'];
  dataSource: IRestaurante[] = [];

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: IMyPages;


  totalElements: number =0;
  sizeInicial: number =3;
  sort: string ="id";
  direccaoOrdem: string ="asc";

  pageSizeOptions: number[] = [1, 2, 5, 10];

  //PAGE_EVENT
  pageEvent?: PageEvent;

  //SORT_EVENT
  sortEvent?: Sort;
  

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  //-----FORM PESQUISA
  submitted = false;

  //CRIAR FORMULARIO
  formPesquisa: FormGroup = this.formBuilder.group({
    nome: [null],
    activo: [true]
  });
  
  constructor(private formBuilder: FormBuilder, private restauranteCrudService: RestauranteCrudService) { }

  ngOnInit(): void {
    this.readAll();
  }

  

  //ONSUBMIT
  onSubmit() {
    this.submitted = true;
    this.readAll();
  }
  readAll() {
    //PAGINAÇÃO
    this.carregando = true;
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
     let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableRestaurante>;

    myObservablePesquisa$ = this.restauranteCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableRestaurante) => {
        this.dataSource = data._embedded.restaurantes;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        this.carregando = false;
      },
      error => {
        this.erroMsg = error;
        this.haErroMsg = true;
        console.error('ERROR: ', error);
      },
      () => { this.requestCompleto = true; }
    );
    
  }

  limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
  }

}
