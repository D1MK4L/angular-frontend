import { Component, OnInit, inject, HostListener} from '@angular/core';
import { Subscription } from 'rxjs';
import { gameData } from 'src/app/shared/interfaces/data';
import { DataService } from 'src/app/shared/services/data.service';
import { LoadingComponentComponent } from 'src/app/components/loading-component/loading-component.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BuggyToolsComponent } from 'src/app/components/buggy-tools/buggy-tools.component';
import { CrudLoginComponent } from 'src/app/components/crud-login/crud-login.component';
import { CrudPanelComponent } from 'src/app/components/crud-panel/crud-panel.component';


@Component({
  selector: 'app-restricted-content',
  standalone: true,
  templateUrl: './restricted-content.component.html',  
  styleUrls: ['./restricted-content.component.css'],
  imports: [
    LoadingComponentComponent,
    CommonModule,
    BuggyToolsComponent,
    CrudLoginComponent,
    CrudPanelComponent
  ],
})

export class RestrictedContentComponent implements OnInit{   
  dataService = inject(DataService)
  gameData= '';
  isLoading = true; 
  showIframe = false;
  showIframe2 = false;   
  private subscription: Subscription | undefined; 
  
  // constructor(private dataService: DataService) {}
  constructor(private http: HttpClient) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'Enter') {
      this.refreshGameData();
    }
  }

  ngOnInit(): void {
    // this.refreshGameData();

    // this.dataService.getGameData().subscribe((data: gameData) => {
    //   console.log(data);
    //   this.gameData = data.message;
    // }); 
    window.addEventListener('message', this.receiveMessage, false);
    window.addEventListener('message', this.receiveMessage.bind(this), false);      
  }


  onIframeLoad(): void {
    this.isLoading = false;  // Hide the loading spinner once the iframe has loaded
    this.setupIframeEventListeners();
  }

  onIframeError(): void {
    // Handle the error state if needed
    console.error('Error loading iframe content');
    this.isLoading = false;  // Hide the loading spinner even if there's an error
  }

 
  refreshGameData(): void {
    this.subscription = this.dataService.getGameData().subscribe({
      next: (data: gameData) => {
        console.log(data);
        this.gameData = data.message;
      },
      error: (error) => {
        console.error('There was an error!', error);
        //alert('Failed to load game data. Please try again later.');
      }
    });
  }

  setupIframeEventListeners(): void {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.addEventListener('keydown', (event: KeyboardEvent) => {
        this.handleKeyDown(event);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    window.removeEventListener('message', this.receiveMessage, false);
    window.removeEventListener('message', this.receiveMessage.bind(this), false);
  }

  receiveMessage(event: MessageEvent) {   
    // if (origin !== 'https://localhost:8080') {
    //   return;
    // }
    // console.log('Received message:', event.data, event);
    if (event.origin !== 'https://happy-moss-00cc46503.5.azurestaticapps.net/') {
      console.warn('Origin not allowed:', event.origin);
      return;
    }
    console.log('Received message : ', event.data);
    
    // Display an alert window with the received message
    //alert(event.data);
    // this.showIframe = true;
    // Toggle the value of showIframe
    if (event.data == "Iframe1") {
    this.showIframe = !this.showIframe;    
    }

     if (event.data == "Iframe2") {
    this.showIframe2 = !this.showIframe2;
    }
    
  }

}



















