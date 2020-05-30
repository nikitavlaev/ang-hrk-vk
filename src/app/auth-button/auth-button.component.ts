import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})

export class AuthButtonComponent implements OnInit {

  constructor(private http: HttpClient) {
    if (localStorage.getItem('hasCode') === '1') {
      console.log('code set');
      console.log(window.location.search);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log('code == ', code);
      localStorage.setItem('hasToken', '1');
      localStorage.setItem('hasCode', '0');

      function jsonp(url, callback) {
        let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
          delete window[callbackName];
          document.body.removeChild(script);
          callback(data);
        };

        let script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
      }

      // jsonp('https://oauth.vk.com/access_token?client_id=7490396&client_secret=XmHyFSkMDm7kDvaXOfEF&code=' + code + '&redirect_uri=http://localhost:4200/',
      //   function(response) {
      //     console.log(response);
      //   });
      $.ajax({
          url: 'https://oauth.vk.com/access_token?client_id=7490396&client_secret=XmHyFSkMDm7kDvaXOfEF&code=' + code + '&redirect_uri=http://localhost:4200/',
          method: 'GET',
          dataType: 'JSONP',
          success: function(data) {
            console.log(data);
          }
        }
      );
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
  }

  ngOnInit(): void {
    localStorage.setItem('hasCode', '0');
    localStorage.setItem('hasToken', '0');
  }

  onClick() {
    localStorage.setItem('hasCode', '1');
    window.location.href = 'https://oauth.vk.com/authorize?client_id=7490396&display=popup&response_type=code&redirect_uri=http://localhost:4200/&scope=friends,offline&v=5.107';
  }
}
