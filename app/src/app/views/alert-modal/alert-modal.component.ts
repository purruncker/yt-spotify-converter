import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ErrorDTO } from 'src/app/dto/error.dto';
import { HttpErrorService } from 'src/app/services/http-error.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() error: ErrorDTO;
  @Output() deleteError: EventEmitter<any> = new EventEmitter();

  constructor(private errService: HttpErrorService) { }

  ngOnInit(): void {
  }

  public initDeleteError() {
    this.errService.deleteError()
    // this.deleteError.emit()
  }
}
