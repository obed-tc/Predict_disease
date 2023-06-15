import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {
  welcomeMessage: string;
  constructor() { 
    this.setWelcomeMessage();
  }

  ngOnInit() {
  }
  setWelcomeMessage() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.welcomeMessage = 'Buenos días';
    } else if (currentHour >= 12 && currentHour < 19) {
      this.welcomeMessage = 'Buenas tardes';
    } else {
      this.welcomeMessage = 'Buenas noches';
    }
  }

}
