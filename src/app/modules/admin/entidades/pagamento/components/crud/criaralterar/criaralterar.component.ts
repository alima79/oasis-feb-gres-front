import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqPagamento } from '../../../interfaces/i-req-pagamento';
import { PagamentoCrudService } from '../../../services/pagamento-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers:[
    PagamentoCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarReserva !: FormGroup;
  constructor(private pagamentoCrudService: PagamentoCrudService) { }

  ngOnInit(): void {
  }

  addPagamento(){
    console.log("ADICIONAR UM EXTRA");

    this.pagamentoCrudService.createPagamentoFromIReqPagamento(this.criarObjectoPagamento()).subscribe(
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
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }

  criarObjectoPagamento(): IReqPagamento{
    console.log('CRIANDO OBJECTO Pagamento......');
    
    return {
      "tipo": "Desconhecido",
      "descricao": "bl bla bla 5",
      "ativo": true,
      "dataCriacao": '2022-08-15T19:10:00',
      "dataUltimaActualizacao": '2022-08-15T19:10:00'
     }
  }


  /*setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarReserva.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
  }*/

}
