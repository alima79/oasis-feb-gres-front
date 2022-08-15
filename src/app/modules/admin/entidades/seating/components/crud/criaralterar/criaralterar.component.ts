import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqSeating } from '../../../interfaces/i-req-seating';
import { SeatingCrudService } from '../../../services/seating-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    SeatingCrudService
  ]
})
export class CriaralterarComponent implements OnInit {
  formCriarAlterarSeating!: FormGroup;

  constructor(private seatingCrudService: SeatingCrudService) { }

  ngOnInit(): void {
  }
  addSeating(){
    console.log("ADICIONAR UM  SEATING");

    this.seatingCrudService.createSeatingFromIReqSeating(this.criarObjectoSeating()).subscribe(
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

  criarObjectoSeating(): IReqSeating{
    console.log('CRIANDO OBJECTO SEATING......');
    
    return {
      "horaInicio": "18:30:00",
      "horaFim": "20:00:00",
      "completo": false,

      "ativo": false,
      "dataCriacao": '2022-08-17T12:10:00',
      "dataUltimaActualizacao": '2022-08-17T12:10:00'
     }
  }

  resetFields(){
    this.formCriarAlterarSeating.reset();
    alert('CLEAN FIELDS');
  }

}
