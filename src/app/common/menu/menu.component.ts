import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import firebase from "firebase/compat";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  currentUser?: firebase.User | null;

  constructor(private router: Router, private authService: AuthService) { }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  logout(): void {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
    }).catch(error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }
}
