import icons from 'url:../../img/icons.svg';
import View from './view.js';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _switch;
  _message = 'Successfully uploaded recipe !';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  openWindow() {
    // Removing hidden class
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    // Adding new form
    this._addNewForm();
    // this._switch = true;
  }

  closeWindow() {
    // Adding hidden class
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
    // Clearing existing form
    this._window.addEventListener(
      'transitionend',
      () => {
        this._clear();
      },
      { once: true }
    );
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.openWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
    this._switch = false;
  }

  _addNewForm() {
    const markup = `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="" required name="title" type="text" placeholder="Format: at least five characters" />
          <label>URL</label>
          <input value="" required name="sourceUrl" type="text" placeholder="Format: at least five characters" />
          <label>Image URL</label>
          <input value="" required name="image" type="text" placeholder="Format: at least five characters" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" placeholder="Format: at least five characters"/>
          <label>Prep time</label>
          <input value="" required name="cookingTime" type="number" placeholder="Format: at least one number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" placeholder="Format: at least one number !== 0" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value=""
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=""
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new AddRecipeView();
