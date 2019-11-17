import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Params} from '@angular/router'
import {Subscription} from 'rxjs'
import {AuthService} from '../../shared/services/auth/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  pSub: Subscription
  isRegistered = false

  constructor(private userService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.pSub = this.route.queryParams.subscribe((params: Params) => {
      this.isRegistered = params.register
    })
  }

  submit() {
    const email = this.form.get('email').value
    const password = this.form.get('password').value

    if (this.form.valid) {
      this.form.disable()
      this.userService.login(email, password).subscribe((response) => {
        this.form.enable()
        console.log(response)
      }, () => this.form.enable())
    }
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }


}
