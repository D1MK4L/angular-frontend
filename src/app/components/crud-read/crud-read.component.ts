import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameUserService } from 'src/app/shared/services/gameUser.service';

@Component({
  selector: 'app-crud-read',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-read.component.html',
  styleUrl: './crud-read.component.css'
})
export class CrudReadComponent implements OnInit{
  gameUsernames: any[] = [];

  constructor(private gameUserService: GameUserService) {}

  ngOnInit() {
    this.gameUserService.currentGameUsernames.subscribe(
      (usernames) => {
        this.gameUsernames = usernames;
      }      
    );   
  }

}
