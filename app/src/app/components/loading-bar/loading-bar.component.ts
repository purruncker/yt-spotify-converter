import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  showLoadingScreen = false;

  constructor(private LoadingBarService: LoadingBarService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.LoadingBarService.getLoadingBarObserver().subscribe(status => {
      this.showLoadingScreen = status;
      this.cdRef.detectChanges();
    })
  }

}
