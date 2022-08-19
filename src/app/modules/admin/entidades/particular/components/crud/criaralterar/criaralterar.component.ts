import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqCliente } from '../../../../cliente/interfaces/i-req-cliente';
import { ClienteCrudService } from '../../../../cliente/services/cliente-crud.service';
import { IReqParticular } from '../../../../particular/interfaces/i-req-particular';
import { ParticularCrudService } from '../../../../particular/services/particular-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    ParticularCrudService,
    ClienteCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarParticular!: FormGroup;
  criarCliente = true;
  requestCompleto = false;
  hasErroMsg = false;

  constructor(private particularCrudService: ParticularCrudService,
              private clienteCrudService: ClienteCrudService) { }

  ngOnInit(): void {
  }

  addCliente(){
    console.log("ADICIONAR UM CLIENTE");
    console.log('Estou AQUI!!!!!');



    this.clienteCrudService.createClienteFromIReqCliente(this.criarObjectoCliente()).subscribe(
      (success: any) => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        //console.log('CRIADO cliente: sucesso: ' + success);
        //console.log('CRIADO cliente: sucesso: ' + success.nome);
        console.log('CRIADO cliente com ID: ' + success.id + " sucesso");
        if(success.id){
          console.log("ID TEM QUALQUER COISA DIDERETENF DE NULL: " + success.id);

          let urlCliente = "http://localhost:8080/clientes/" + success.id;
          console.log("URL CLIENTE INSERIDO!!!!!!  " + urlCliente);          
          console.log('ADICIONAR HOSPEDE APOS ADICIONARR UM CLIENTE !!!!!!!!!!!!!');
          this.addParticular(urlCliente);

         
          //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);

        } else {
          console.log('DEU BOOOOOOOOOOOOOOOOOOOOOOSTAAAAAAAAAAAAAAAAAA');
        }
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO Cliente: Erro no Create Cliente \n"+error;
        //this.requestCompleto = false;
        //console.log(this.erroMsg);
        alert(erroMsg);
      },

      () => {
        console.log('CRIAR Cliente: request completo');
        alert('CRIAR Cliente: request completo');
        this.requestCompleto = true;
      }
    );


    

  }


  addParticular(urlCliente: string){
    console.log('Metodo para inseirir um HOSPEDE aops inserir um cliente....' + urlCliente);

    this.particularCrudService.createParticularFromIReqParticular(this.criarObjectoParticular(urlCliente)).subscribe(
      (success: any) => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        //console.log('CRIADO cliente: sucesso: ' + success);
        //console.log('CRIADO cliente: sucesso: ' + success.nome);
        console.log('CRIADO Hospde com ID: ' + success.id + " sucesso");
        if(success.id){
          console.log("ID TEM QUALQUER COISA DIDERETENF DE NULL: " + success.id);
          alert("Registo Hospede inserido com SUCESSO!!!1");

          //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);

        } else {
          console.log('DEU BOOOOOOOOOOOOOOOOOOOOOOSTAAAAAAAAAAAAAAAAAA');
        }
      },
      error => {
        //this.hasErroMsg = true;
        let erroMsg = "CRIADO hOSPEDE: Erro no Create HOSPEDE \n"+error;
        //this.requestCompleto = false;
        //console.log(this.erroMsg);
        alert(erroMsg);
      },

      () => {
        console.log('CRIAR hOSPEDE: request completo');
        alert('CRIAR HOSPEDE: request completo');
        this.requestCompleto = true;
      }
    );

  }

  criarObjectoCliente(): IReqCliente{
    console.log('CRIANDO OBJECTO Cliente......');
    
    return {
      "id": 12,
      "nome": "Ricardo1", 
      "apelido": "Santos", 
      "email": "restrela1@gmail.com",
      "telefone": "5400014", 
      "tipo": "particular",
      
      "ativo": true,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

  criarObjectoParticular(_url: string): IReqParticular{
    console.log('CRIANDO OBJECTO PARTICULAR......');
    
    return {
      "id": 9,
      "observacao": "tenha cuidado com este cliente particular- versao 2",
      "cliente": _url
     }
  }

  resetFields(){
    this.formCriarAlterarParticular.reset();
    alert('CLEAN FIELDS');
  }

}
