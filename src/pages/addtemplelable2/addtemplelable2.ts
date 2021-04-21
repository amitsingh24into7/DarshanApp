import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
//import { FormGroup } from '@angular/forms';

/**
 * Generated class for the Addtemplelable2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-addtemplelable2',
  templateUrl: 'addtemplelable2.html',
})
export class Addtemplelable2Page {
 
  map: any;
  markers = [];

  public accountlabelobj:{clientid:string, appid:string,templeid:string,address:string,lati:string,longi:string,userid:string}={clientid:'',appid:'',templeid:'',address:'',lati:'',longi:'',userid:''}
  public labledataobj:any[]=[];
 

  public tempstate:any;
  tabBarElement: any;
  isupdate: boolean;
  GoogleAutocomplete: any;
  autocompleteItems: any[];
  autocomplete: { input: string; };
  geocoder: any;
  constructor( public zone: NgZone,public navCtrl: NavController, public navParams: NavParams,public user:User ) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
this.autocomplete = { input: '' };
this.autocompleteItems = [];
   
    
    let updatewithobj:any;
    debugger;
    if(updatewithobj=this.navParams.get('item')){
      debugger;
      this.user.gelocaldata(this.user.USER_ID_TOKEN_KEY).then(data=>{
        this.accountlabelobj.userid=data;
      })      
        this.accountlabelobj.clientid=this.user.CLIENTID;
        this.accountlabelobj.appid=this.user.APPID;
        this.accountlabelobj.templeid=updatewithobj.TempleID;
        
       
        this.isupdate=true;
        
        
    }else{
      this.labledataobj.push(navParams.get('formdata'));

    }
   
    
  }
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }  
  selectSearchResult(item){
    function geocodePosition(pos,parmaccountlabelobj)
      {
        let  geocoder = new google.maps.Geocoder();
         geocoder.geocode
          ({
              latLng: pos
          },
           function(results, status)
              {
                  if (status == google.maps.GeocoderStatus.OK)
                  {
                    this.address = results[0].formatted_address;
                    parmaccountlabelobj.address=results[0].formatted_address;
                    let latlang=JSON.parse(JSON.stringify(results[0].geometry.location));
                    parmaccountlabelobj.lati=latlang.lat;
                    parmaccountlabelobj.longi=latlang.lng;
                    console.log(JSON.stringify( results[0].geometry.location));
                    console.log("Drop Address = "+ results[0].formatted_address);
                    ///alert("Drop Address = "+ results[0].formatted_address);
                    return parmaccountlabelobj;
                    
                  }
                  else
                  {
                      console.log('Cannot determine address at this location.'+ status);
                  }
                 
              }
          );
      }
    this.autocompleteItems = [];
  
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      
      
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        console.log(position);
        debugger;
        this.accountlabelobj.lati=position.lat;
        this.accountlabelobj.longi=position.lng;
        console.log(this.accountlabelobj);
       //this.initializeMap(this.accountlabelobj);
       let marker = new google.maps.Marker({
        position: results[0].geometry.location,
        draggable: true,
        map: this.map,
      });
      this.markers.push(marker);
      
      this.map.setCenter(results[0].geometry.location);

      

  let tempaccountlabelobj=this.accountlabelobj;
   geocodePosition(marker.getPosition(),this.accountlabelobj);
      google.maps.event.addListener(marker, 'dragend', function()
      {
       geocodePosition(marker.getPosition(),tempaccountlabelobj)
       console.log("uuuuuu",tempaccountlabelobj)
      });
      
      }

      
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Addtemplelable2Page');
    this.initializeMap(this.accountlabelobj);
  }
  doFormSubmit(){
    debugger;
    

      if(this.isupdate){
        this.user.templeaddressupdate(this.accountlabelobj).subscribe((respdata)=>{
         
         this.navCtrl.pop();
          
        })
      }else{
        this.user.setlocaldata('addtemplesecondtlabel',this.accountlabelobj);
      this.labledataobj.push(this.accountlabelobj);
      this.navCtrl.push('AddtempleimgePage',{'formdata':this.labledataobj})
      console.log(JSON.stringify(this.labledataobj));
      }     
    
    
  }
  
  
  ionViewWillEnter()
  {
      this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave()
  {
      this.tabBarElement.style.display =null;
  }
  initializeMap(accountlabelobj:any) {
    
    var geocoder;
    let locationOptions = {timeout: 20000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
        (position) => {
         let latlong:any;
           
              latlong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
           
            let Option = {
              center: latlong,
              zoom: 17,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            //let  directionsService = new google.maps.DirectionsService;
            this.map = new google.maps.Map(document.getElementById("map_canvas"), Option);
            var marker = new google.maps.Marker({
              draggable: true,
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: latlong
            });

           geocodePosition(marker.getPosition());
            this.markers.push(marker);
            google.maps.event.addListener(marker, 'dragend', function()
            {
                geocodePosition(marker.getPosition());
            });
            function geocodePosition(pos)
              {
                 geocoder = new google.maps.Geocoder();
                 geocoder.geocode
                  ({
                      latLng: pos
                  },
                      function(results, status)
                      {
                          if (status == google.maps.GeocoderStatus.OK)
                          {
                            this.address = results[0].formatted_address;
                            accountlabelobj.address=results[0].formatted_address;
                            let latlang=JSON.parse(JSON.stringify(results[0].geometry.location));
                            accountlabelobj.lati=latlang.lat;
                            accountlabelobj.longi=latlang.lng;
                            console.log(JSON.stringify( results[0].geometry.location));
                            console.log("Drop Address = "+ results[0].formatted_address);
                           
                            //alert("Drop Address = "+ results[0].formatted_address);
                            return accountlabelobj;
                          }
                          else
                          {
                              console.log('Cannot determine address at this location.'+ status);
                          }
                         // return accountlabelobj;
                      }
                  );
              }
        },
        (error) => {
            console.log(error);
        }, locationOptions
   


  
     ) }
    }


