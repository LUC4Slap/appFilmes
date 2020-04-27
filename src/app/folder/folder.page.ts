import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string = "Filmes Mais Populares";
  public filmes;
  public linkImagem = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  pesquisa: string = '';
  url: string = "https://api.themoviedb.org/3/trending/movie/week?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&append_to_response=videos";
  favoritos= [];
  urlVideos = "https://api.themoviedb.org/3/movie/181812/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR";
  mostrarTrailer = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.chamaApi(this.url);
  }

  async chamaApi(url) {
    let dados = await axios.get(url);
    this.filmes = dados.data.results;
    // console.log(this.filmes);
  }

  async pesquisar() {
    if(this.pesquisa === ''){
      let dados = await axios.get(this.url);
      this.filmes = dados.data.results;
    } else {
      this.filmes = []
      let dados = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&query=${this.pesquisa}`);
      this.filmes = dados.data.results;
    }
  }

  salvarFilme(obj) {
    this.favoritos.push(obj);
    localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
    alert("Filme inserido na sua lista ;)")
  }

  async buscarTrailer(id, title) {
    let dados = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR`);
    dados.data.results.forEach(video => {
      if(video.type == 'Trailer'){
        this.mostrarTrailer = true;
        let div = document.getElementById(title);
        div.innerHTML = `
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
        `
      }
    });
  }

  fecharTrailer(idElemento){
    let el = document.getElementById(idElemento);
    el.innerHTML = '';
    this.mostrarTrailer = false;
  }

}
