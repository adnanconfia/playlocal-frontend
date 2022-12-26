import { TermsComponent } from './pages/terms/terms.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'thanks', component: ThanksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
