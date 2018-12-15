import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Response} from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
// firebase db: https://ng-recipe-book-etf.firebaseio.com/
  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-etf.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://ng-recipe-book-etf.firebaseio.com/recipes.json')
      .pipe(
        map((response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipes['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
