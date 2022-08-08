import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { IMyPages } from 'src/app/my-shared/interfaces-shared/i-my-pages';
import { IMenu } from '../../../interfaces/i-menu';
import { IResponsePageableMenu } from '../../../interfaces/i-response-pageable-menu';
import { MenuCrudService } from '../../../services/menu-crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
  providers: [
    MenuCrudService
  ]
})
export class ListarComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome','descricao', 'dataCriacao', 'dataUltimaActualizacao', 'ativo', 'acoes'];
  dataSource: IMenu[] = [];

  erroMsg?: string;
  haErroMsg: boolean = false;
  requestCompleto = false;

  carregando: boolean = false;

  //PAGINAÇÃO
  mypages?: IMyPages;


  totalElements: number =0;
  sizeInicial: number =3;
  sort: string ="valor";
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
  constructor(private formBuilder: FormBuilder, private menuCrudService: MenuCrudService) { }

  ngOnInit(): void {
    this.readAll();
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

  readAll(){
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

    let myObservablePesquisa$: Observable<IResponsePageableMenu>;

    myObservablePesquisa$ = this.menuCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableMenu) => {
        console.log('Foi lido os seguintes dados, item: ', data._embedded.menus);
        this.dataSource = data._embedded.menus;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        this.carregando = false;
      },
      (      error: string | undefined) => {
        this.erroMsg = error;
        this.haErroMsg = true;
        console.error('ERROR: ', error);
      },
      () => { this.requestCompleto = true; }
    );
    
  }

}
