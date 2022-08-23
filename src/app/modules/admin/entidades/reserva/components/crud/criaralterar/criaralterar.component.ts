import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMyPages } from 'src/app/my-shared/interfaces-shared/i-my-pages';
import { IEstado } from '../../../../estado/interfaces/i-estado';
import { IResponsePageableEstado } from '../../../../estado/interfaces/i-response-pageable-estado';
import { EstadoCrudService } from '../../../../estado/services/estado-crud.service';
import { IExtras } from '../../../../extras/interfaces/i-extras';
import { IResponsePageableExtras } from '../../../../extras/interfaces/i-response-pageable-extras';
import { ExtrasCrudService } from '../../../../extras/services/extras-crud.service';
import { IMenu } from '../../../../menu/interfaces/i-menu';
import { MenuCrudService } from '../../../../menu/services/menu-crud.service';
import { IPagamento } from '../../../../pagamento/interfaces/i-pagamento';
import { IResponsePageablePagamento } from '../../../../pagamento/interfaces/i-response-pageable-pagamento';
import { PagamentoCrudService } from '../../../../pagamento/services/pagamento-crud.service';
import { IResponsePageableRestaurante } from '../../../../restaurante/interfaces/i-response-pageable-restaurante';
import { IRestaurante } from '../../../../restaurante/interfaces/i-restaurante';
import { RestauranteCrudService } from '../../../../restaurante/services/restaurante-crud.service';
import { IResponsePageableSeating } from '../../../../seating/interfaces/i-response-pageable-seating';
import { ISeating } from '../../../../seating/interfaces/i-seating';
import { SeatingCrudService } from '../../../../seating/services/seating-crud.service';
import { IReqReserva } from '../../../interfaces/i-req-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    ReservaCrudService,
    RestauranteCrudService,
    SeatingCrudService,
    ExtrasCrudService,
    PagamentoCrudService,
    EstadoCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  cliente = 12;
  idUtilizador = 0;
  formCriarAlterarReserva !: FormGroup;
  acao = 'criar';
  tipoCliente = '';
  requestCompleto= false;
  erroMsg?: string;
  hasErroMsg: boolean = false;
  extraFormControl = new FormControl('');
  //listaExtras: string[] = ["Extra 1", "Extra 2", "Extra 3", "Extra 4", "Extra 5"];
  mypages?: IMyPages;
  //PAGE_EVENT
  pageEvent?: PageEvent;
  //SORT_EVENT
  sortEvent?: Sort;
  sizeInicial: number =30;
  sort: string ="id";
  direccaoOrdem: string ="asc";

  dataSourceRestaurante: IRestaurante[] = [];
  dataSourceSeating: ISeating[] = [];
  dataSourceEstados!: IEstado[];
  dataSourceExtras!: IExtras[];
  dataSourcePagamentos!: IPagamento[];

  totalElements: number =0;




  constructor(private formBuilder: FormBuilder,
              private reservaCrudService: ReservaCrudService,
              private restauranteCrudService: RestauranteCrudService,
              private seatingCrudService: SeatingCrudService,
              private extrasCrudService: ExtrasCrudService,
              private pagamentoCrudService: PagamentoCrudService,
              private estadoCrudService: EstadoCrudService,
              private route: ActivatedRoute,
              private router: Router,
              public dialogRef: MatDialogRef<ListarComponent>) { }

  ngOnInit(): void {

    
    this.setCurrentUser();
    console.log("UTILIZADOR -----> " + this.idUtilizador);

    this.carregarRestaurantes();
    console.log('RESTAURANTES----->' + JSON.stringify(this.dataSourceRestaurante));

    this.carregarSeatings();
    console.log('SEATINGS----->' + JSON.stringify(this.dataSourceSeating));

    this.carregarExtras();
    console.log('EXTRAS----->' + JSON.stringify(this.dataSourceExtras));

    this.carregarEstados();
    console.log('ESTADOS----->' + JSON.stringify(this.dataSourceEstados));

    this.carregarPagamentos();
    console.log('Pagamentos----->' + JSON.stringify(this.dataSourcePagamentos));


    this.preencherFormulario();
  }
  setCurrentUser(){
    console.log("Atribui o ID Utilizador ligado no Sistema para fazer Reservas!!!!");
    this.idUtilizador = 1;   
  }

  preencherFormulario() {
    console.log("PREENCHER fORMULARIO");
    //LER DADOS URL: SABER ID e ACCAO
    this.route.params.subscribe((params: any) =>{
      console.log(params);
      const id = params['id'];
      if(id){
        this.preencherFormularioUpdate(id);
      }else{
        this.preencherFormularioCreate();
      }
    });
  }

  //CARREGAR FORM COM DADOS DE OBJECTO
  preencherFormularioUpdate(id: number): void {
    console.log('Preencher Formulario para Update Reserva com ID:  ' + id);
  }


  //INCIALIZAR FORM COM DADOS PARA CRIAR
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormReserva();
   }


  incializarFormReserva() {
    this.formCriarAlterarReserva = this.formBuilder.group({

      restaurante : ['', Validators.required],
      seating : ['', Validators.required],
      dataReserva : ['', Validators.required],
      estado : ['', Validators.required],
      ativo : ['', Validators.required],

      //cliente related
      tipoCliente : ['', Validators.required],
      nomeCliente : ['', Validators.required],
      apelidoCliente : ['', Validators.required],
      email : ['', Validators.required],
      telefone : ['', Validators.required],


      // hospede
      numeroQuarto : ['', Validators.required],
      nacionalidade : ['', Validators.required],

      //prticular
      observacaoPartb : ['', Validators.required],

      // grupo
      instituicao : ['', Validators.required],
      observacaoGrupo : ['', Validators.required],
      descricaoGrupo : ['', Validators.required],

      numeroAdultos : ['', Validators.required],
      numeroCrianca : ['', Validators.required],
      observacoes : ['',Validators.required],
      comentarios : ['', Validators.required],


      pagamento : ['', Validators.required],

      extras : ['', Validators.required],

      user : ['', Validators.required],

  });
  }


  carregarPagamentos(): void {
    console.log('CARREGAR LISTA DE PAGAMENTOS');
    
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageablePagamento>;

    myObservablePesquisa$ = this.pagamentoCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageablePagamento) => {
        this.dataSourcePagamentos = data._embedded.pagamentos;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        console.log("Numero de Pagamentos lidos: " + this.totalElements);
      },
      error => {
        this.erroMsg = error;
        this.hasErroMsg = true;
        console.error('ERROR: ', error);
        this.dataSourcePagamentos = [];
      },
      () => { this.requestCompleto = true; }
    );    
  }



  carregarEstados() {
    console.log('CARREGAR LISTA DE ESTADOS');
    
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableEstado>;

    myObservablePesquisa$ = this.estadoCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableEstado) => {
        this.dataSourceEstados = data._embedded.estados;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        console.log("Numero de Estados lidos: " + this.totalElements);
      },
      error => {
        this.erroMsg = error;
        this.hasErroMsg = true;
        console.error('ERROR: ', error);
        this.dataSourceEstados = [];
      },
      () => { this.requestCompleto = true; }
    );
  }




  carregarExtras(): void {
    console.log('CARREGAR LISTA DE EXTRAS');
    
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableExtras>;

    myObservablePesquisa$ = this.extrasCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableExtras) => {
        this.dataSourceExtras = data._embedded.extras;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        console.log("Numero de EXTRAS lidos: " + this.totalElements);
      },
      error => {
        this.erroMsg = error;
        this.hasErroMsg = true;
        console.error('ERROR: ', error);
        this.dataSourceExtras = [];
      },
      () => { this.requestCompleto = true; }
    );    
  }

  carregarSeatings(): void {
    console.log('CARREGAR LISTA DE SEATINGS');
    
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableSeating>;

    myObservablePesquisa$ = this.seatingCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableSeating) => {
        this.dataSourceSeating = data._embedded.seatings;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        console.log("Numero de SEATINGS lidos: " + this.totalElements);
      },
      error => {
        this.erroMsg = error;
        this.hasErroMsg = true;
        console.error('ERROR: ', error);
        this.dataSourceSeating = [];
      },
      () => { this.requestCompleto = true; }
    );
  }

  
  carregarRestaurantes() {
    console.log('CARREGAR LISTA DE RESTAURANTES');
    
    let pageIndex = this.pageEvent? this.pageEvent.pageIndex: 0;
    let pageSize = this.pageEvent? this.pageEvent.pageSize: this.sizeInicial;
    
    //SORT
    this.sort = this.sortEvent? this.sortEvent.active : "id";
    this.direccaoOrdem = this.sortEvent? this.sortEvent.direction : "asc";

    let myObservablePesquisa$: Observable<IResponsePageableRestaurante>;

    myObservablePesquisa$ = this.restauranteCrudService.findAll(pageIndex, pageSize, this.sort, this.direccaoOrdem);

    myObservablePesquisa$.subscribe(
      (data: IResponsePageableRestaurante) => {
        console.log("DADOS" + data);
        this.dataSourceRestaurante = data._embedded.restaurantes;
        this.mypages = data.page;
        this.totalElements = this.mypages.totalElements;
        console.log("Numero de Restaurantes lidos: " + this.totalElements);
      },
      error => {
        this.erroMsg = error;
        this.hasErroMsg = true;
        console.error('ERROR: ', error);
        this.dataSourceRestaurante = [];
      },
      () => { this.requestCompleto = true; }
    );
  }



  addReserva(){
    console.log("ADICIONAR UMA RESERVA");
    console.log(this.formCriarAlterarReserva.value);
    console.log(this.formCriarAlterarReserva.controls['tipoCliente'].value);
    console.log(this.extraFormControl.value);

    console.log("RESERVA: " + JSON.stringify(this.criarObjectoReserva()));
    
    this.reservaCrudService.createReservaFromIReqReserva(this.criarObjectoReserva()).subscribe(
      success => {
        console.log('CRIADO RESERVA: sucesso: ' + success);
        alert('RESERVA criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/reserva/listar']);
        })
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO RESERVA: Erro no Create RESERVA \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },

      () => {
        console.log('CRIAR RESERVA: request completo');
        this.requestCompleto = true;
      }
    );


  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }


  setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarReserva.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
  }

  criarObjectoReserva(): IReqReserva{
    console.log('CRIANDO OBJECTO RESERVA......');
    
    return {
      "id": this.formCriarAlterarReserva?.value.id,
      "numeroAdulto": this.formCriarAlterarReserva?.value.numeroAdultos, 
      "numeroCrianca": this.formCriarAlterarReserva?.value.numeroCrianca,
      "dataReserva": this.formCriarAlterarReserva?.value.dataReserva, 
      "observacoes": this.formCriarAlterarReserva?.value.observacoes, 
      "comentarios": this.formCriarAlterarReserva?.value.comentarios,
      
      "ativo": this.formCriarAlterarReserva?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime(),

      "estado": "http://localhost:8080/estado/" + this.formCriarAlterarReserva?.value.estado,

      "cliente": "http://localhost:8080/clientes/" + this.cliente,

      //este valor deve ser obtido da sessao do utilizador que estiver ligado no sistema
      "utilizador": "http://localhost:8080/utilizadores/" + this.idUtilizador,
      
      "pagamento": "http://localhost:8080/pagamentos/" + this.formCriarAlterarReserva?.value.pagamento,
      
      
      //este valor é obtido apartir da relacao Restasurante e Seating e data escolhidos escolhidos.
      //mostrar no html as informacoes do Restarante Seating com info pertinentes (data, lotacao, numeor de reservas.....)
      //restauranteSeating: this.formCriarAlterarReserva?.value.restauranteSeating,
      restauranteSeating: "http://localhost:8080/restauranteSeating/1",      
      
      
      //"extras": ["http://localhost:8080/extras/1", "http://localhost:8080/extras/2", "http://localhost:8080/extras/3"]
      //"extras": this.formCriarAlterarReserva?.value.extras
      "extras": this.getExtrasURLList(this.formCriarAlterarReserva?.value.extras)
     }
  }
  getExtrasURLList(extras: string[]): string[] {
    let urlList: string[];
    urlList = extras;
    let cont= 0;

    //console.log('Dentro de getExtrasURLList!!!!! ---> ' + extras);
    extras.forEach(ext =>{
      //ext = 'http://localhost:8080/extras/' + ext;
      //console.log('URL----> ' + ext);
      urlList[cont] = 'http://localhost:8080/extras/' + ext;
      cont++;
      
    });
    //console.log("Novo EXTRAS:::: " + urlList);
    return urlList;
  }

  getSystemCurrentDateTime(): string {
    
    return '2022-08-30T20:10:00'
  }

}