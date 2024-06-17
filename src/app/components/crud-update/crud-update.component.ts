import { Component } from '@angular/core';
import { GameUserService } from 'src/app/shared/services/gameUser.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-crud-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-update.component.html',
  styleUrl: './crud-update.component.css'
})
export class CrudUpdateComponent {  
  id: string = '';
  userToUpdate = {       
    givenName: '',
    surName: '',
    email: '',
    username: '',
  };

  constructor(private gameUserService: GameUserService) {}

  fetchUserData() {
    if (this.id) {
      this.gameUserService.getUserById(this.id).subscribe(
        (response) => {
          this.userToUpdate.givenName = response.givenName;
          this.userToUpdate.surName = response.surName;
          this.userToUpdate.email = response.email;
          this.userToUpdate.username = response.username;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }  

  onSubmit() {
    this.gameUserService.updateGameUsername(this.id, this.userToUpdate).subscribe(
      response => {
        
        console.log('User updated successfully:', response);
        // Reset the form or handle the response as needed
      },
      error => {       
        console.error('Error updating user:', error);
      }
    );
    
  }

  resetForm() {
    this.id = '';
    this.userToUpdate.givenName = '';
    this.userToUpdate.surName = '';
    this.userToUpdate.email = '';
    this.userToUpdate.username = '';
  }

}
