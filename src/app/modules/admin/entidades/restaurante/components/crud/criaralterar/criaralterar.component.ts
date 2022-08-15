import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqRestaurante } from '../../../interfaces/i-req-restaurante';
import { RestauranteCrudService } from '../../../services/restaurante-crud.service';

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
  constructor(private restauranteCrudService: RestauranteCrudService) { }

  ngOnInit(): void {
  }

  addRestaurante(){
    console.log("ADICIONAR UM Restaurante");

    this.restauranteCrudService.createRestauranteFromIReqRestaurante(this.criarObjectoRestaurante()).subscribe(
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

  criarObjectoRestaurante(): IReqRestaurante{
    console.log('CRIANDO OBJECTO Restaurante......');
    
    return {
      "nome": "SO SABY",
      "lotacaoMaxima": 5,
      "ativo": false,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

  resetFields(){
    this.formCriarAlterarRestaurante.reset();
    alert('CLEAN FIELDS');
  }

}
