import { Component } from '@angular/core';
import { GameUserService } from 'src/app/shared/services/gameUser.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-delete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-delete.component.html',
  styleUrl: './crud-delete.component.css'
})
export class CrudDeleteComponent {
  id: string = '';
  givenName: string = '';
  surName: string = '';
  email: string = '';
  username: string = '';

  constructor(private gameUserService: GameUserService) {}

  fetchUserData() {
    if (this.id) {
      this.gameUserService.getUserById(this.id).subscribe(
        (response) => {
          this.givenName = response.givenName;
          this.surName = response.surName;
          this.email = response.email;
          this.username = response.username;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  onSubmit() {
    if (this.id) {
      this.gameUserService.deleteUserById(this.id).subscribe(
        (response) => {
          console.log('User deleted successfully');
          this.resetForm();
        },
        (error) => {
          console.error(error);
        }
      );
    }   
  }

  resetForm() {
    this.id = '';
    this.givenName = '';
    this.surName = '';
    this.email = '';
    this.username = '';
  }

}
