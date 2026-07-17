import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transation',
  imports: [Sidebar,CommonModule],
  templateUrl: './transation.html',
  styleUrl: './transation.css',
})
export class Transation implements OnInit {

  ngOnInit(){
    debugger;
    this.get_user()
  }
  http = inject(HttpClient)  // dependency injection which priviously doing wit constructor  
  userlist :any[] = []

  get_user(){
    this.http.get('http://127.0.0.1:8000/get_users').subscribe((result:any) =>{
      debugger;
      this.userlist = result

    })
  }
}
