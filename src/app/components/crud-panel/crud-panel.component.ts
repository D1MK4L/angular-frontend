import { Component, OnInit } from '@angular/core';
import { CrudLoginComponent } from 'src/app/components/crud-login/crud-login.component';
import { GameUserService } from 'src/app/shared/services/gameUser.service';
import { CommonModule } from '@angular/common';
import { CrudReadComponent } from 'src/app/components/crud-read/crud-read.component';
import { CrudCreateComponent } from 'src/app/components/crud-create/crud-create.component';
import { CrudUpdateComponent } from 'src/app/components/crud-update/crud-update.component';
import { CrudDeleteComponent } from 'src/app/components/crud-delete/crud-delete.component';


@Component({
  selector: 'app-crud-panel',
  standalone: true,
  imports: [
    CommonModule,
    CrudLoginComponent,
    CrudReadComponent,
    CrudCreateComponent,
    CrudUpdateComponent,
    CrudDeleteComponent,
  ],
  templateUrl: './crud-panel.component.html',
  styleUrl: './crud-panel.component.css'
})
export class CrudPanelComponent implements OnInit{
  isLoggedIn = false;
  gameUsernames: any[] = [];
  isCreateButtonClicked = false;
  isUpdateButtonClicked = false;
  isDeleteButtonClicked = false;

  constructor(private gameUserService: GameUserService) {}


  ngOnInit() {
    this.gameUserService.isLoggedIn().subscribe(loggedIn => {
      console.log('Login state:', loggedIn);
      this.isLoggedIn = loggedIn;
    })
    this.gameUserService.currentGameUsernames.subscribe(
      (usernames) => {
        this.gameUsernames = usernames;
      }
    );
  }

  onCreateClick() {
    return this.gameUserService.getCreateClickedState();
  }

  onUpdateClick() {
    return this.gameUserService.getUpdateClickedState();
  }

  onDeleteClick() {
    return this.gameUserService.getDeleteClickedState();
  }

  onReadClick() {
    return this.gameUserService.getReadClickedState();
  }

}
