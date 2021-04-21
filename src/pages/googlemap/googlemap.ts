import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user'



/**
 * 
 * Generated class for the GooglemapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-googlemap',
  templateUrl: 'googlemap.html',
})
export class GooglemapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public user:User) {
  }

  ionViewDidLoad() {
      let pginfo=this.navParams.get('pageinfo');
      if(pginfo){
console.log(pginfo);
      }
     this.user.getlatlong().then(data=>{
       debugger;
      this.user.getnearbyTempleforgoogleMap(data).subscribe((data)=>{
        console.log(data);
        this.loadMap(data);
      });
    })    
    console.log('ionViewDidLoad GooglemapPage');
    
  }
  loadMap(nearbyMetemple){
    let locations=[];
    nearbyMetemple.forEach(element => {
      locations.push(["<b >"+element.TempleName+"</b>"+"<br>"+element.ShortDesc+"<br><br> Contact Person: "+element.contactperson+"<br> Contact No: "+element.contactno+"<br> Email: "+element.contactemail,element.lati,element.longi]);
    });

    let latLng = new google.maps.LatLng(nearbyMetemple[0].lati,  nearbyMetemple[0].longi);
    const icon = {
      url: 'assets/icon/temple.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    let mapOptions = {
      center: latLng,
      zoom: 15,
     
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    debugger;
    // var locations = [      
    //   // ['T 1',11.884443099999999, 77.5827401],
    //   // ['T2', 13.884443099999999, 77.5827401],
    //   [nearbyMetemple[0].TempleName, nearbyMetemple[0].lati,  nearbyMetemple[0].longi]
    // ];
    
    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: this.map,
        icon: icon, //custom image
      });
    
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    


    }

    //this.addMarker();
  }
  alertmsg(){
    alert();
  }
}
