import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorDTO } from './dto/error.dto';
import { HttpErrorService } from './services/http-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpErrService: HttpErrorService) {

  }
  public error: Observable<ErrorDTO> = undefined

  public async ngOnInit(): Promise<void> {
    this.error = this.httpErrService.initError();
  }
  public deleteError() {

  }
  public createErr() {

  }

}