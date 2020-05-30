import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-info-friends',
  templateUrl: './info-friends.component.html',
  styleUrls: ['./info-friends.component.css']
})
export class InfoFriendsComponent implements OnInit {
  friends = [];

  constructor(private http: HttpClient) {
    this.http.jsonp('https://api.vk.com/method/friends.get?user_id=' + localStorage.getItem('userId')
      + '&order=hints' +
      + '&count=5'
      + '&fields=' + 'nickname, domain, sex, bdate, city, country, timezone, photo_50'
      + '&access_token=' + localStorage.getItem('token')
      + '&v=5.107', 'callback'
    ).subscribe(
      data => {
        console.log(data);
        this.friends = data['response']['items'].slice(0, 5);
      }
    );
  }

  ngOnInit(): void {
  }

}
