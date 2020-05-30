import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InfoPageComponent} from '../info-page/info-page.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})

export class AuthButtonComponent implements OnInit {

  constructor() {

      // function jsonp(url, callback) {
      //   let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      //   window[callbackName] = function(data) {
      //     delete window[callbackName];
      //     document.body.removeChild(script);
      //     callback(data);
      //   };
      //
      //   let script = document.createElement('script');
      //   script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
      //   document.body.appendChild(script);
      // }

      // jsonp('https://oauth.vk.com/access_token?client_id=7490396&client_secret=XmHyFSkMDm7kDvaXOfEF&code=' + code + '&redirect_uri=http://localhost:4200/',
      //   function(response) {
      //     console.log(response);
      //   });
      // $.ajax({
      //     url: 'https://oauth.vk.com/access_token?client_id=7490396&client_secret=XmHyFSkMDm7kDvaXOfEF&code=' + code + '&redirect_uri=http://localhost:4200/',
      //     method: 'GET',
      //     dataType: 'JSONP',
      //     success: function(data) {
      //       console.log(data);
      //     }
      //   }
      // );
      // {
      //   params: {
      //     client_id: '7490396',s
      //     client_secret: 'XmHyFSkMDm7kDvaXOfEF',
      //     redirect_uri: 'http://localhost:4200/',
      //     'code': code,
      //   }
      // }).subscribe(res => {
      //   console.log(res)
      // });
  }

  ngOnInit(): void {
  }

  onClick() {
    localStorage.setItem('tokenState', '1');
    window.location.href = 'https://oauth.vk.com/authorize?client_id=7490396&display=popup&response_type=token&redirect_uri=' + window.location.href + '&scope=friends,offline&v=5.107';
  }
}
