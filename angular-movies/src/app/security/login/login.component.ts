import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebApiError } from 'src/app/utilities/utils';
import { userCredentials } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private security: SecurityService, private router: Router) { }

  errors: string[] = [];

  ngOnInit(): void {
  }

  login(userCredentials: userCredentials){
    this.errors = [];
    this.security.login(userCredentials).subscribe({
      next: authResponse => {
        this.security.saveToken(authResponse);
        this.router.navigate(['/']);
      },
      error: error => this.errors = parseWebApiError(error)
    });
  }

}
