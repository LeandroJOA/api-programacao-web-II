import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

  putOrPost: boolean
  parceiroDialogo: boolean;
  submetido: boolean;
  parceiros: any = [];
  parceiro: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarParceiro()
  }

  limparCampos() {
    this.parceiro = {
      _id: '',
      nome: '',
      telefone: '',
      endereco: '',
    }
  }

  pesquisarParceiro() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/parceiros`)
      .subscribe(resultado => this.parceiros = resultado);
  }

  criarParceiro() {
    this.putOrPost = false;
    this.submetido = false;
    this.parceiroDialogo = true;
  }

  editParceiro(parceiro) {
    this.putOrPost = true;
    this.parceiroDialogo = true;

    this.parceiro._id = parceiro._id
    this.parceiro.nome = parceiro.nome
    this.parceiro.telefone = parceiro.telefone
    this.parceiro.endereco = parceiro.endereco
  }

  deleteParceiro(parceiro) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/parceiros/${parceiro._id}`)
          .subscribe(
            resultado => {
              this.pesquisarParceiro();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parceiro Removido!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.parceiroDialogo = false;
    this.submetido = false;
  }

  saveParceiro() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.parceiro);

    if (this.parceiro.nome !== '') {
      if (this.putOrPost) {
        const { _id } = this.parceiro

        this.http.put<any>(`http://localhost:4000/parceiros/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarParceiro();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parceiro Atualizado!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/parceiros', body, { headers })
          .subscribe(() => {
            this.pesquisarParceiro();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Parceiro Criado!', life: 3000 });
      }
    }
  }
}

