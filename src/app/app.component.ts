import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true, // Acá agregué el standalone
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
