import { HttpClient,HttpHeaders , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  //-----------------------------------For prod
   //url: string = 'https://motleystack.com/darshanapp';
   //facebookapi='https://motleystack.com/fb_post';
 //CARTAPI='https://motleystack.com/darshancart/functions';

  ////////////////---------------------For uat
  url: string = 'https://motleystack.com/darshanapp_common_dev/darshanapp';
  facebookapi='https://motleystack.com/darshanapp_common_dev/fb_post';
  CARTAPI='https://motleystack.com/darshanapp_common_dev/darshancart/functions';
  ////////////////---------------------For uat saie
  //url: string = 'https://motleystack.com/dershan_dev/darshanapp';
 // facebookapi='https://motleystack.com/dershan_dev/fb_post';
//CARTAPI='https://motleystack.com/dershan_dev/darshancart/functions';
 // old ---//apiKey:string='AIzaSyChgGoP40LDXPGPvWxkpwztCPm3_4wFq60';
 apiKey:string='AIzaSyDYhOfvqT9U4o6Lo-s5O562cT8LRB7AJcg'; 
 
 constructor(public http: HttpClient) {
  }
   
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }


    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
facebookapi_get(endpoint: string, params?: any, reqOpts?: any){
  if (!reqOpts) {
    reqOpts = {
      params: new HttpParams()
    };
  }

  // Support easy query params for GET requests
  if (params) {
    reqOpts.params = new HttpParams();
    for (let k in params) {
      reqOpts.params = reqOpts.params.set(k, params[k]);
    }
  }
  return this.http.get(this.facebookapi + '/' + endpoint, reqOpts);
}

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }



  testapi( ){


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': 'Basic dG9ueSBnZW5lcmFsdXNlcjpQYXNzdzByZA==' });
  let options = { headers: headers };
    return this.http.post('Https://demo.integrumsystems.com/regression/integrumws.nsf/xp_App.xsp/submitFormV2', {"tempid":"f_rtqf","fields":[{"name":"attachmentFieldId_Lat"},{"name":"attachmentFieldId_Long"},{"name":"formMR","value":"Tony Chen"},{"name":"FormDueComDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS01_RegQuest01"},{"name":"RegQS01_RegText02"},{"name":"RegQS02a_RegQuest02A"},{"name":"RegQS02a_RegText02"},{"name":"RegQS02b_RegQuest02B"},{"name":"RegQS02b_RegText02"},{"name":"RegQS03a_RegQuest03A"},{"name":"RegQS03a_RegText02"},{"name":"RegQS03b_RegQuest03B"},{"name":"RegQS03b_RegText02"},{"name":"RegQS03c_RegQuest03C"},{"name":"RegQS03c_RegText02"},{"name":"RegQS03d_RegQuest03D"},{"name":"RegQS03d_RegText02"},{"name":"RegQS04a_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04b_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04c_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04d_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04f_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04e_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04g_RegDate","value":"2021-03-11T03:48:23+11:00"},{"name":"RegQS04h_RegDate","value":"2021-03-11T03:48:23+11:00"}],"microFiles":[],"formAction":"submit"}, options);
  }

  cart_post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.CARTAPI + '/' + endpoint, body, reqOpts);
    //return this.http.post(endpoint, body, reqOpts);
  }
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  getPlaylistsForChannel(channel) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
    .map((res) => {
    
      //return res.json()['items'];
      return res.items
      
    })
  }
 
  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map((res) => {
      //return res.json()['items'];
      return res.items;
    })
    
  }
  
  
  googleDrive(accessToken,file){
    const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable';
    let headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + accessToken,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Type': file.type ,
  });
debugger;

  //let options = { headers: headers }; // Create a request option
return this.http.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', file, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + accessToken)}).subscribe(data=>{
         let dt = {'name': 'fileName.txt'};
         this.http.patch('https://www.googleapis.com/drive/v3/files/' + data['id'], dt, {headers: new HttpHeaders().set('Authorization', 'Bearer ' + accessToken)}).subscribe((data) => {
           //this.driveFileId = data['id'];
           //this.listProviders.hideLoader();
           //this.listProviders.presentToast('Your data successfully uploded to Google Drive');
         }, (err)=>{
           console.log(err);
           //this.listProviders.hideLoader();
         })
       }, (err)=> {
         console.log(err);
        // this.listProviders.hideLoader();
       })



  
  // return this.http.post(`${url}`, file, options) //call proper resumable upload endpoint and pass just file as body
  //     .toPromise()

  }

}

