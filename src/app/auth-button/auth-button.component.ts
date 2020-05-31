import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})

export class AuthButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    localStorage.setItem('tokenState', '1');
    // redirect to VK authorization page to get the token
    window.location.href = 'https://oauth.vk.com/authorize?client_id=7490396&display=popup&response_type=token&redirect_uri='
      + window.location.href
      + '&scope=friends,offline&v=5.107';
  }
}
