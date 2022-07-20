import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criaralterar',
  templateUrl: './criaralterar.component.html',
  styleUrls: ['./criaralterar.component.scss']
})
export class CriaralterarComponent implements OnInit {

  formCriarAlterarReserva !: FormGroup;
  
  tipoCliente = '';

  extraFormControl = new FormControl('');
  listaExtras: string[] = ["Extra 1", "Extra 2", "Extra 3", "Extra 4", "Extra 5"];
 



  constructor(private formBuilder: FormBuilder) { }

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

    //get info reserva a inserir

    //get info cliente
    //get info hospede
    //get info particular
    //get info grupo
    
    
  }

  resetFields(){
    this.formCriarAlterarReserva.reset();
    alert('CLEAN FIELDS');
  }


  setTipoCliente(){
      this.tipoCliente = this.formCriarAlterarReserva.controls['tipoCliente'].value;
      console.log(this.tipoCliente);
  }

  

}
