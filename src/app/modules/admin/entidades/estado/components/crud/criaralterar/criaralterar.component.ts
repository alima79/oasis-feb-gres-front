import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  formCriarAlterarEstado!: FormGroup;

  constructor(private estadoCrudService: EstadoCrudService) { }

  ngOnInit(): void {
  }

  addEstado(){
    console.log("ADICIONAR UM EXTRA");

    this.estadoCrudService.createExtraFromIReqEstado(this.criarObjectoEstado()).subscribe(
      success => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        console.log('CRIADO ITEM: sucesso: ' + success);
        //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO ITEM: Erro no Create Estado \n"+error;
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

  criarObjectoEstado(): IReqEstado{
    console.log('CRIANDO OBJECTO Estado......');
    
    return {
      "valor": "Status Test",
      "descricao": "bTeste insert Estado!!!!",
      
      "ativo": false,
      "dataCriacao": '2022-08-16T20:10:00',
      "dataUltimaActualizacao": '2022-08-16T20:10:00'
     }
  }

  resetFields(){
    this.formCriarAlterarEstado.reset();
    alert('CLEAN FIELDS');
  }

}
