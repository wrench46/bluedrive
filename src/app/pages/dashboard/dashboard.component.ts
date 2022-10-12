import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { DialogNumberGeneratedComponent } from '../dialog-number-generated/dialog-number-generated.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public settings: Settings;
  constructor(public appSettings:AppSettings,
    public dialog: MatDialog,
    private shared_service:ApiServiceService
    ){
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
  }

  generateNumber(){
    let dialogRef = this.dialog.open(DialogNumberGeneratedComponent, {
      data: { name: "Test 1", animal: "Test 2" },
      width:'628px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shared_service.getGenaratedNumbers(10,10).subscribe(
        (serverResponse) => {  
          
     
          let datasource ={
            datasource:serverResponse.results,
            pageIndex:0,
            pageSize:10,
            length:serverResponse.count 
          }

          this.shared_service.setDataSource(datasource);


          // serverResponse.count;
  
        })

    })
  }

}
