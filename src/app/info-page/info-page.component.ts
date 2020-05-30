import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  gotToken = JSON.parse(localStorage.getItem('gotToken'));
  firstName = 'Loading...';

  constructor(private http: HttpClient) {
    const tokenState = localStorage.getItem('tokenState');
    console.log(tokenState);
    switch (tokenState) {
      case '1': {
        console.log('token set');
        const segment = window.location.hash.substr(1);
        const params = segment.split('&');
        const values: string[] = [];
        for (const param of params) {
          const value = param.split('=')[1];
          values.push(value);
        }
        const token = values[0];
        const expires = values[1];
        const userId = values[2];
        console.log(token, expires, userId);
        localStorage.setItem('tokenState', '2');
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expires', expires);
        this.show();
        window.location.replace('#');
        break;
      }
      case '2': {
        const token = localStorage.getItem('token');
        console.log('token == ', token);
        this.show();
        break;
      }
    }
  }

  show(): void {
    console.log('show');
    localStorage.setItem('gotToken', JSON.stringify(true));
    this.gotToken = true;
    this.http.jsonp('https://api.vk.com/method/users.get?user_id=' + localStorage.getItem('userId')
        + '&access_token=' + localStorage.getItem('token')
        + '&v=5.107', 'callback'
        ).subscribe(
          data => {
            this.handleFields(data['response'][0]);
          }
    );
    // $.ajax({
    //   url: 'https://api.vk.com/method/users.get?user_id=' + localStorage.getItem('userId')
    //     + '&access_token=' + localStorage.getItem('token')
    //     + '&v=5.107',
    //   type: 'GET',
    //   dataType: 'jsonp',
    //   crossDomain: true,
    //   success: function(data) {
    //     console.log(data.response[0]);
    //     cont(data.response[0]);
    //   }
    // });
  }

  handleFields(data) {
    this.firstName = data['first_name'];
  }

  ngOnInit(): void {
  }

}
