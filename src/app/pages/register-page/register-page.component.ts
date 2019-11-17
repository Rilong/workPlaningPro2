import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import MyValidators from '../../shared/my.validators'
import {UserService} from '../../shared/services/user/user.service'
import {RegisterData} from '../../shared/interfaces/registerData'
import {ServerMessage} from '../../shared/interfaces/serverMessage'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  private rSub: Subscription

  constructor(private userServer: UserService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required])
    }, [MyValidators.confirm('password', 'passwordConfirmation')])
  }

  submit() {

    if (this.form.valid) {
      const formData: RegisterData = {
        name: this.form.get('name').value,
        email: this.form.get('email').value,
        password: this.form.get('password').value,
      }
      this.form.disable()
      this.rSub = this.userServer.register(formData).subscribe((response: ServerMessage) => {
        this.router.navigate(['/login'], {
          queryParams: {register: true}
        })
        this.form.enable()
      }, (e) => this.form.enable())
    }
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }
}
