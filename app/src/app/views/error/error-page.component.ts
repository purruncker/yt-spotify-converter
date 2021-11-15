import { Component, OnInit } from '@angular/core';
import { HttpErrorService } from 'src/app/services/http-error.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
