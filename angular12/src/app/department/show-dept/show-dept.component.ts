import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})
export class ShowDeptComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[];

  ModalTitle:string="";
  ActivateAddEditDeptComp:boolean=false;
  dep:any;


  ngOnInit(): void {
    this.refreshDeptList();
  }

  addClick(){
    this.ModalTitle="Add Department";
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    };
    this.ActivateAddEditDeptComp=true;
  }

  closeClick(){
    this.ActivateAddEditDeptComp=false;
    this.refreshDeptList();
  }

  editClick(item:any){
    this.ModalTitle="Edit Department";
    this.dep= item;      
    this.ActivateAddEditDeptComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure ??')){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{alert(data.toString())
        this.refreshDeptList();  
      });      
    }    
  }

 refreshDeptList(){
   this.service.getDeptList().subscribe(data => 
    { 
      this.DepartmentList = data; 
    });
 }

}
