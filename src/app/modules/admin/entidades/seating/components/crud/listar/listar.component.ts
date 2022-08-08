import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { IMyPages } from 'src/app/my-shared/interfaces-shared/i-my-pages';
import { IResponsePageableSeating } from '../../../interfaces/i-response-pageable-seating';
import { ISeating } from '../../../interfaces/i-seating';
import { SeatingCrudService } from '../../../services/seating-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [
    SeatingCrudService
  ]
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'horaInicio','horaFim', 'completo', 'ativo','dataCriacao', 'dataUltimaActualizacao','acoes'];
  dataSource: ISeating[] = [];

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: IMyPages;


  totalElements: number =0;
  sizeInicial: number =3;
  sort: string ="horaInicio";
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

  constructor(private formBuilder: FormBuilder, private seatingCrudService: SeatingCrudService) { }

  ngOnInit(): void {
    this.readAll();
  }
  readAll() {
    console.log("No read all ....");
    //PAGINAÇÃO
    this.carregando = true;
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    console.log('--> ' + pageIndex);
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    console.log('--> ' + pageSize);

    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "valor";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableSeating>;

    myObservablePesquisa$ = this.seatingCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableSeating) => {
        console.log('Foi lido os seguintes dados, item: ', data._embedded.seatings);
        this.dataSource = data._embedded.seatings;
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

  //ONSUBMIT
  onSubmit() {
    this.submitted = true;
    this.readAll();
  }

  limparPesquisa() {
    this.submitted = false;
    this.formPesquisa.reset();
  }

}
