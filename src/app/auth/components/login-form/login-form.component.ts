import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '../../models/authenticate.model';

@Component({
  selector: 'cs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input()
  public predefinedDomain: string;
  @Output()
  public submitted = new EventEmitter<Authenticate>();
  public showAdvancedOptions = false;

  public loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      domain: new FormControl(this.predefinedDomain),
    });
  }

  public onSubmit() {
    const value: Authenticate = this.loginForm.value;
    this.submitted.emit(value);
  }

  public toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }
}
