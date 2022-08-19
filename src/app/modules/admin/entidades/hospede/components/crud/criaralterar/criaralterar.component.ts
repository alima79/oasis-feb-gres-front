import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqCliente } from '../../../../cliente/interfaces/i-req-cliente';
import { ClienteCrudService } from '../../../../cliente/services/cliente-crud.service';
import { IReqHospede } from '../../../interfaces/i-req-hospede';
import { HospedeCrudService } from '../../../services/hospede-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    HospedeCrudService,
    ClienteCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarHospede!: FormGroup;
  criarCliente = true;
  requestCompleto = false;
  hasErroMsg = false;

  constructor(private hospedeCrudService: HospedeCrudService,
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
          this.addHospede(urlCliente);

         
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



  addHospede(urlCliente: string){
    console.log('Metodo para inseirir um HOSPEDE aops inserir um cliente....' + urlCliente);

    this.hospedeCrudService.createHospedeFromIReqHospede(this.criarObjectoHospede(urlCliente)).subscribe(
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
      "id": 56,
      "nome": "Ricardo", 
      "apelido": "Estrela", 
      "email": "restrela@gmail.com",
      "telefone": "5460014", 
      "tipo": "hospede",
      
      "ativo": true,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

  criarObjectoHospede(_url: string): IReqHospede{
    console.log('CRIANDO OBJECTO HOSPDE......');
    
    return {
      "id": 67,
      "numeroQuarto": 1007, 
      "nacionalidade": "New York", 
      "cliente": _url
     }
  }



  resetFields(){
    this.formCriarAlterarHospede.reset();
    alert('CLEAN FIELDS');
  }

}
