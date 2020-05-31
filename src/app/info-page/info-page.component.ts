import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  gotToken = JSON.parse(localStorage.getItem('gotToken'));
  firstName = 'Loading...';
  lastName = '';

  constructor(private http: HttpClient) {
    const tokenState = localStorage.getItem('tokenState');
    console.log(tokenState);

    switch (tokenState) {
      case '1': {
        //parse token info from url
        const values = this.parseCurrentUrl();
        const token = values[0];

        if (token === 'access_denied') {
          alert('Please, try again');
          localStorage.setItem('tokenState', '0');
        } else {
          const expires = values[1];
          const userId = values[2];

          localStorage.setItem('tokenState', '2');
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('expires', expires);

          this.gotToken = true;
          this.requestUserName();
        }
        window.location.replace('#');
        break;
      }
      case '2': {
        //if we already have token
        const token = localStorage.getItem('token');
        console.log('token == ', token);
        this.requestUserName();
        break;
      }
    }
  }

  parseCurrentUrl(): string[] {
    const segment = window.location.hash.substr(1);
    const params = segment.split('&');

    const values: string[] = [];
    for (const param of params) {
      const value = param.split('=')[1];
      values.push(value);
    }
    return values;
  }

  requestUserName(): void {
    localStorage.setItem('gotToken', JSON.stringify(true));
    this.http.jsonp('https://api.vk.com/method/users.get?user_id=' + localStorage.getItem('userId')
      + '&access_token=' + localStorage.getItem('token')
      + '&v=5.107', 'callback'
    ).pipe(
      catchError(this.handleError)
    ).subscribe(
      data => {
        this.handleFields(data['response'][0]);
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

  handleFields(data) {
    this.firstName = data['first_name'];
    this.lastName = data['last_name'];
  }

  ngOnInit(): void {
  }

}
