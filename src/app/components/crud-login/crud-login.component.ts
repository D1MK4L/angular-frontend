import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GameUserService } from 'src/app/shared/services/gameUser.service';


@Component({
  selector: 'app-crud-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './crud-login.component.html',
  styleUrl: './crud-login.component.css'
})
export class CrudLoginComponent {
  gameUserService = inject(GameUserService);
  router = inject(Router);
  invalidLogin = false;  

  form = new FormGroup ({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });
 
  onSubmit() {
    const { username, password } = this.form.value;
    if (this.gameUserService.login(username!, password!)) {
      // this.router.navigate(['crud-panel']); 
      console.log('Login successful');     
    } else {
      this.invalidLogin = true;
      console.log('Login failed');
    }
  }
}
