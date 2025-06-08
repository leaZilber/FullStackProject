import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


@Component({

  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule, RouterOutlet,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularProject';
}
