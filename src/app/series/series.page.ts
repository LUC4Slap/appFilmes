import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  public series;
  public linkImagem = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  urlSeries: string = "https://api.themoviedb.org/3/trending/tv/week?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&append_to_response=videos";
  pesquisa: string = '';
  urlVideos = "https://api.themoviedb.org/3/movie/181812/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR";
  mostrarTrailer = false;
  favoritos= [];

  constructor() { }

  // URLS PARA PESQUISAS FUTURAS
  // PESSOAS -> https://api.themoviedb.org/3/trending/person/week?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&append_to_response=videos
  // OBTER -> https://api.themoviedb.org/3/discover/movie?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1

  ngOnInit() {
    this.chamaApi(this.urlSeries);
  }

  async chamaApi(url) {
    let dados = await axios.get(url);
    this.series = dados.data.results;
    // console.log(this.series);
  }

  async pesquisar() {
    if(this.pesquisa === ''){
      let dados = await axios.get(this.urlSeries);
      this.series = dados.data.results;
    } else {
      this.series = []
      let dados = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&query=${this.pesquisa}`);
      this.series = dados.data.results;
    }
  }

  salvarFilme(obj) {
    this.favoritos.push(obj);
    localStorage.setItem("favoritos", JSON.stringify(this.favoritos));
    alert("Filme inserido na sua lista ;)")
  }

  async buscarTrailer(id, title) {
    let dados = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR`);
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
