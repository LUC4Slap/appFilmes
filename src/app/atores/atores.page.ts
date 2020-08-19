import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.page.html',
  styleUrls: ['./atores.page.scss'],
})
export class AtoresPage implements OnInit {
  public atores;
  public pesquisa: string;
  public linkImagem = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  url: string = "https://api.themoviedb.org/3/trending/person/week?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&append_to_response=videos";

  //https://api.themoviedb.org/3/search/person?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&query=

  constructor() { }

  ngOnInit() {
    this.chamaApi(this.url);
  }

  async chamaApi(url) {
    let dados = await axios.get(url);
    this.atores = dados.data.results;
  }

  async pesquisar() {
    if(this.pesquisa === ''){
      let dados = await axios.get(this.url);
      this.atores = dados.data.results;
    } else {
      this.atores = []
      let dados = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&query=${this.pesquisa}`);
      this.atores = dados.data.results;
    }
  }

}
