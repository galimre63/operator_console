import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: string;
  loginForm: FormGroup;

  get f() { return this.loginForm.controls; }

  constructor(private formBuilder: FormBuilder/*,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService/*,
    private alertService: AlertService*/) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['localhost:8088'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    /*this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          //this.alertService.error(error);
          //this.loading = false;
        });*/
  }
}
