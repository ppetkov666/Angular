import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebApiError } from 'src/app/utilities/utils';
import { userCredentials } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private security: SecurityService, private router: Router) { }

  errors: string[] = [];

  ngOnInit(): void {
  }

  register(userCredentials: userCredentials) {
    this.errors = [];
    this.security.register(userCredentials).subscribe({
      next: authResponse => {
        this.security.saveToken(authResponse);
        this.router.navigate(['/']);
      },
      error: error => this.errors = parseWebApiError(error)
    });
  }

}
