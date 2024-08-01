import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  FOOTWEAR : any= [
    {
      name: 'Running Shoes',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    {
      name: 'Sandals',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    {
      name: 'Sneakers',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    {
      name: 'Running Shoes',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    {
      name: 'Sandals',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    {
      name: 'Sneakers',
      imageUrl: 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScMs3DhYoO0qpld8nzr8gZRUtBjcKoTHbcOg&s'
    },
    // Add more footwear items as needed
  ];

  constructor(private authservice : AuthService){

  }

  

}
