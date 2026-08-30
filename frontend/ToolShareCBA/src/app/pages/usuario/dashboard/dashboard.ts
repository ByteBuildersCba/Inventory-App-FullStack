import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';


@Component({
  imports: [ RouterLink, Navbar],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
