import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Navbar } from '../../../app/shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  imports: [RouterLink,Navbar,Footer],
  selector: 'app-herramientas',
  styleUrl: './herramientas.css',
  templateUrl: './herramientas.html',
})
export class Herramientas {}
