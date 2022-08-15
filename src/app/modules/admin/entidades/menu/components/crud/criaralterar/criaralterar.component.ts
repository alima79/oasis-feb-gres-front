import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqMenu } from '../../../interfaces/i-req-menu';
import { MenuCrudService } from '../../../services/menu-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    MenuCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarReserva !: FormGroup;
  
  constructor(private menuCrudService: MenuCrudService) { }

  ngOnInit(): void {
  }

  addMenu(){
    console.log("ADICIONAR UM EXTRA");

    this.menuCrudService.createMenuFromIReqMenu(this.criarObjectoMenu()).subscribe(
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

  criarObjectoMenu(): IReqMenu{
    console.log('CRIANDO OBJECTO MENU......');
    
    return {
      "nome": "Menu 7",
      "descricao": "teste insercao menu",
      "ativo": false,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }  

}
