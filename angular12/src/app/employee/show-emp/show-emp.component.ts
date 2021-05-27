import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  EmployeeList:any=[];

  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;


  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.ModalTitle="Add Department";
    this.emp={
      EmployeeID:0,
      EmployeeName:"",
      Department:"",
      DateofJoining:"",
      PhotoFileName:"",
      PhotoFilePath:""
    };
    this.ActivateAddEditEmpComp=true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }

  editClick(item:any){    
    this.ModalTitle="Edit Employee";    
    this.emp= item;      
    this.emp.PhotoFilePath= this.service.PhotoUrl+this.emp.PhotoFileName;    
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure ??')){
      this.service.deleteEmployee(item.EmployeeID).subscribe(data=>{alert(data.toString())
        this.refreshEmpList();  
      });      
    }    
  }

 refreshEmpList(){
   this.service.getEmpList().subscribe(data => 
    { 
      this.EmployeeList = data; 
    });
 }

}
