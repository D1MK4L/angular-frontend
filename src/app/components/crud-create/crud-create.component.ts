import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameUserService } from 'src/app/shared/services/gameUser.service';

@Component({
  selector: 'app-crud-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-create.component.html',
  styleUrl: './crud-create.component.css'
})
export class CrudCreateComponent {
  newUser = {
    givenName: '',
    surName: '',
    email: '',
    username: ''
  };

  constructor(private gameUserService: GameUserService) {}

  createUser() {
    this.gameUserService.createGameUsername(this.newUser).subscribe(
      response => {
        console.log('User created successfully:', response);
        // Reset the form or handle the response as needed
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

}
