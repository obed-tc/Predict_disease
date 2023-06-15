import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListUserPage } from './list-user/list-user.page';
import { RegistromedicosPage } from './registromedicos/registromedicos.page';
import { VisualizacionPdfPage } from './visualizacion-pdf/visualizacion-pdf.page';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'visualizacion-pdf',
    loadChildren: () => import('./visualizacion-pdf/visualizacion-pdf.module').then( m => m.VisualizacionPdfPageModule)
  },
  {
    path: 'register-hospital',
    loadChildren: () => import('./register-hospital/register-hospital.module').then( m => m.RegisterHospitalPageModule)
  },
  {
    path: 'register-hospital',
    loadChildren: () => import('./register-hospital/register-hospital.module').then( m => m.RegisterHospitalPageModule)
  },

  { path: 'list-user', component: ListUserPage },
  { path: 'registromedicos/medico/:id', component: RegistromedicosPage },
    
  { path: 'visualizacion-pdf/:id/:enfermedadId', component: VisualizacionPdfPage },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
