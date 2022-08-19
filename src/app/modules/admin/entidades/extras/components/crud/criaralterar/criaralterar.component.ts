import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IReqExtras } from '../../../interfaces/i-req-extras';
import { ExtrasCrudService } from '../../../services/extras-crud.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    ExtrasCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarExtra !: FormGroup;

  acao = "criar";
  formCriarAlterarEstado!: FormGroup;
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;


  constructor(private extraCrudService: ExtrasCrudService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<ListarComponent>
    ) { }
  
  ChangedFormat!: string | null;

  ngOnInit(): void {
    this.preencherFormulario();
  }


  preencherFormulario() {
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


  preencherFormularioCreate() {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormExtra();
  }


  incializarFormExtra() {
    this.formCriarAlterarExtra = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }


  preencherFormularioUpdate(id: any) {
    console.log('Preencher Formulario para Update EXTRA com ID:  ' + id);
  }

  addExtra(){
    console.log("ADICIONAR UM EXTRA");

    this.extraCrudService.createExtraFromIReqExtra(this.criarObjectoExtra()).subscribe(
      success => {
        console.log('CRIADO EXTRA: sucesso: ' + success);
        alert('EXTRA criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/extras/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
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

  resetFields(){
    this.formCriarAlterarExtra.reset();
    alert('CLEAN FIELDS');
  } 

  criarObjectoExtra(): IReqExtras{
    console.log('CRIANDO OBJECTO EXTRA......');
    
    return {
      "id": this.formCriarAlterarExtra?.value.id,
      "nome": this.formCriarAlterarExtra?.value.nome,
      "descricao": this.formCriarAlterarExtra?.value.descricao,
      "ativo": this.formCriarAlterarExtra?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }

  getSystemCurrentDateTime(): string {
    return '2022-08-18T20:10:00'
  }

}
