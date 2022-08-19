import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IReqSeating } from '../../../interfaces/i-req-seating';
import { SeatingCrudService } from '../../../services/seating-crud.service';
import { ListarComponent } from '../listar/listar.component';

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

  acao = "criar";
  requestCompleto= false;
  submitted = false;
  erroMsg?: string;
  hasErroMsg: boolean = false;


  constructor(private seatingCrudService: SeatingCrudService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<ListarComponent>) { }

  ngOnInit(): void {
    this.preencherFormulario();
  }

  preencherFormulario(): void {
    //LER DADOS URL: SABER ID e ACCAO
    this.route.params.subscribe((params: any) =>{
      console.log(params);
      const id = params['id'];
      if(id){
        this.preencherFormularioUpdate(id);
      }else{
        this.preencherFormularioCreate();
      }
    });
  }

  //CARREGAR FORM COM DADOS DE OBJECTO
  preencherFormularioUpdate(id: number): void {
    console.log('Preencher Formulario para Update Estado com ID:  ' + id);
  }


  //INCIALIZAR FORM COM DADOS PARA CRIAR
  preencherFormularioCreate(): void {
    this.acao="criar";
    console.log("ACCAO: ", this.acao);
    this.incializarFormSeating();
  }

   incializarFormSeating(): void {
    this.formCriarAlterarSeating = this.formBuilder.group({
      id: [null],
      horaInicio: [null, [Validators.required]],
      horaFim: [null, [Validators.required]],
      completo: [null, [Validators.required]],
      ativo: [null, [Validators.required]],
      dataCriacao: [null],
      dataAtualizacao: [null]
    });
  }



  addSeating(){
    console.log("ADICIONAR UM  SEATING" + this.criarObjectoSeating());

    this.seatingCrudService.createSeatingFromIReqSeating(this.criarObjectoSeating()).subscribe(
      success => {
        console.log('CRIADO ESSEATINGTADO: sucesso: ' + success);
        

        //fechar o dialog pop-up
        this.dialogRef.close();

        this.router.navigateByUrl('/', {skipLocationChange: true} ).then(() => {
          this.router.navigate(['/oa-admin/gestao/entidades/seating/listar']);
        });
      },
      error => {
        this.hasErroMsg = true;
        this.erroMsg = "CRIADO SEATING: Erro no Create SEATING \n"+error;
        this.requestCompleto = false;
        console.log(this.erroMsg);
        alert(this.erroMsg);
      },

      () => {
        console.log('CRIAR SEATING: request completo');
        this.requestCompleto = true;
      }
    );
  }

  criarObjectoSeating(): IReqSeating{
    console.log('CRIANDO OBJECTO SEATING......');
    
    return {
      "id": this.formCriarAlterarSeating?.value.id,
      "horaInicio": this.formCriarAlterarSeating?.value.horaInicio,
      "horaFim": this.formCriarAlterarSeating?.value.horaFim,
      "completo": this.formCriarAlterarSeating?.value.completo,

      "ativo": this.formCriarAlterarSeating?.value.ativo,
      "dataCriacao": this.getSystemCurrentDateTime(),
      "dataUltimaActualizacao": this.getSystemCurrentDateTime()
     }
  }

  getSystemCurrentDateTime(): string {
    return '2022-08-30T20:10:00'
  }

  resetFields(){
    this.formCriarAlterarSeating.reset();
    alert('CLEAN FIELDS');
  }

}
