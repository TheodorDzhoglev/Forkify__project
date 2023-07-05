import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (numPages != 1) return this._generateMarkupBtn(curPage, numPages);

    return '';
  }
  _generateMarkupBtn(curPage, numPages) {
    const nextBtn = `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    const previousBtn = `
  <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
    </button>`;
    // Page 1 and other
    if (curPage === 1 && numPages > 1) return nextBtn;
    // Last page
    if (curPage === numPages && numPages > 1) return previousBtn;
    // Other page
    if (curPage < numPages) return `${nextBtn}${previousBtn}`;
  }
}
export default new PaginationView();
