import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IReqRestaurante } from '../../../interfaces/i-req-restaurante';
import { RestauranteCrudService } from '../../../services/restaurante-crud.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    RestauranteCrudService
  ]
})

export class CriaralterarComponent implements OnInit {

  formCriarAlterarRestaurante !: FormGroup;

  acao = "criar";
  formCriarAlterarEstado!: FormGroup;
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;

  constructor(private restauranteCrudService: RestauranteCrudService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<ListarComponent>
    ) { }

  ngOnInit(): void {
    this.preencherFormulario();
  }


  preencherFormulario(): void {
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
    console.log('Preencher Formulario para Update RESTAURANTE com ID:  ' + id);
  }

  //INCIALIZAR FORM COM DADOS PARA CRIAR
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormRestaurante();
  }

  incializarFormRestaurante(): void {
    this.formCriarAlterarRestaurante = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lotacaoMaxima: [null, [Validators.required]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }

  addRestaurante(){
    console.log("ADICIONAR UM Restaurante");

    this.restauranteCrudService.createRestauranteFromIReqRestaurante(this.criarObjectoRestaurante()).subscribe(
      success => {
        console.log('CRIADO RESTAURANTE: sucesso: ' + success);
        //alert('RESTAURANTE criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/restaurante/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO RESTAURANTE: Erro no Create RESTAURANTE \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },
      () => {
        console.log('CRIAR RESTAURANTE: request completo');
        this.requestCompleto = true;
      }
    );
  }

  criarObjectoRestaurante(): IReqRestaurante{
    console.log('CRIANDO OBJECTO Restaurante......');
    
    return {
      "id": this.formCriarAlterarRestaurante?.value.id,
      "nome": this.formCriarAlterarRestaurante?.value.nome,
      "lotacaoMaxima": this.formCriarAlterarRestaurante?.value.lotacaoMaxima,
      "ativo": this.formCriarAlterarRestaurante?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }

  getSystemCurrentDateTime(): string {
    return '2022-08-18T20:10:00'
  }

  resetFields(){
    this.formCriarAlterarRestaurante.reset();
    alert('CLEAN FIELDS');
  }

}
