import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqUtilizador } from '../../../interfaces/i-req-utilizador';
import { UtilizadorCrudService } from '../../../services/utilizador-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    UtilizadorCrudService
  ]
})
export class CriaralterarComponent implements OnInit {
  
  formCriarAlterarReserva !: FormGroup;

  constructor(private utilizadorCrudService: UtilizadorCrudService) { }

  ngOnInit(): void {
    
  }

  addUtilizador(){
    console.log("ADICIONAR UM EXTRA");

    this.utilizadorCrudService.createUtilizadorFromIReqUtilizador(this.criarObjectoUtilizador()).subscribe(
      success => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        console.log('CRIADO ITEM: sucesso: ' + success);
        //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO USER: Erro no Create USER \n"+error;
        //this.requestCompleto = false;
        //console.log(this.erroMsg);
        //alert(erroMsg);
      },

      () => {
        console.log('CRIAR USER: request completo');
        //this.requestCompleto = true;
      }
    );
  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }

  criarObjectoUtilizador(): IReqUtilizador{
    console.log('CRIANDO OBJECTO UTLIZADOR......');
    
    return {
      "userName": "alima2",
      "password": "aaaaaaa2",
      "email": "aaaa21@gmail.com",

      "ativo": true,
      "dataCriacao": '2022-08-20T12:10:00',
      "dataUltimaActualizacao": '2022-08-20T12:10:00'
     }
  }

}
