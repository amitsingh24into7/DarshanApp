import { Component } from '@angular/core';
import { IonicPage,  NavParams, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Api } from '../../providers';
 
@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {

  videos:any  
  constructor(private navParams: NavParams, private ytProvider: Api, private youtube: YoutubeVideoPlayer, private plt: Platform) {
    let listId = this.navParams.get('id');
    let videosTemp = this.ytProvider.getListVideos(listId);
    videosTemp.subscribe(data => {
      this.videos=data;
      debugger;
      console.log(JSON.stringify(this.videos));
      console.log('playlists: ', data);
    }, err => {
     console.log(err);
    })
  }  
  
  openVideo(video) {
    console.log(JSON.stringify(video));
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open('https://www.youtube.com/watch?v='+ video.snippet.resourceId.videoId);
    }
  }
}