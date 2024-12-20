import icons from '../../img/icons.svg';
// import { Fraction } from 'fractional';
import View from './View';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');

  addHandlerRecipe(handler) {
    ['load', 'hashchange'].forEach(ev => addEventListener(ev, handler));
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      const updatTo = +btn.dataset.updateTo;
      if (updatTo > 0) handler(updatTo);
    });
  }

  addHandlerAddBookmark(handler) { 
    this._parentElement.addEventListener('click', function (e) { 
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler()
    })
  }

  _generateMarkup(recipe) {
    return `<figure class="recipe__fig">
              <img src="${recipe.image}" alt="${recipe.title}" 
                class="recipe__img" />
                  <h1 class="recipe__title">
                <span>${recipe.title}</span>
              </h1>
            </figure>
    
            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
                }</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--increase-servings" data-update-to="${
                    recipe.servings - 1
                  }">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--decrease-servings" data-update-to="${
                    recipe.servings + 1
                  }">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated">
                
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${recipe.bookMarked ? "-fill" : ""}"></use>
                </svg>
              </button>
            </div>
    
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
              ${recipe.ingredients
                .map(ing => this._ingredientsMarkup(ing))
                .join('')}
              </ul>
            </div>
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
                  recipe.publisher
                }</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>`;
  }

  _ingredientsMarkup(ing) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity || ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>
      `;
  }
}

export default new RecipeView();
