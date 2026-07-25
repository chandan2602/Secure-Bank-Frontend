import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TransationsServices } from '../../Services/transations';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-transation',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './transation.html',
  styleUrl: './transation.css',
})
export class Transation implements OnInit {
  // Dependency Injection
  http = inject(HttpClient);
  serv = inject(TransationsServices);

  // Variable decalaration for getting all the tranasation list and stats card
  transation: any[] = [];
  totoal_amount: string = '';
  total_transation: number = 0;

  // showing popup card
  isPopUp = false;

  openPopUp() {
    this.isPopUp = true;
  }

  closePopUp() {
    this.isPopUp = false;
  }

  onFormSubmit() {
    this.closePopUp();
  }

  ngOnInit() {
    this.ontransation();
  }

  ontransation() {
    this.serv.onTransationService().subscribe({
      next: (res) => {
        this.transation = res.Transation_List;
        this.totoal_amount = res.Total_transation_count;
        this.total_transation = res.Total_amount;

        console.log(this.transation);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onNextTransation(){
    this.serv.onNewTransation().subscribe({
      next : (response:any) => {
          console.log(response)
      },
      error : (error) =>{
        console.error(error)
      }
    })
  }
}
