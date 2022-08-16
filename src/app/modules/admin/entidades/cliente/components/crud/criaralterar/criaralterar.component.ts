import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IReqGrupo } from '../../../../grupo/interfaces/i-req-grupo';

import { GrupoCrudService } from '../../../../grupo/services/grupo-crud.service';
import { IReqHospede } from '../../../../hospede/interfaces/i-req-hospede';
import { HospedeCrudService } from '../../../../hospede/services/hospede-crud.service';
import { IReqParticular } from '../../../../particular/interfaces/i-req-particular';
import { ParticularCrudService } from '../../../../particular/services/particular-crud.service';
import { IReqCliente } from '../../../interfaces/i-req-cliente';
import { MCliente } from '../../../models/m-cliente';
import { ClienteCrudService } from '../../../services/cliente-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    ClienteCrudService,
    HospedeCrudService,
    ParticularCrudService,
    GrupoCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarCliente!: FormGroup;
  tipoCliente = 'grupo';
  criarCliente = true;
  requestCompleto = false;
  hasErroMsg = false;

  constructor(private clienteCrudService: ClienteCrudService,
              private hospedeCrudService: HospedeCrudService,
              private particularCrudservice: ParticularCrudService,
              private grupoCrudService: GrupoCrudService) { }

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

          if(this.tipoCliente=='hospede' && this.criarCliente==true){
            console.log('ADICIONAR HOSPEDE APOS ADICIONARR UM CLIENTE !!!!!!!!!!!!!');
            this.addHospede(urlCliente);

          } else if(this.tipoCliente=='particular' && this.criarCliente==true){
            console.log('ADICIONAR PARTICULAR APOS ADICIONARR UM CLIENTE !!!!!!!!!!!!!');
            this.addParticular(urlCliente);

          } else if(this.tipoCliente=='grupo'  && this.criarCliente==true){
            console.log('ADICIONAR GRUPO APOS ADICIONARR UM CLIENTE !!!!!!!!!!!!!');
            this.addGrupo(urlCliente);

          } else {
            console.log('POR FAVOR ESCOLHER UM TIPO DE cLIENTE!!!')
            alert("POR FAVOR ESCOLHER UM TIPO DE cLIENTE!!!");
          }
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

  resetFields(){
    this.formCriarAlterarCliente.reset();
    alert('CLEAN FIELDS');
  }


  setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarCliente.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
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

  addParticular(urlCliente: string){
    console.log('Metodo para inseirir um PARTICULLAR aops inserir um cliente....'  + urlCliente);

    this.particularCrudservice.createParticularFromIReqParticular(this.criarObjectoParticular(urlCliente)).subscribe(
      (success: any) => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        //console.log('CRIADO cliente: sucesso: ' + success);
        //console.log('CRIADO cliente: sucesso: ' + success.nome);
        console.log('CRIADO Particular com ID: ' + success.id + " sucesso");
        if(success.id){
          console.log("ID TEM QUALQUER COISA DIDERETENF DE NULL: " + success.id);
          alert("Registo Particular inserido com SUCESSO!!!1");

          //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);

        } else {
          console.log('DEU BOOOOOOOOOOOOOOOOOOOOOOSTAAAAAAAAAAAAAAAAAA');
        }
      },
      error => {
        this.hasErroMsg = true;
        let erroMsg = "CRIADO hOSPEDE: Erro no Create HOSPEDE \n"+error;
        //this.requestCompleto = false;
        console.log(this.erroMsg);
        //alert(erroMsg);
      },

      () => {
        console.log('CRIAR hOSPEDE: request completo');
        //alert('CRIAR HOSPEDE: request completo');
        this.requestCompleto = true;
      }
    );
  }
  erroMsg(erroMsg: any) {
    throw new Error('Method not implemented.');
  }

  addGrupo(urlCliente: string){
    console.log('Metodo para inseirir um GRUPO aops inserir um cliente....'  + urlCliente);

    this.grupoCrudService.createGrupoFromIReqGrupo(this.criarObjectoGrupo(urlCliente)).subscribe(
      (success: any) => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        //console.log('CRIADO cliente: sucesso: ' + success);
        //console.log('CRIADO cliente: sucesso: ' + success.nome);
        console.log('CRIADO GRUPO com ID: ' + success.id + " sucesso");
        if(success.id){
          console.log("ID TEM QUALQUER COISA DIDERETENF DE NULL: " + success.id);
          alert("Registo GRUPO inserido com SUCESSO!!!1");

          //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);

        } else {
          console.log('DEU BOOOOOOOOOOOOOOOOOOOOOOSTAAAAAAAAAAAAAAAAAA');
        }
      },
      error => {
        this.hasErroMsg = true;
        let erroMsg = "CRIADO GRUPO: Erro no Create HOSPEDE \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        //alert(erroMsg);
      },

      () => {
        console.log('CRIAR hOSPEDE: request completo');
        //alert('CRIAR HOSPEDE: request completo');
        this.requestCompleto = true;
      }
    );
  }

  criarObjectoCliente(): IReqCliente{
    console.log('CRIANDO OBJECTO Cliente......');
    
    return {
      "nome": "Jose51", 
      "apelido": "Sil54va1", 
      "email": "j1s4i5lva@gmail.com",
      "telefone": "5460414", 
      "tipo": "grupo",
      
      "ativo": true,
      "dataCriacao": '2022-08-16T12:10:00',
      "dataUltimaActualizacao": '2022-08-16T12:10:00'
     }
  }

  criarObjectoHospede(_url: string): IReqHospede{
    console.log('CRIANDO OBJECTO HOSPDE......');
    
    return {
      "numeroQuarto": 1001, 
      "nacionalidade": "Palmeira", 
      "cliente": _url
     }
  }

  criarObjectoParticular(_url: string): IReqParticular{
    console.log('CRIANDO OBJECTO PARTICULAR......');
    
    return {
      "observacao": "tenha cuidado com este cliente particular",
      "cliente": _url
     }
  }

  criarObjectoGrupo(_url: string): IReqGrupo{
    console.log('CRIANDO OBJECTO GRUPO......');
    
    return {
      "instituicao": "Oasis Grupo",
      "descricao": "insercao de teste de grupo",
      "observacao": "kkkk",

      "cliente": _url
     }
  }



}
