import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CrudLoginComponent } from 'src/app/components/crud-login/crud-login.component';
import { GameUserService } from 'src/app/shared/services/gameUser.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-buggy-tools',
  standalone: true,
  imports: [
    CommonModule,
    CrudLoginComponent
  ],
  templateUrl: './buggy-tools.component.html',
  styleUrl: './buggy-tools.component.css'
})
export class BuggyToolsComponent {
  isLoggedIn = false;
  userService = inject(UserService); 
  
  

  constructor(private gameUserService: GameUserService) {} 


  ngOnInit() {
    this.gameUserService.isLoggedIn().subscribe(loggedIn => {
      console.log('Login state:', loggedIn);
      this.isLoggedIn = loggedIn;
    })
  }

  onReadButtonClick() {
    this.gameUserService.setReadClickedState(true);
    this.gameUserService.getAllGameUsernames().subscribe(
      (response) => {
        this.gameUserService.getGameUsername(response);
        this.gameUserService.setCreateClickedState(false);
        this.gameUserService.setUpdateClickedState(false);
        this.gameUserService.setDeleteClickedState(false);
        console.log(response); // Handle the response accordingly
      },
      (error) => {
        console.error(error); // Handle errors
      }
    );
  }

  onCreateClick() {
    this.gameUserService.setCreateClickedState(true);
    this.gameUserService.setUpdateClickedState(false);
    this.gameUserService.setDeleteClickedState(false);
    this.gameUserService.setReadClickedState(false);
  }

  onUpdateClick() {
    this.gameUserService.setUpdateClickedState(true);
    this.gameUserService.setCreateClickedState(false);
    this.gameUserService.setDeleteClickedState(false);
    this.gameUserService.setReadClickedState(false);
  }

  onDeleteClick() {
    this.gameUserService.setDeleteClickedState(true);
    this.gameUserService.setCreateClickedState(false);
    this.gameUserService.setUpdateClickedState(false);
    this.gameUserService.setReadClickedState(false);
  }
}
