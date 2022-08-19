import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IReqMenu } from '../../../interfaces/i-req-menu';
import { MenuCrudService } from '../../../services/menu-crud.service';
import { ListarComponent } from '../listar/listar.component';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    MenuCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarMenu !: FormGroup;
  acao = "criar";
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;

  
  constructor(private menuCrudService: MenuCrudService,
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
  
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormMenu();
  }


  incializarFormMenu(): void {
    this.formCriarAlterarMenu = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }



  preencherFormularioUpdate(id: number) {
    console.log('Preencher Formulario para Update Menu com ID: ' + id);    
  } 

  addMenu(){
    console.log("ADICIONAR UM Menu");

    this.menuCrudService.createMenuFromIReqMenu(this.criarObjectoMenu()).subscribe(
      success => {
        console.log('CRIADO MENU: sucesso: ' + success);
        alert('MENU criado com Sucesso: ' + success);

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/menu/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO MENU: Erro no Create MENU \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },

      () => {
        console.log('CRIAR MENU: request completo');
        this.requestCompleto = true;
      }
    );
  }

  criarObjectoMenu(): IReqMenu{
    console.log('CRIANDO OBJECTO MENU......');
    
    return {
      "id": this.formCriarAlterarMenu?.value.id,
      "nome": this.formCriarAlterarMenu?.value.nome,
      "descricao": this.formCriarAlterarMenu?.value.descricao,
      "ativo": this.formCriarAlterarMenu?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }


  getSystemCurrentDateTime(): string {
    return '2022-08-30T20:10:00'
  }
  
  resetFields(){
    this.formCriarAlterarMenu.reset();
    alert('CLEAN FIELDS');
  }  

}
