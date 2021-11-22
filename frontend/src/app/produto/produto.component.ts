import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ProdutoComponent implements OnInit {

  putOrPost: boolean
  produtoDialogo: boolean;
  submetido: boolean;
  produtos: any = [];
  tipo: any = [];
  produto: any = {};

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.pesquisarProduto()

    this.tipo = [
      { label: 'Oral', value: 'oral' },
    ];
  }

  limparCampos() {
    this.produto = {
      _id: '',
      nome: '',
      tipo: '',
      preco: 0,
    }
  }

  pesquisarProduto() {
    this.limparCampos();
    this.http.get(`http://localhost:4000/produtos`)
      .subscribe(resultado => this.produtos = resultado);
  }

  criarProduto() {
    this.putOrPost = false;
    this.submetido = false;
    this.produtoDialogo = true;
  }

  editProduto(produto) {
    this.putOrPost = true;
    this.produtoDialogo = true;

    this.produto._id = produto._id
    this.produto.nome = produto.nome
    this.produto.tipo = produto.tipo
    this.produto.preco = produto.preco
  }

  deleteProduto(produto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`http://localhost:4000/produtos/${produto._id}`)
          .subscribe(
            resultado => {
              this.pesquisarProduto();
            }
          );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produto Deletado!', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.limparCampos()
    this.produtoDialogo = false;
    this.submetido = false;
  }

  saveProduto() {
    this.submetido = true;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(this.produto);

    if (this.produto.nome !== '' && this.produto.tipo !== '') {
      if (this.putOrPost) {
        const { _id } = this.produto

        this.http.put<any>(`http://localhost:4000/produtos/${_id}`, body, { headers })
          .subscribe(
            () => {
              this.pesquisarProduto();
            });
        this.hideDialog();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produto Atualizado!', life: 3000 });
      }
      else {
        this.http.post<any>('http://localhost:4000/produtos', body, { headers })
          .subscribe(() => {
            this.pesquisarProduto();
          });
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Produto Criado!', life: 3000 });
      }
    }
  }
}
