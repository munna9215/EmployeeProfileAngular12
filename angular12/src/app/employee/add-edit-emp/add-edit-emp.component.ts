import { Component, OnInit, Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service: SharedService) { }
  @Input() emp: any;
  EmployeeID:string="";
  EmployeeName:string="";
  Department:string="";
  DateOfJoining:string="";
  PhotoFileName:string="";
  PhotoFilePath:string="";

  DepartmentList:any=[];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

   loadDepartmentList(){
     this.service.getAllDepartmentNames().subscribe((data:any)=> {
     this.DepartmentList= data;
     this.EmployeeID= this.emp.EmployeeID;
     this.EmployeeName= this.emp.EmployeeName;
     this.Department= this.emp.Department;
     this.DateOfJoining= this.emp.DateOfJoining;
     this.PhotoFileName= this.emp.PhotoFileName;
     this.PhotoFilePath= this.service.PhotoUrl+this.PhotoFileName;
     });
   }

  addEmployee(){
    var val= {
      EmployeeID : this.EmployeeID , 
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoining : this.DateOfJoining,
      PhotoFileName : this.PhotoFileName};
    this.service.addEmployee(val).subscribe(res=> alert(res.toString()));
  }

  updateEmployee(){
    var val= {
      EmployeeID : this.EmployeeID ,
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoining : this.DateOfJoining,
      PhotoFileName : this.PhotoFileName};
    this.service.updateEmployee(val).subscribe(res=> alert(res.toString()));
  }


    uploadPhoto(event:any)
  {
      var file= event.target.files[0];
      const formdata:FormData = new FormData();
      formdata.append('uploadedFile', file, file.Name);
      this.service.uploadPhoto(formdata).subscribe((data:any)=>{
        alert(data.toString());
        this.PhotoFileName= data.toString();
        this.PhotoFilePath= this.service.PhotoUrl+this.PhotoFileName;
      });
  }
}
