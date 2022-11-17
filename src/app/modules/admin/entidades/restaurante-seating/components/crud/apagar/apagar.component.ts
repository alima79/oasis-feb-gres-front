import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apagar',
  templateUrl: './apagar.component.html',
  styleUrls: ['./apagar.component.scss']
})
export class ApagarComponent implements OnInit {

  profiles = [
    {id: 'dev', name: 'developer'},
    {id: 'man', name: 'manager'},
    {id: 'dir', name: 'director'},
  ];
  
  selectedProfile = this.profiles[2];

  constructor() { }

  ngOnInit(): void {
  }

}
