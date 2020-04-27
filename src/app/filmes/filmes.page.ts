import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {

  public title: string = "Lista de Filmes"
  public favoritos;
  public linkImagem = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
  mostrarTrailer = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.favoritos = JSON.parse(localStorage.getItem("favoritos"));
  }

  remover(obj) {
    this.favoritos.splice(this.favoritos.indexOf(obj), 1);
  }

  async buscarTrailer({ id ,name, title }) {
    let dados;
    if(name == undefined) {
      dados = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR`);
    } else {
      dados = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR`);
    }
    dados.data.results.forEach(video => {
      if(video.type == 'Trailer'){
        this.mostrarTrailer = true;
        let div = document.getElementById(id);
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
