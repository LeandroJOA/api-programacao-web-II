import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  putOrPost: boolean;
  fornecedorDialogo: boolean;
  submetido: boolean;
  fornecedores: any = [];
  fornecedor: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarFornecedor()
  }

  limparCampos() {
    this.fornecedor = {
      _id: '',
      nome: '',
      produto: '',
      valorLote: 0,
    }
  }

  pesquisarFornecedor() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/fornecedores`)
      .subscribe(resultado => this.fornecedores = resultado);
  }

  criarFornecedor() {
    this.putOrPost = false;
    this.submetido = false;
    this.fornecedorDialogo = true;
  }

  editFornecedor(fornecedor) {
    this.putOrPost = true;
    this.fornecedorDialogo = true;

    this.fornecedor._id = fornecedor._id;
    this.fornecedor.nome = fornecedor.nome;
    this.fornecedor.produto = fornecedor.produto;
    this.fornecedor.valorLote = fornecedor.valorLote;
  }

  deleteFornecedor(fornecedor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/fornecedores/${fornecedor._id}`)
          .subscribe(
            resultado => {
              this.pesquisarFornecedor();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Fornecedor Deletado!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.fornecedorDialogo = false;
    this.submetido = false;
  }

  saveFornecedor() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.fornecedor);

    if (this.fornecedor.nome !== '' && this.fornecedor.produto !== '' && this.fornecedor.valorLote !== '') {
      if (this.putOrPost) {
        const { _id } = this.fornecedor

        this.http.put<any>(`http://localhost:4000/fornecedores/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarFornecedor();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Fornecedor Atualizada!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/fornecedores', body, { headers })
          .subscribe(() => {
            this.pesquisarFornecedor();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Fornecedor Criada!', life: 3000 });
      }
    }
  }
}
