import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IReqPagamento } from '../../../interfaces/i-req-pagamento';
import { PagamentoCrudService } from '../../../services/pagamento-crud.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers:[
    PagamentoCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  acao = "criar";
  formCriarAlterarPagamento!: FormGroup;
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;


  constructor(private pagamentoCrudService: PagamentoCrudService,
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
    console.log('Preencher Formulario para Update Pagamento com ID:  ' + id);
  }


  //INCIALIZAR FORM COM DADOS PARA CRIAR
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormPagamento();
   }

   incializarFormPagamento(): void {
    this.formCriarAlterarPagamento = this.formBuilder.group({
      id: [null],
      tipo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }


  addPagamento(){
    console.log("ADICIONAR UM PAGAMENTO");

    this.pagamentoCrudService.createPagamentoFromIReqPagamento(this.criarObjectoPagamento()).subscribe(
      success => {  
        console.log('CRIADO Pagamento: sucesso: ' + success);
        alert('PAGAMENTO criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/pagamento/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO PAGAMENTO: Erro no Create PAGAMENTO \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },

      () => {
        console.log('CRIAR PAGAMENTO: request completo');
        this.requestCompleto = true;
      }
    );
  }

  resetFields(){
    this.formCriarAlterarPagamento.reset();
    alert('CLEAN FIELDS');
  }

  criarObjectoPagamento(): IReqPagamento{
    console.log('CRIANDO OBJECTO Pagamento......');
    
    return {
      "id": this.formCriarAlterarPagamento?.value.id,
      "tipo": this.formCriarAlterarPagamento?.value.tipo,
      "descricao": this.formCriarAlterarPagamento?.value.descricao,
      "ativo": this.formCriarAlterarPagamento?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }

  getSystemCurrentDateTime(): string {
    return '2022-08-30T20:10:00'
  }  

}
