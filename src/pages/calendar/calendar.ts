import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * 
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
date: any;
daysInThisMonth: any;
daysInLastMonth: any;
daysInNextMonth: any;
monthNames: string[]=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
currentMonth: any;
currentYear: any;
currentDate: any;

selectedEvent: any;
isSelected: any;
event = { title: "test", location: "test", message: "test", startDate: "2002/02/20", endDate: "2002/02/20" };
  eventList: any[];
  constructor(public localNotifications: LocalNotifications,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
   
    private calendar: Calendar) {
    this.date= new Date();
    
  }
  
  ionViewDidLoad() {
    alert(JSON.stringify({at: new Date(new Date().getTime())}));
    console.log('ionViewDidLoad CalendarPage');
    this.getDaysOfMonth();
    this.eventList = [ { title: "test", location: "test", message: "test", startDate: "2020-2-20 00:00:00", endDate: "2020-2-21 00:00:00" },{ title: "test1", location: "test", message: "test", startDate: "2020-2-19 00:00:00", endDate: "2020-2-21 00:00:00" }];
    //var Date=new Date();
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      led: 'FF0000',
      sound: null,
      trigger: {at: new Date(new Date().getTime())}
   });

  }
  addEvent() {
    this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  getDaysOfMonth() {
    debugger;
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var p = 0; p < thisNumOfDays; p++) {
      this.daysInThisMonth.push(p+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    //var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }
  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }
  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }





// -----------------------------------------------

loadEventThisMonth() {
  
  var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  var endDate = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0);
  this.calendar.listEventsInRange(startDate, endDate).then(
    (msg) => {
      msg.forEach(item => {
        this.eventList.push(item);
      });
    },
    (err) => {
      console.log(err);
    }
  );
}
checkEvent(day) {
  
  var hasEvent = false;
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
  this.eventList.forEach(event => {
    if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
      hasEvent = true;
    }
  });
  return hasEvent;
}
selectDate(day) {
  this.isSelected = false;
  this.selectedEvent = new Array();
  var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
  var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";
  this.eventList.forEach(event => {
    
    if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
      this.isSelected = true;
      this.selectedEvent.push(event);
    }
  });
}
deleteEvent(evt) {
  // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
  // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
  let alert = this.alertCtrl.create({
    title: 'Confirm Delete',
    message: 'Are you sure want to delete this event?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      
      {
        text: 'Ok',
        handler: () => {
          this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
            (msg) => {
              console.log(msg);
              this.loadEventThisMonth();
              this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
            },
            (err) => {
              console.log(err);
            }
          )
        }
      }
    ]
  });
  alert.present();
}
}
