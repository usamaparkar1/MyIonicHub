import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'introduction',
    loadChildren: () => import('./widgets/content/introduction/introduction.module').then( m => m.IntroductionPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./widgets/content/introduction/introduction.module').then( m => m.IntroductionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
