import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';
import { BehaviorSubject } from 'rxjs';
/*
  *Use for Geolocation
 */
import { Geolocation } from '@ionic-native/geolocation';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LoadingController } from 'ionic-angular';
 
//Geocoder configuration

/**
  * end Geolocation block
  */
 



const TOKEN_KEY = 'userNamefotoken';
const USERNAME='';
//const RECRNTACTIVITY='recentActivity'
const EMAIL_TOKEN_KEY = 'userEmailfotoken';
const LANG='lang';
const USER_ID_TOKEN_KEY='ID';
const ROLE_ID_TOKEN_KEY='DARSHANUSER';
const CLIENTID='CLIENTID6';
const GOOGLE_ACCESS_TOKEN='GOOGLE_ACCESS_TOKEN';
const APPID='DARSHANAPP';
const SINGAL_TEMPLE_ID='SINGAL_TEMPLE_ID';
const ISLOGINCOUNTER='islogincounter';/// Use for after login select lang.
const USERPHONE='ContactNumber';
//--------- for production 
//const IMAGELOCATION='https://motleystack.com/';
//const WISHLISTIMAGE='https://motleystack.com/darshancart/admin_area/product_images/';

//---------------for UAT
const IMAGELOCATION='https://motleystack.com/darshanapp_common_dev/'; //---------------for UAT
const WISHLISTIMAGE='https://motleystack.com/darshanapp_common_dev/darshancart/admin_area/product_images/';


//const IMAGELOCATION='https://motleystack.com/dershan_dev/'; //---------------for UAT
//const WISHLISTIMAGE='https://motleystack.com/dershan_dev/darshancart/admin_area/product_images/';//---------------for UAT SAIE


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */


