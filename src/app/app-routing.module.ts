import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./widgets/content/screen-loader/screen-loader.module').then( m => m.ScreenLoaderPageModule)
  },
  {
    path: 'screen-loader',
    loadChildren: () => import('./widgets/content/screen-loader/screen-loader.module').then( m => m.ScreenLoaderPageModule)
  },
  {
    path: 'introduction',
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
