
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { Routes  } from '@angular/router';


export const routes: Routes = [

    { path: '',component: FrontPageComponent}, // About
    { path: 'about',component: AboutComponent}, // About

];
