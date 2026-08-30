import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Navbar } from '../../../app/shared/components/navbar/navbar';
@Component({
  imports: [RouterLink,Navbar],
  selector: 'app-herramientas',
  styleUrl: './herramientas.css',
  templateUrl: './herramientas.html',
})
export class Herramientas {}
