import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JPush } from 'ionic-native-jpush';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private jpush: JPush, private toastCtrl: ToastController) {

  }
  event: any;
  /**
   * 注册事件、注意控制不能多次注册事件
   *
   * @memberof HomePage
   */
  initEvent() {
    console.log("init event")
    // 获取点击通知内容
    this.jpush.onOpenNotification().subscribe(event => {
      this.presentToast('openNotification')
      this.event = event
    }, err => {
      this.presentToast('openNotification-error')
    })
    // 获取通知内容
    this.jpush.onReceiveNotification().subscribe(event => {
      this.presentToast('receiveNotification')
      this.event = event
    }, err => {
      this.presentToast('receiveNotification-error')
    })
    // // 获取自定义消息推送内容
    this.jpush.onReceiveMessage().subscribe(event => {
      this.presentToast('receiveMessage')
      this.event = event
    }, err => {
      this.presentToast('receiveMessage-error')
    })
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
  init() {
    this.jpush.init()
  }
  stopPush() {
    this.jpush.stopPush()
  }
  resumePush() {
    this.jpush.resumePush()
  }
  isPushStoppedResult: number;
  isPushStopped() {
    this.jpush.isPushStopped().then(result => {
      this.isPushStoppedResult = result
    })
  }
  setDebugMode(isDebug) {
    // this.jpush.setDebugMode(isDebug)
  }
  registrationID: string;
  getRegistrationID() {
    this.jpush.getRegistrationID().then(id => {
      this.registrationID = id
    })
  }
  alias: string;
  setAlias(alias) {
    this.jpush.setAlias({ sequence: 1, alias: alias }).then(result => {
      this.presentToast('success')
    }, err => {
      this.presentToast('error')
    })
  }
  deleteAlias() {
    this.jpush.deleteAlias({ sequence: 1 }).then(result => {
      this.presentToast('success')
      this.alias = ''
    }, err => {
      this.presentToast('error')
    })
  }
  getAlias() {
    this.jpush.getAlias({ sequence: 1 }).then(result => {
      this.presentToast('success')
      this.alias = result.alias
    }, err => {
      this.presentToast('error')
    })
  }
  tag: string;
  tags: string[];
  setTags() {
    this.jpush.setTags({ sequence: 2, tags: ['tag1', 'tag2', 'tag3'] }).then(result => {
      this.presentToast('success')
      this.tags = result.tags
    }, err => {
      this.presentToast('error')
    })
  }
  addTags() {
    this.jpush.addTags({ sequence: 2, tags: [this.tag] }).then(result => {
      this.presentToast('success')
      this.getAllTags()
    }, err => {
      this.presentToast('error')
    })
  }
  deleteTags() {
    // this.jpush.deleteTags({ sequence: 2, tags: [this.tag] }).then(result => {
    //   this.presentToast('success')
    //   this.getAllTags()
    // }, err => {
    //   this.presentToast('error')
    // })
  }
  cleanTags() {
    this.jpush.cleanTags({ sequence: 2 }).then(result => {
      this.presentToast('success')
      this.tags = []
    }, err => {
      this.presentToast('error')
    })
  }
  getAllTags() {
    this.jpush.getAllTags({ sequence: 2 }).then(result => {
      this.presentToast('success')
      console.log(JSON.stringify(result))
      this.tags = result.tags || []
    }, err => {
      this.presentToast('error')
    })
  }
  checkTagBindState() {
    this.jpush.checkTagBindState({ sequence: 2, tag: this.tag || 'tag1' }).then(result => {
      console.log('success', result)
      this.presentToast('success')
    }, err => {
      console.log('err', JSON.stringify(err))
      this.presentToast('error')
    })
  }
  userNotificationSettings: number;
  getUserNotificationSettings() {
    this.jpush.getUserNotificationSettings().then(result => {
      this.userNotificationSettings = result
    })
  }

}
