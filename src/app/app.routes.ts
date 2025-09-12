
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { Routes  } from '@angular/router';


export const routes: Routes = [

    { path: 'about',component: AboutComponent}, // About
    { path: 'contact',component: ContactComponent}, // contact

];
