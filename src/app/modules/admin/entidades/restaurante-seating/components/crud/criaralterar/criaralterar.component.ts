import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IReqRestauranteSeating } from '../../../interfaces/i-req-restaurante-seating';
import { RestauranteSeatingCrudService } from '../../../services/restaurante-seating-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    RestauranteSeatingCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarRestauranteSeating!: FormGroup;
  menuFormControl = new FormControl('');
  listaMenus: string[] = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

  constructor(private restauranteSeatingCrudService: RestauranteSeatingCrudService) { }

  ngOnInit(): void {
  }

  addRestauranteSeating(){
    console.log("ADICIONAR UM RESTAURANTE SEATING");
    console.log('estou aqui.....');

    this.restauranteSeatingCrudService.createExtraFromIReqRestauranteSeating(this.criarObjectoRestauranteSeating()).subscribe(
      success => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        console.log('CRIADO RESTAURANTE SEATING: sucesso: ' + success);
        //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO ITEM: Erro no Create RESTAURANTE SEATING \n"+error;
        //this.requestCompleto = false;
        //console.log(this.erroMsg);
        //alert(erroMsg);
      },

      () => {
        console.log('CRIAR RESTAURANTE SEATING: request completo');
        //this.requestCompleto = true;
      }
    );
  }
  


  criarObjectoRestauranteSeating(): IReqRestauranteSeating{
    console.log('CRIANDO OBJECTO RESSEAT......');
    
    return {
      "data": "2022-08-25",
      "lotacao": 20,
      "ativo": true,
      "dataCriacao": '2022-08-18T12:10:00',
      "dataUltimaActualizacao": '2022-08-18T12:10:00',

      "seating": 'http://localhost:8080/seatings/2',
      "restaurante": 'http://localhost:8080/restaurantes/3',
      "menu": 'http://localhost:8080/menus/1'
     }
  }

  resetFields(){
    this.formCriarAlterarRestauranteSeating.reset();
    alert('CLEAN FIELDS');
  }

}
