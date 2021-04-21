import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Howl} from 'howler';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MantrajaapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface Track{
  play:any,
  paus:any,
  id:number;
  name: string;
  path:string;
}
@IonicPage()
@Component({
  selector: 'page-mantrajaap',
  templateUrl: 'mantrajaap.html',
})

export class MantrajaapPage {
  sound_files:any []=[];
   isPlaying = false;
   mplatfile:any []=[];

  activeTrack: Track=null;
  //player: Howl;

  
  //playlist:Track[];
  soundid: any;
  requestobj: { roleid: any, clientid:string,singleTempleID:string, appid:string,lang:string,userid:string} = {
    singleTempleID:'',
    roleid: '',
    clientid: "",
    appid: "",
    lang:"",
    userid:""
   
  };


  playlist: any;
  constructor( private storage: Storage, public navCtrl: NavController,public user:User, public navParams: NavParams/*,private alertCtrl: AlertController*/) {
   
    this.requestobj.appid=this.user.APPID
    this.requestobj.clientid=this.user.CLIENTID
    this.requestobj.roleid=this.user.ROLE_ID_TOKEN_KEY
    this.storage.get(this.user.SINGAL_TEMPLE_ID).then(res => {
      this.requestobj.singleTempleID=res
      this.storage.get(this.user.USER_ID_TOKEN_KEY).then(userid => {
        this.requestobj.userid=userid;
        this.user.getmp3(this.requestobj).subscribe(data=>{
          this.playlist=data;         
       })
      })
    })
  
  }


playAudio(track:Track){
  track.play='false';
  track.paus='true';

  // if(this.isPlaying){
  //   if( this.sound_files.length>0){
  //     for (let index = 0; index < this.sound_files.length; index++) {
  //       this.sound_files[index].stop();
  //       //this.sound_files[index].unload();
  //       //this.sound_files[index] = null;
  //       this.isPlaying=false;
  //     }
  //   }
    
  //  }


  
  // for (let index = 0; index < playcount; index++) {
    
    

    this.sound_files[0]=(new Howl({
      src:[track.path],
        loop:false
     }))
  //}
  // this.sound_files=new Howl({
  //     src:[track.path],
  //       loop:false
  //    })
  this.sound_files[0].play();
  //  for (var i = 1; i < this.sound_files.length; i++) {
    
    
   
  //     this.sound_files[i].on('end',
  //     (function(i) {
  //       return function() {
  //         this.sound_files[i + 1].play();
  //       }
  //     }(i))
  //   );
    
  //   this.isPlaying=true;
 
  // }
  
  
  // if(sound_files[0].isPlaying())
  // {
  //   sound_files[0].stop();
  // }


  
  }
 
  stopPlayer(btnobj){
    btnobj.play='true';
    btnobj.paus='false';
    for (let index = 0; index < this.sound_files.length; index++) {
            this.sound_files[index].stop();
            //this.sound_files[index].unload();
            //this.sound_files[index] = null;
            this.isPlaying=false;
          }
    // this.player=new Howl({
    //   src:[btnobj.path]
    // });
    //this.sound_files.stop();
    //this.sound_files.pause();
    // this.sound_files.on('pause', function() {
    //   this.player.on('unload', function() {
    //     console.log('uiueiwueiwueiwuie');
    //    // this.player()
    //   })
  //})
  }
  next(){  

  }
  prev(){
  
  }
  seek(){
  
  }
  updateProgress(){
  
  }
  presentPrompt(track:Track) {
    /*let alert = this.alertCtrl.create({
      title: 'Mantra',
      inputs: [
        {
          name: 'jaapcounter',
          placeholder: 'Set counter',
          type:'number'
        },
        // {
        //   name: 'password',
        //   placeholder: 'Password',
        //   type: 'password'
        // }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Play',
          handler: data => {
            if (data.jaapcounter) {
             
              // for (let index = 0; index < data.jaapcounter; index++) {
              //   this.playAudio(track,data.jaapcounter);
                
              // }
              
             this.playAudio(track,data.jaapcounter);
                //this.playAudio(track,data.jaapcounter);
             // console.log(palysts);

              //this.playAudio(track,data.jaapcounter);
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();*/
    this.playAudio(track);
  }


}
