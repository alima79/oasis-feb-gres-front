import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqExtras } from '../../../interfaces/i-req-extras';
import { ExtrasCrudService } from '../../../services/extras-crud.service';

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
  constructor(private extraCrudService: ExtrasCrudService) { }
  
  ChangedFormat!: string | null;

  ngOnInit(): void {
  }

  addExtra(){
    console.log("ADICIONAR UM EXTRA");

    this.extraCrudService.createExtraFromIReqExtra(this.criarObjectoExtra()).subscribe(
      success => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        console.log('CRIADO ITEM: sucesso: ' + success);
        //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
        //this.requestCompleto = false;
        //console.log(this.erroMsg);
        //alert(erroMsg);
      },

      () => {
        console.log('CRIAR ITEM: request completo');
        //this.requestCompleto = true;
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
      "nome": "Extra 10",
      "descricao": "extra dia 15 agodto",
      "ativo": false,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

}
