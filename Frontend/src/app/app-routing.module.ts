import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { EditComponent } from "./recipe/edit/edit.component";
import { DetailsComponent } from "./recipe/details/details.component";

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "new", component: EditComponent },
  { path: "details/:id", component: DetailsComponent },
  { path: "edit/:id", component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
