import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  constructor() { }
  public title: string = "Lista de Videos"
  public filmes;
  url: string = "https://api.themoviedb.org/3/trending/movie/week?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR&append_to_response=videos";

  ngOnInit() {
    this.chamaApi(this.url);
  }

  async chamaApi(url) {
    let dados = await axios.get(url);
    this.filmes = dados.data.results;
    const body = await document.querySelector('#videos');
    this.filmes.forEach(async element => {
      let trailes = await axios.get(`https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=ba88f74ce41fc1578a161dfc7f2be00f&language=pt-BR`);
      trailes.data.results.forEach(video => {
        // console.log(video);
        if(video.type == 'Trailer'){
          body.innerHTML += `
          <div class="d-flex" style="margin: 10px 0">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
          </div>
          `
        }
      });
    });
  }

}
