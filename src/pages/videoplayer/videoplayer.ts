import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { Api, User } from '../../providers';
import { Observable } from 'rxjs';

/**
 * Generated class for the VideoplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-videoplayer',
  templateUrl: 'videoplayer.html',
})
export class VideoplayerPage {
  videos: Observable<any[]>;
   public channelId = 'UC-54-5MmhBjF_iA6CgIHR-A'; // Devdactic Channel ID
  //public channelId = ''; 
  playlists:any;
  listofarray: any[]=[];
  MyTemples: any;
  constructor(public navCtrl: NavController, private ytProvider: Api, private alertCtrl: AlertController,public user:User) { 
   
    this.user.gelocaldata(this.user.SINGAL_TEMPLE_ID).then(res=>{
      debugger;
      if(res){
        this.user.get_thirdparty_clientID({TempleID:res,col_name:'youtube_channel_id'}).subscribe(resp_foclient=>{
          this.channelId=resp_foclient.youtube_channel_id;
          this.searchPlaylists(resp_foclient.youtube_channel_id)
        })
      }else{

        let getService:{clientid:string,appid:string,userid:string,language:string,singleTempleID:string}={clientid:'',appid:'',userid:'',language:'',singleTempleID:''}
        this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(userid=>{
        getService.clientid=this.user.CLIENTID;
        getService.appid=this.user.APPID;
        getService.userid=userid;
        getService.language="English"    
        this.user.getMyTemplesDashboard(getService).subscribe((data)=>{
          this.MyTemples=data; 
          //let yyi:any
          //yyi=this.getyoutubplaylist( this.MyTemples);
         // this.MyTemples.forEach(function(indexobj) {
           this.getyoutubplaylist( this.MyTemples);
            
         // })
          
        });
      })
      }
      
      
    })
    //this.playlists=this.ytProvider.getPlaylistsForChannel(this.channelId);
  }
 


  
getyoutubplaylist(TempleID){
  
  TempleID.forEach((indexobj) => {
    this.user.get_thirdparty_clientID({TempleID:indexobj.TempleID,col_name:'youtube_channel_id'}).subscribe(resp_foclient=>{
      this.searchPlaylists(resp_foclient.youtube_channel_id)
      //alert("io");
      // this.playlists=this.ytProvider.getPlaylistsForChannel(resp_foclient.youtube_channel_id).subscribe(data => {
      //   //alert("io-++---");
      //   data.forEach.function( (indexobj) => {
      //     //alert("io----");
      //     this.listofarray.push(indexobj);
      //     console.log('playlists: ', indexobj);
      //   })
       
      // }, err => {
      //   console.log(JSON.stringify(err));
      //   let alert = this.alertCtrl.create({
      //     title: 'Error',
      //     message: 'No Playlists found for that Channel ID',
      //     buttons: ['OK']
      //   });
      //   alert.present();
      // })

    })
  })
  //this.MyTemples.forEach(function(indexobj) {
    // return this.user.get_thirdparty_clientID({TempleID:indexobj.TempleID,col_name:'youtube_channel_id'}).subscribe(resp_foclient=>{
    //   //this.channelId.push(resp_foclient.youtube_channel_id);
    //   //this.searchPlaylists(resp_foclient.youtube_channel_id)
    //   return resp_foclient;
    // })
  //})
   
}

  searchPlaylists(channelId) {
    this.playlists=this.ytProvider.getPlaylistsForChannel(channelId)
    
    this.playlists.subscribe(data => {
      data.forEach((indexobj) => {
        this.listofarray.push(indexobj);
        console.log('playlists: ', indexobj);
      })
     
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID',
        buttons: ['OK']
      });
      alert.present();
    })
  } 
  openPlaylist(id) {
    this.navCtrl.push('PlaylistPage', {id: id});
  }

}


