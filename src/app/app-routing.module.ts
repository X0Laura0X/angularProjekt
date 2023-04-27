import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./common/services/auth.guard";

const routes: Routes = [
  {
    path: 'not-found', loadChildren: () => import('./common/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: 'login', loadChildren: () => import('./pre-login-pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'sign-up', loadChildren: () => import('./pre-login-pages/sign-up/sign-up.module').then(m => m.SignUpModule),
  },
  {
    path: 'download', loadChildren: () => import('./authenticated-pages/download/download.module').then(m => m.DownloadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'upload', loadChildren: () => import('./authenticated-pages/upload/upload.module').then(m => m.UploadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account', loadChildren: () => import('./authenticated-pages/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'file', loadChildren: () => import('./authenticated-pages/file/file.module').then(m => m.FileModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
