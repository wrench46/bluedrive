import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { analytics } from '../dashboard.data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {

  public analytics: any[];
  datasource:any=[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Date Updated';
  public showYAxisLabel = true;
  public yAxisLabel = 'Value';
  public colorScheme = {
    domain: ['#283593', '#039BE5', '#FF5252']
  }; 
  public autoScale = true;
  public roundDomains = true;
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 

  constructor( private shared_service:ApiServiceService,) { }

  ngOnInit() {

    this.analytics = analytics; 
    this.shared_service.getDataSource.subscribe(datasource =>{
      this.getGeneratedNumberslimit();

    });

  
  }

  getGeneratedNumberslimit(){
    this.datasource = [];
    this.shared_service.getOrderedNumberslimit(20).subscribe(
      (serverResponse) => {  

        let datasource =serverResponse.results;

        let data ={
          name:"Generated",
          series:[]
        }

        datasource.forEach((values : any, keys :any) => {
            let series_data ={
              name:values.updated,
              value:values.value
            };

            data.series.push(series_data);
        
        });

 
        this.datasource.push(data);
        this.datasource= [... this.datasource]
        

      })
  }

  onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      this.datasource = [...this.datasource];
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}