import { Routes } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';
import { Login } from './Components/login/login';
import { Register } from './Components/register/register';
import { LandingPage } from './Pages/landing-page/landing-page';
import { Accounts } from './Pages/accounts/accounts';
import { Payment } from './Pages/payment/payment';
import { Services } from './Pages/services/services';
import { Support } from './Pages/support/support';
import { Transfer } from './Pages/transfer/transfer';
import { Dashboard } from './Pages/dashboard/dashboard';
import { Sidebar } from './Pages/sidebar/sidebar';
import { Transation } from './Pages/transation/transation';
import { Settings } from './Pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'navbar', component: Navbar },
  { path: 'landing-page', component: LandingPage },
  { path: 'accounts', component: Accounts },
  { path: 'payments', component: Payment },
  { path: 'services', component: Services },
  { path: 'support', component: Support },
  { path: 'transfer', component: Transfer },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path : 'sidebar', component:Sidebar },
  {path : 'dashboard',component: Dashboard },
  {path : 'settings',component: Settings },
  {path : 'transations',component: Transation }


];
