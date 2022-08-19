import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarComponent } from '../../../../estado/components/crud/listar/listar.component';
import { IReqEstado } from '../../../interfaces/i-req-estado';
import { EstadoCrudService } from '../../../services/estado-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    EstadoCrudService
  ]
})


export class CriaralterarComponent implements OnInit {

  acao = "criar";
  formCriarAlterarEstado!: FormGroup;
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;


  constructor(private estadoCrudService: EstadoCrudService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<ListarComponent>) { }

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
    console.log('Preencher Formulario para Update Estado com ID:  ' + id);
  }


  //INCIALIZAR FORM COM DADOS PARA CRIAR
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormEstado();
  }

   incializarFormEstado(): void {
    this.formCriarAlterarEstado = this.formBuilder.group({
      id: [null],
      valor: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }

  addEstado(): void{
    console.log("crearObjecto", this.criarObjectoEstado());

    this.estadoCrudService.createExtraFromIReqEstado(this.criarObjectoEstado()).subscribe(
      success => {
        console.log('CRIADO ESTADO: sucesso: ' + success);
        //alert('Estado criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/estado/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO ITEM: Erro no Create Estado \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },
      () => {
        console.log('CRIAR ITEM: request completo');
        this.requestCompleto = true;
      }
    );
  }


  //CRIAR OBJECTO COM OS DADOS DE FORMULARIO, S/ ID, PARA SER ENVIADO NO PEDIDO
  criarObjectoEstado(): IReqEstado{
    return {
      "id": this.formCriarAlterarEstado?.value.id,
      "valor": this.formCriarAlterarEstado?.value.valor,
      "descricao": this.formCriarAlterarEstado?.value.descricao,
      "ativo": this.formCriarAlterarEstado?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }

  getSystemCurrentDateTime(): string {
    return '2022-08-30T20:10:00'
  }

  resetFields(): void{
    this.formCriarAlterarEstado.reset();
    alert('CLEAN FIELDS');
  }

}
