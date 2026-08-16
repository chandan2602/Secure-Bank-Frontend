import { Component,inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { DashbordService } from '../../Services/dashbord';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  service = inject(DashbordService)

  profile_name : string = ''
  
  ngOnInit(): void {
      this.profile();
  }
  profile(){
    this.service.getprofile().subscribe({
      next : (res:any)=>{
        this.profile_name = res.Name
      },
      error : (error) =>{
        console.error(error)
      }
    })
  }
}
