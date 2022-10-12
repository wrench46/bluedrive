import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-dialog-number-generated',
  templateUrl: './dialog-number-generated.component.html',
  styleUrls: ['./dialog-number-generated.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class DialogNumberGeneratedComponent implements OnInit {

  dialog_message:any;
  api_call:boolean=false;
  header_title:any;
  dialog_class:string;
  spinner_class:string;
  api_call_mesage:string;
  mat_dialog_spinner_color:string;
  close_cancel:string;
  yes_confirm:string;
  success_delete:boolean=true;
  show_yes_confirm:boolean=true;
  
  search_text: string;

  is_update_err:boolean=false;
  field_errors:any;
  close_dialog_status:any={};

  constructor(public dialogRef: MatDialogRef<DialogNumberGeneratedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shared_service:ApiServiceService,
    ) { 
      dialogRef.disableClose = true;
      console.log("dATA",data)
    }

  ngOnInit(): void {
    this.header_title = "Generate Number";
    this.dialog_class = "task-header-blue";
    this.close_cancel = "No";
    this.yes_confirm = "Yes";

   
    this.generateNumberFromAPI();

  }


  generateNumberFromAPI(){
    this.api_call=true;
     this.shared_service.generateNumbers().subscribe(
      (serverResponse) => {  
        
        this.api_call=false;

        this.dialog_message = 'Number Generated from API : '+serverResponse.value

        console.log("GEN NUMS",serverResponse)
      })
  }

  close(){
    this.dialogRef.close(this.close_dialog_status);
  }

}
