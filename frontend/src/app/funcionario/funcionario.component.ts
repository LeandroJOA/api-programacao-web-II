import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  putOrPost: boolean
  funcionarioDialogo: boolean;
  submetido: boolean;
  funcionarios: any = [];
  funcao: any = [];
  funcionario: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarFuncionario()

    this.funcao = [
      { label: 'Gerente', value: 'gerente' },
      { label: 'Balconista', value: 'balconista' },
      { label: 'Vendedor', value: 'vendedor' },
      { label: 'Recursos Humanos', value: 'RH' },
    ];
  }

  limparCampos() {
    this.funcionario = {
      _id: '',
      nome: '',
      funcao: '',
      salario: 0,
    }
  }

  pesquisarFuncionario() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/funcionarios`)
      .subscribe(resultado => this.funcionarios = resultado);
  }

  criarFuncionario() {
    this.putOrPost = false;
    this.submetido = false;
    this.funcionarioDialogo = true;
  }

  editFuncionario(funcionario) {
    this.putOrPost = true;
    this.funcionarioDialogo = true;

    this.funcionario._id = funcionario._id
    this.funcionario.nome = funcionario.nome
    this.funcionario.funcao = funcionario.funcao
    this.funcionario.salario = funcionario.salario
  }

  deleteFuncionario(funcionario) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/funcionarios/${funcionario._id}`)
          .subscribe(
            resultado => {
              this.pesquisarFuncionario();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Funcionario Removido!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.funcionarioDialogo = false;
    this.submetido = false;
  }

  saveFuncionario() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.funcionario);

    if (this.funcionario.nome !== '') {
      if (this.putOrPost) {
        const { _id } = this.funcionario

        this.http.put<any>(`http://localhost:4000/funcionarios/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarFuncionario();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Funcionario Atualizado!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/funcionarios', body, { headers })
          .subscribe(() => {
            this.pesquisarFuncionario();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Funcionario Criado!', life: 3000 });
      }
    }
  }
}