import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IReqReserva } from '../../../interfaces/i-req-reserva';
import { ReservaCrudService } from '../../../services/reserva-crud.service';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss'],
  providers: [
    ReservaCrudService
  ]
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarReserva !: FormGroup;

  tipoCliente = '';
  requestCompleto= false;
  erroMsg?: string;
  hasErroMsg: boolean = false;
  extraFormControl = new FormControl('');
  listaExtras: string[] = ["Extra 1", "Extra 2", "Extra 3", "Extra 4", "Extra 5"];




  constructor(private formBuilder: FormBuilder,
              private reservaCrudService: ReservaCrudService) { }

  ngOnInit(): void {
    this.formCriarAlterarReserva = this.formBuilder.group({

        restaurante : ['', Validators.required],
        seating : ['', Validators.required],
        dataReserva : ['', Validators.required],
        estado : ['', Validators.required],
        ativo : ['', Validators.required],

        //cliente related
        tipoCliente : ['', Validators.required],
        nomeCliente : ['', Validators.required],
        apelidoCliente : ['', Validators.required],
        email : ['', Validators.required],
        telefone : ['', Validators.required],


        // hospede
        numeroQuarto : ['', Validators.required],
        nacionalidade : ['', Validators.required],

        //prticular
        observacaoPartb : ['', Validators.required],

        // grupo
        instituicao : ['', Validators.required],
        observacaoGrupo : ['', Validators.required],
        descricaoGrupo : ['', Validators.required],

        numAdultos : ['', Validators.required],
        numCrianca : ['', Validators.required],
        observacoes : ['',Validators.required],
        comentarios : ['', Validators.required],


        pagamento : ['', Validators.required],

        extras : ['', Validators.required],

        user : ['', Validators.required],

        menu : ['', Validators.required]

    });
  }

  addReserva(){
    console.log("ADICIONAR UMA RESERVA");
    console.log(this.formCriarAlterarReserva.value);
    //console.log(this.formCriarAlterarReserva.controls['tipoCliente'].value);
    console.log(this.extraFormControl.value);

    this.reservaCrudService.createReservaFromIReqReserva(this.criarObjectoReserva()).subscribe(
      success => {
        //this.hasErroMsg = false;
        //this.msgSnackBar("ITEM criado");
        console.log('CRIADO ITEM: sucesso: ' + success);
        //this.router.navigate(['/oa-admin/gestao/entidades/item/listar']);
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO ITEM: Erro no Create Item \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },

      () => {
        console.log('CRIAR ITEM: request completo');
        this.requestCompleto = true;
      }
    );


  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }


  setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarReserva.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
  }

  criarObjectoReserva(): IReqReserva{
    console.log('CRIANDO OBJECTO RESERVA......');
    
    return {
      "id": 5,
      "numeroAdulto": 10, 
      "numeroCrianca": 5,
      "dataReserva": "2022-08-26", 
      "observacoes": "teste com 3 extra", 
      "comentarios": "teste com 3 extra",
      
      "ativo": false,
      "dataCriacao": '2022-08-20T12:10:00',
      "dataUltimaActualizacao": '2022-08-20T12:10:00',

      "estado": "http://localhost:8080/estados/1",
      "cliente": "http://localhost:8080/clientes/1",
      "utilizador": "http://localhost:8080/utilizadores/1",
      "pagamento": "http://localhost:8080/pagamentos/1",
      "restauranteSeating": "http://localhost:8080/restauranteSeating/1",
      "extras": ["http://localhost:8080/extras/1", "http://localhost:8080/extras/2", "http://localhost:8080/extras/3"]

     }
  }



}