@Injectable()
export class User {
  _user: any;
  authenticationState = new BehaviorSubject(false);
  TOKEN_KEY:string = TOKEN_KEY;
  EMAIL_TOKEN_KEY:string= EMAIL_TOKEN_KEY;
  LANG:string=LANG;
  USER_ID_TOKEN_KEY:string=USER_ID_TOKEN_KEY;
  ROLE_ID_TOKEN_KEY:string=ROLE_ID_TOKEN_KEY;
  CLIENTID: string=CLIENTID;
  SINGAL_TEMPLE_ID: string=SINGAL_TEMPLE_ID;
  GOOGLE_ACCESS_TOKEN:string=GOOGLE_ACCESS_TOKEN
  APPID: string=APPID;
  USERNAME:string=USERNAME;
  recentActivity:any[]=[];
  USERPHONE:string=USERPHONE;
  ISLOGINCOUNTER:string=ISLOGINCOUNTER;
  IMAGELOCATION: string=IMAGELOCATION;
  WISHLISTIMAGE:string=WISHLISTIMAGE;
  donateobj:{ 
          email:string,
          userid:string,
          username:string, 
          ItemDetails:string,
          Amount :string,
          Currency:string,
          Remarks:string,
          ConfirmationBox :string,
          templeid:string,
          templeName:string,
          serviceid:string,
          serviceNmae:string,
          eventid:string,
          eventName:string,
          sponsorshipID:string,
          productInfo:any[]
        }={
          email:'',
          userid:'',
          username:'', 
          ItemDetails:'',
          Amount:'',
          Currency:'',
          Remarks:'',
          ConfirmationBox:'',
          templeid:'',
          templeName:'',
          serviceid:'',
          serviceNmae:'',
          eventid:'',
          eventName:'',
          sponsorshipID:'',
          productInfo:[]
        };

        
  geoencoderOptionsLocater: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  loading: any;
  //recentActivity: any;

  
  constructor(public loadingCtrl: LoadingController,private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,private storage: Storage, public api: Api) { 
    this.checkToken();
  }
  getlatlong(){
    let latlongobj: {lat:number,lon:number}={
      lat: null,
      lon:null
    }
    return this.geolocation.getCurrentPosition().then((resp) => {
      console.log('~~~~~~latitude~~~~~',resp.coords.latitude) ;
      console.log('```longitude```',resp.coords.longitude) ;
      latlongobj.lat=resp.coords.latitude;
      latlongobj.lon=resp.coords.longitude;
      return latlongobj;
    })
  }
  // publicUnpublishMethod(tempobj){
  //   // let seq = this.api.post('getsubscribedtemple.php',tempobj).share();
  //   // seq.subscribe((res: any) => {
  //   //   return res;
  //   // })
  //   // return seq;
  // }
  scribedfunction(userinfo){
    let seq = this.api.post('getsubscribedtemple.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

testapi(){
  let seq = this.api.testapi().share();
  seq.subscribe((res: any) => {
    return res;
  })
  return seq;
}

  getDef_Currency(userinfo){
    let seq = this.api.post('get_def_currency.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  gettempleserviceByTemple(userinfo){
    let seq = this.api.post('gettempleservicebyadmin.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  gettempleeventByTemple(userinfo){
    let seq = this.api.post('gettempleeventsbyadmin.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_all_strming_schedule(userinfo){
    let seq = this.api.facebookapi_get('get_all_strming_scheduled_api.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  get_service_event_option(userinfo){
    let seq = this.api.post('get_service_event_option.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_fb_strming(userinfo){
    let seq = this.api.post('get_live_fb_video.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  
  gettempleeventByTemple_by_lang(userinfo){
    let seq = this.api.post('gettempleeventsbyadmin_By_lang.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  delete_time_id(userinfo){
    let seq = this.api.post('deleteeventstime.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  add_Self_recordin_MyFamily(userinfo){
    let seq = this.api.post('add_Self_recordin_MyFamily.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  update_user_app_version(userinfo){
    let seq = this.api.post('update_user_app_version.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }


  get_yt_shedule_list(userinfo){
    let seq = this.api.post('get_yt_shedule_list.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  
  
  gettempleservice_By_lang(userinfo){
    let seq = this.api.post('gettempleservice_By_lang.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_service_video(userinfo){
    let seq = this.api.post('get_service_video.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_event_video(userinfo){
    let seq = this.api.post('get_event_video.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  gettemplateImageByTEMPLATEID(userinfo){
    let seq = this.api.post('gettemplateImageByID.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_Temple_By_ID_lang(tempobj){
    let seq = this.api.post('get_Temple_By_ID_lang.php',tempobj).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  gettempleeventsby_lang_admin(tempobj){
    let seq = this.api.post('gettempleeventsby_lang_admin.php',tempobj).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  gettempleserviceby_lang_admin(tempobj){
    let seq = this.api.post('gettempleserviceby_lang_admin.php',tempobj).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  templeservicepdate(userinfo){
    let seq = this.api.post('updatetempleservicemain.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }  

  getAppUrl(accountInfo: any) {
    let seq = this.api.post('getappurl.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the update Profile
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  get_my_notification(userinfo){
    let seq = this.api.post('get_my_notification.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  getCultural_Event_donation_list_by_id(userinfo){
    let seq = this.api.post('getCultural_Event_donation_list_by_id.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  get_FB_Stream_Scheduled(userinfo){
    let seq = this.api.post('get_FB_Stream_Scheduled.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_my_notification_template(userinfo){
    let seq = this.api.post('get_Devotee_notification_template.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  get_Devotee_notification(userinfo){
    let seq = this.api.post('get_Devotee_notification.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  deleteMyNotification(userinfo){
    let seq = this.api.post('deleteNotification.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }


  templeeventupdate(userinfo){
    let seq = this.api.post('updateeventsmain.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getgal(userinfo){
    let seq = this.api.post('getgalleryimagebytemple.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getServiceTypeDashboard(userinfo){
    let seq = this.api.post('getServiceTypeDashboard.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getservicetiming(userinfo){
    let seq = this.api.post('getservicetiming.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  geteventtiming(userinfo){
    let seq = this.api.post('geteventtimelistbyeventid.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getgettemplebyadmin(userinfo){
    let seq = this.api.post('gettemplebyadmin.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }


  getgettemplebyadmin_new(userinfo){
    let seq = this.api.post('gettempleby_admin.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getMyTemplesDashboard(userinfo){
    let seq = this.api.post('getMyTemplesDashboard.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getTempleseventDashboard(userinfo){
    let seq = this.api.post('getmytempleeventsdashboard.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  inserttempleservice(userinfo){
    let seq = this.api.post('inserttempleservice.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  inserttempleevent(userinfo){
    let seq = this.api.post('inserttempleevents.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }

  submittpopulartemples(userinfo){
    let seq = this.api.post('inserttemple.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  insert__user_activity_of_t_and_c(userinfo){
    let seq = this.api.post('insert__user_activity_of_t_and_c.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getpopulartemples(userinfo){
    let seq = this.api.post('getpopulartemples.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
  getNotification(userinfo){
    let seq = this.api.post('getusernotification.php',userinfo).share();
    seq.subscribe((res: any) => {
      return res;
    })
    return seq;
  }
getgeolocation(){
  //--------------------------
let locationname: any;
  return this.geolocation.getCurrentPosition().then((resp) => {
    console.log('~~~~~~latitude~~~~~',resp.coords.latitude) ;
    console.log('```latitude```',resp.coords.longitude) ;
     //this.longt =resp.coords.longitude;
     //geocoder method to fetch address from coordinates passed as arguments
     return this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, this.geoencoderOptionsLocater)
        .then((result: NativeGeocoderReverseResult[]) => {
          
          console.log(' address getting location',JSON.stringify(result[0]));
          
          return locationname=result[0].locality;
        })
        .catch((error: any) => {
          console.log('Error getting location'+ JSON.stringify(error));
          return locationname=JSON.stringify(error);
        });
     }).catch((error) => {
     console.log('Error getting location', error);
     });
     
     
   //---------------------------
}
  geoencoderOptions(latitude: number, longitude: number, geoencoderOptions: any) {
    throw new Error("Method not implemented.");
  }
  
  checkToken() {
    
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.USERNAME=res;
          console.log("~~~~~~~token~~~~~~~~~~~~~~~"+JSON.stringify(res));
        this.authenticationState.next(true);
        return  this.USERNAME;
      }else{
        return this.USERNAME;
      }
    })
    return this.USERNAME;
  }
  gelocaldata(token_name:any){
    //this.storage.set(token_name,'English')
    return this.storage.get(token_name).then(res => {
      if (res) {
          console.log("~~~~~~~~~~~~~~~~~~~~~~"+JSON.stringify(res));
        this.authenticationState.next(true);
        return res;
      }
    })
          
  }
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */


  login(accountInfo: any) {
    let seq = this.api.post('getuserdetails.php',accountInfo).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
        
        return this.storage.set(TOKEN_KEY, res.user.UserName).then(() => {
          this.storage.set('cartAdmin',res.user);
          this.storage.set(EMAIL_TOKEN_KEY, res.user.EmailAddress);
          this.storage.set(LANG,res.user.lang);
          this.storage.set(USER_ID_TOKEN_KEY, res.user.ID);
          this.storage.set(ROLE_ID_TOKEN_KEY,res.user.roleid);
          this.storage.set('User_role',res.user.user_role);
          this.storage.set(USERPHONE,res.user.ContactNumber);
          this.authenticationState.next(true);
        });
      } else {
        console.error('ERROR', res.status);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {

    this.storage.get('registrationId').then(data=>{
      accountInfo.DeviceID=data;
    });  
    let seq = this.api.post('insertuser.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  youtubeSubscribe(accountInfo: any){
    let seq = this.api.post('youtubeSubscribe.php',accountInfo).share();

    seq.subscribe((res: any) => {})
  }

  updateProfileServ(accountInfo: any) {
    let seq = this.api.post('updateuser.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the update Profile
      if (res.status == 'success') {
        this._loggedIn(res);
        this._loggedIn(res);
       
        return this.storage.set(TOKEN_KEY, accountInfo.username).then(() => {
          this.storage.set(EMAIL_TOKEN_KEY, accountInfo.email);
          this.authenticationState.next(true);})
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

 
  getUserProfile(accountInfo: any) {
    let seq = this.api.post('getUserProfile.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the update Profile
      if (res.status == 'success') {
        this._loggedIn(res);
        this._loggedIn(res);
       
        return this.storage.set(TOKEN_KEY, accountInfo.username).then(() => {
          this.storage.set(EMAIL_TOKEN_KEY, accountInfo.email);
          this.authenticationState.next(true);})
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  get_thirdparty_clientID(accountInfo: any) {
    let seq = this.api.post('get_client_id.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the update Profile
      if (res.status == 'success') {
        this._loggedIn(res);
        this._loggedIn(res);
       
        return this.storage.set(TOKEN_KEY, accountInfo.username).then(() => {
          this.storage.set(EMAIL_TOKEN_KEY, accountInfo.email);
          this.authenticationState.next(true);})
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  getreport_volunteeringList(accountInfo: any) {
    let seq = this.api.post('report_volunteeringList.php',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the update Profile
      if (res.status == 'success') {
        this._loggedIn(res);
        this._loggedIn(res);
       
        return this.storage.set(TOKEN_KEY, accountInfo.username).then(() => {
          this.storage.set(EMAIL_TOKEN_KEY, accountInfo.email);
          this.authenticationState.next(true);})
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove(EMAIL_TOKEN_KEY);
      this.storage.remove(LANG);
      this.storage.remove(USER_ID_TOKEN_KEY);
      this.storage.remove(ROLE_ID_TOKEN_KEY);
      this.storage.remove(USERPHONE);
      this.storage.remove('User_role');
      //this.storage.remove(ISLOGINCOUNTER);
     // this.storage.clear();
      this.authenticationState.next(true);
    });
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  goingToLiveonFB(userinfo:any)
    { 
      let temp = this.api.post('FB_Stream_push.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }

    copy_event(accountinfo:any){
      
      let temp = this.api.post('copy_event.php',accountinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }
    get_adsobj(userinfo:any)
    { 
      let temp = this.api.post('get_adds.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }
    get_menu_for_user(userinfo:any)
    { 
      let temp = this.api.post('get_menu_for_user.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }

    get_search_result(userinfo:any)
    { 
     
      let temp = this.api.post('getSearchDetails1.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
          let tempobj=this.api.post('insertSearchKey.php',userinfo).share();
          tempobj.subscribe((res: any) => {})
       })
      return temp;
    }

    
    getTeamByTempleID(userinfo:any)
    { 
      let temp = this.api.post('getteambytemple.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }
    
    getmp3(userinfo:any)
    { 
      let temp = this.api.post('get_mp3_file.php',userinfo).share();
       temp.subscribe((res: any) => {
          temp=res;
       })
      return temp;
    }



  getSearchConfig(accountinfo:any){
    let seq = this.api.post('getconfigdata.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }

  getFacebookConfig(accountinfo:any){
    let seq = this.api.post('getFacebookdetail_by_temple.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }

  send_notification_on_fb_live(accountinfo:any){
    let seq = this.api.facebookapi_get('get_live_video_information.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      // if (res.status == 'success') {
      //   this._loggedIn(res);
      // }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  getreport_Menu(accountinfo:any){
    let seq = this.api.post('report_Menu.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  get_Devotee_family(accountinfo:any){
    let seq = this.api.post('get_Devotee_family.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  send_Devotee_Notification(accountinfo){
    
    let seq = this.api.post('send_Devotee_Notification.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  insertMyfamily(accountinfo:any){
    let seq = this.api.post('insertMyfamily.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  deleteMyTemplate(accountinfo){
    let seq = this.api.post('delete_Template.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  updatefamliyMamber(accountinfo:any){
    let seq = this.api.post('updateFamilyDetail.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  getMytemplate(accountinfo:any){
    let seq = this.api.post('getTemplate.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }




  getMyFamily(accountinfo:any){
    let seq = this.api.post('getMyFamily.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  deleteMyFamily(accountinfo:any){
    let seq = this.api.post('deleteMyfamily.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  sendNotification(accountinfo:any){
    let seq = this.api.post('push.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }  
  
  
  delete_pay_url(accountinfo:any){
    let seq = this.api.post('delete_pay_url.php',accountinfo).share();
  
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
    
  }
update_pay_url(accountinfo:any){
  let seq = this.api.post('update_pay_url.php',accountinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.error('ERROR', err);
  });
  return seq;
  
}
  getpaymentdetailsByUserID(accountinfo:any){
    let seq = this.api.post('getpaymentdetails.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
    
  }
  sponsorshiplist(accountinfo:any){
    let seq = this.api.post('geteventsponsorship.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  sponsorshiplistAdd(accountinfo:any){
    let seq = this.api.post('inserteventsponsorship.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  deletesponsorship(accountinfo){
    let seq = this.api.post('deletesponsorship.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  updatesponsorship(accountinfo){
    let seq = this.api.post('updateeventsponsorship.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  //Today's calendar
  getTodaycalender(accountinfo){
    let seq = this.api.post('getlunardetails.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  getTempleIDByshortName(accountinfo){
    let seq = this.api.post('get_templeID_by_shot.php',accountinfo).share();
    seq.subscribe((res: any) => {
      seq=res;
   })
  return seq;
   
  }
  getSicialShareConfig(accountinfo:any){
    let seq = this.api.post('social_config.php',accountinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
    
  }
  useraddToCart(cartobj:any){
    let temarray:any;
    //this.storage.remove('cartobj[0]');
    //this.storage.remove('cartobj');
    this.gelocaldata('cartobj').then(data=>{
      console.log('0000-----------000000',data);
      temarray=data;
    },err => {
      //temarray=cartobj;
    });
    console.log('0000000000',JSON.stringify(cartobj)+','+JSON.stringify(temarray));
      this.storage.set('cartobj', temarray);
          return true;
  }




getnearbyTempleforgoogleMap(data){
  
    
    //let userlatlong:{type:string,km:number,lat:number,lon:number}={type:'temple',km:20,lat:data.lat,lon:data.lon}
    let userlatlong:{type:string,km:number,lat:number,lon:number}={type:'temple',km:20,lat:-33.737885,lon:151.235260}
    let temp = this.api.post('gettemplesinradius.php',userlatlong).share();
    temp.subscribe((res: any) => {
       temp=res;
    })
   return temp;
  
}
templeupdate(userinfo:any){
   
    let seq = this.api.post('updatetemplemaindetails.php',userinfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.log('ERROR', err);
    });

    return seq;
     

}



updateservicetiming(userinfo){
  
  let seq = this.api.post('updateservicetiming.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
updateEventtiming(userinfo){
  
  let seq = this.api.post('updateeventstiming.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}

addEventtimingbyeventID(userinfo){
  
  let seq = this.api.post('inserteventtimingbyeventid.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
addServicetimengbyeventID(userinfo){
  
  let seq = this.api.post('insertservicetimebyserviceid.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}




getserviceimages(userinfo){
  
  let seq = this.api.post('getserviceimages.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
geteventimages(userinfo){
  
  let seq = this.api.post('geteventsimage.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}



templeaddressupdate(userinfo){
  
  let seq = this.api.post('updatetempleaddress.php',userinfo).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
templedeactive(userinfo){
 
  let temp = this.api.post('deactivatetemple.php',userinfo).share();
   temp.subscribe((res: any) => {
      temp=res;
   })
  return temp;
}
DeleteTempleService(userinfo){
 
  let temp = this.api.post('DeleteTemple_Service_by_s_id.php',userinfo).share();
   temp.subscribe((res: any) => {
      temp=res;
   })
  return temp;
}
eventdeactive(userinfo){
 
  let temp = this.api.post('DeleteTempleEvent.php',userinfo).share();
   temp.subscribe((res: any) => {
      temp=res;
   })
  return temp;
}
paypalrespo(userinfo){ 
  let temp = this.api.post('insertpaymenttransactions.php',userinfo).share();
   temp.subscribe((res: any) => {
      temp=res;
   })
  return temp;
}
payMentDetailBYpaymentID(userinfo){
 
  let temp = this.api.post('gettransactiondetails.php',userinfo).share();
   temp.subscribe((res: any) => {
      temp=res;
   })
  return temp;
}


removelocaldata(keyName:any){
  this.storage.remove(keyName);
}
setlocaldata(keyName:any ,keyval:any){
  if (this.storage.get(keyName) === null) { //check kye name iskeyName 
   this.removelocaldata(keyName);
  }
  this.storage.set(keyName,keyval);
}

 
addtempleimagebytempID_imgID(imginfoobj:any)
{
  let seq = this.api.post('inserttempleimage.php',imginfoobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
addserviceimagebytempID_imgID(imginfoobj:any)
{
  let seq = this.api.post('insertserviceimg.php',imginfoobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
addeventimagebytempID_imgID(imginfoobj:any)
{
  let seq = this.api.post('inserteventsimage.php',imginfoobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
presentLoadingCustom() {
  
  this.loading = this.loadingCtrl.create({
    spinner: 'hide',
    content: `
      <div class="custom-spinner-container" style="text-align: center;">
      <img src="assets/icon/bell2.gif" alt="Smiley face" class="loader">
    
       
      </div>`
  });
  //let alreadyDismissed = false;
  
  this.loading.present();

    //alreadyDismissed = true;
}


loaderdismiss(){
  if(this.loading){ 
    
    
  this.loading.dismiss(() => {
    
    console.log('Dismissed loading');
  });
    
    this.loading = null; 
  }
  // this.loading.dismiss(() => {
    
  //   console.log('Dismissed loading');
  // });
 
}


deleteserviceimage(templeobj){
  let seq = this.api.post('deleteserviceimage.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}

deleteEventimage(templeobj){
  let seq = this.api.post('deleteeventsimage.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}

deletetempleimages(templeobj){
  let seq = this.api.post('deletetempleimage.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
gettempleimages(templeobj){
  let seq = this.api.post('gettempleimages.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
gettempleaddressdetails(templeobj){
  let seq = this.api.post('gettempleaddressdetails.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}
get_temple_tine_zone(templeobj){
  
  let seq = this.api.post('get_temple_tine_zone.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });
  return seq;


}
get_t_e_payment_url(templeobj){
  
  let seq = this.api.post('get_t_e_payment_url.php',templeobj).share();

  seq.subscribe((res: any) => {
    // If the API returned a successful response, mark the user as logged in
    if (res.status == 'success') {
      this._loggedIn(res);
    }
  }, err => {
    console.log('ERROR', err);
  });

  return seq;
}


uploadOnGoogleDrive(file){
  debugger;
  //const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`;
  this.gelocaldata(this.GOOGLE_ACCESS_TOKEN).then(data=>{
    const accessToken=data;
    //googleDrive(accessToken,file)
    //const accessToken="ya29.a0AfH6SMCv6usp9Wx-3XiVULsR-Lnxe-Y8m0ZPjOw3RuXdXV0FI1VkilxvyxI_ba5gtJfjr-_hr5PEZ3e8noISxmldv17YHWyiLqfSof5l-ib9Yl3nqfSj-EWnomBP0HU7lvi-mZr__4BPr5KEHGxG0QYDUeyEuyhldiQJ";
        this.api.googleDrive(accessToken,file)

  });
  

}

}
