import { Component } from '@angular/core';
import {Navbar} from '../../../shared/components/navbar/navbar';
import {Banner} from '../../../shared/components/banner/banner';
import {Products} from '../products/Products';
import {Categories} from '../categrories/categories';
import {Footer} from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Navbar, Banner, Products, Categories, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {

}
