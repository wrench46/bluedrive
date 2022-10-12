import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppSettings } from 'src/app/app.settings';
import { ApiServiceService } from 'src/app/shared/api-service.service';
// import { TablesService,Element } from '../../tables/tables.service';

@Component({
  selector: 'app-table-paging',
  templateUrl: './table-paging.component.html',
  styleUrls: ['./table-paging.component.scss']
})
export class TablePagingComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  public displayedColumns = ['generator_user', 'created', 'updated', 'value'];
  // public dataSource: any;

  pageSizeOptions:any=[5, 10, 20];

  // pageEvent: PageEvent;
  datasource: any;
  pageIndex:number;
  pageSize:number;
  length:number;


  constructor(public appSettings:AppSettings,
    // private tablesService:TablesService,
    private shared_service:ApiServiceService,
    ) { 

   

  }

  ngOnInit(): void {

    this.shared_service.getDataSource.subscribe(datasource =>{
      this.getGeneratedNumbers();

    });
  }

  getGeneratedNumbers(){

    this.shared_service.getOrderedNumbers().subscribe(
      (serverResponse) => {  
        
        console.log("random Numbers",serverResponse)
        this.datasource =serverResponse.results;
        this.pageIndex=0;
        this.pageSize= 20;
        this.length=serverResponse.count 
        // serverResponse.count;

      })
  }

  getServerData(event){
    let limit = event.pageSize;
    let offset = 0;

    if(event.pageIndex > 0){
    
      offset = event.pageIndex * event.pageSize;
      
    }


    this.shared_service.getGenaratedNumbers(limit,offset).subscribe(
      (serverResponse) => {  
        this.datasource =serverResponse.results;

        this.pageSize= serverResponse.count;
        this.length= serverResponse.count;;

      })

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

}
