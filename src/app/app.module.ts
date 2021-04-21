import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Items } from '../mocks/providers/items';
import { Settings, User, Api,AutosearchmodelProvider } from '../providers';
import { Menu} from '../providers/menu/menu';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import{ CommonPageApi } from '../providers/common/common_page_api' ;
import{ TemplesPage} from '../pages/temples/temples';
import{ ServicedetailPage } from'../pages/servicedetail/servicedetail'
import{MycartPage} from'../pages/mycart/mycart'
import{ MantrajaapPage} from '../pages/mantrajaap/mantrajaap'
import { NativeAudio } from '@ionic-native/native-audio';
import {ModalPage} from '../pages/modal/modal';
import { Push } from '@ionic-native/push';
import { CategoriesPage} from '../pages/categories/categories';
import { DatePicker } from '@ionic-native/date-picker';
import { CartListDetailPage } from '../pages/cart-list-detail/cart-list-detail';

import {SearchmodelPage} from '../pages/searchmodel/searchmodel';
import {CartModalPage} from '../pages/cart-modal/cart-modal'
import {ChangePassPage} from '../pages/change-pass/change-pass';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import {IonTagsInputModule} from "ionic-tags-input";
import { GooglePlus } from '@ionic-native/google-plus';
import { Ng2CompleterModule } from "ng2-completer";
//import { Facebook } from '@ionic-native/facebook';
import { ProviderPhotoProvider } from '../providers/provider-photo/provider-photo';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import{ GalleryPage } from '../pages/gallery/gallery';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { PayPal } from '@ionic-native/paypal';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CartModalserviceProvider } from '../providers/cart-modalservice/cart-modalservice';
//import { from } from 'rxjs/observable/from';
//import { ScrollHideDirective } from '../providers/user/scroll-hide';
//import { AppUpdate } from '@ionic-native/app-update';
  //import { from } from 'rxjs/observable/from';
  import { AppVersion } from '@ionic-native/app-version';



// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
import { ThemeableBrowser } from '@ionic-native/themeable-browser';

import { AppAvailability } from '@ionic-native/app-availability';

import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ExcelProvider } from '../providers/excel/excel';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
  
} from 'angularx-social-login';
//FacebookLoginProvider,
//AmazonLoginProvider,
import { YoutubechainalPage } from '../pages/youtubechainal/youtubechainal';
import { DonationModelPage } from '../pages/donation-model/donation-model';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });

}
@NgModule({
  declarations: [
    MyApp,
    //ScrollHideDirective
    ModalPage,YoutubechainalPage,DonationModelPage,SearchmodelPage,CategoriesPage,ChangePassPage,CartModalPage,CartListDetailPage
  ],
  imports: [
   
    BrowserModule,
    HttpClientModule,
    IonTagsInputModule,
    AutoCompleteModule,
    SocialLoginModule,
    Ng2CompleterModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {navExitApp: false, rippleEffect: false,
      mode: 'md'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalPage,
    YoutubechainalPage,
    CategoriesPage,
    CartListDetailPage,
    DonationModelPage,
    SearchmodelPage,ChangePassPage,CartModalPage
  ],
  providers: [
    Api,
    Items,
    Push,
    GooglePlus,
    DatePicker,
    LocalNotifications,
   // Facebook,
    File,
    ThemeableBrowser,
    AppVersion,
    //AppUpdate,
    FileOpener,
    FileChooser,
    AppAvailability,
    PayPal,
    InAppBrowser,
    QRScanner,
    PhotoViewer, 
    User,AutosearchmodelProvider,
    Menu,
    CommonPageApi,
    YoutubeVideoPlayer,
  Contacts,
  Geolocation,
  
  NativeGeocoder,
  SocialSharing,
  GalleryPage,
  MantrajaapPage,
    Camera,
    FileTransfer,
    FilePath,
    ServicedetailPage,
    UniqueDeviceID,
    SplashScreen,
    TemplesPage,
    MycartPage,
    Calendar,
    StatusBar,
    NativeAudio,
    {//web use  google login
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '945063541613-fmapgkf9reiqsaa0jof0otdja73eo10o.apps.googleusercontent.com'
            ),
          },
          
        ],
      } as SocialAuthServiceConfig,
    },

    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProviderPhotoProvider,
    CartModalserviceProvider,
    ExcelProvider,
    
  ]
})

export class AppModule { }
