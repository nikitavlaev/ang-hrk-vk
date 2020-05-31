import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-info-friends',
  templateUrl: './info-friends.component.html',
  styleUrls: ['./info-friends.component.css']
})
export class InfoFriendsComponent implements OnInit {
  friends = [];

  constructor(private http: HttpClient) {
    //request info about friends
    this.http.jsonp('https://api.vk.com/method/friends.get?user_id=' + localStorage.getItem('userId')
      + '&order=hints' +
      + '&count=5'
      + '&fields=' + 'nickname,photo_100'
      + '&access_token=' + localStorage.getItem('token')
      + '&v=5.107', 'callback'
    ).pipe(
      catchError(this.handleError)
    ).subscribe(
      data => {
        console.log(data);
        this.friends = data['response']['items'].slice(0, 5);
      }
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  ngOnInit(): void {}

}
