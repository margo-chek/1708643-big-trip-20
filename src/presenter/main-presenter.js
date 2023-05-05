import {RenderPosition, render} from '../render.js';
import {POINT_LIST_RENDER_COUNT} from '../const.js';
import TripInfoView from './../view/trip-info-view.js';
import FilterView from './../view/filter-view.js';
import SortView from './../view/sort-view.js';
import TripEventsListView from './../view/trip-events-list-view.js';
import TripPointView from './../view/trip-point-view.js';
import EditFormView from './../view/edit-form-view.js';
import FormHeaderView from './../view/form-header-view.js';
import FormDetailsView from './../view/form-details-view.js';
import FormDestinationView from './../view/form-destination-view.js';
import FormOffersView from './../view/form-offers-view.js';

export default class MainPresenter {
  contentComponent = new TripEventsListView();
  formComponent = new EditFormView();
  formDetailsComponent = new FormDetailsView();

  constructor({parentContainer}) {
    this.parentContainer = parentContainer;
  }

  init() {
    const tripMainElement = this.parentContainer.querySelector('.trip-main');
    const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');
    const tripEventsElement = this.parentContainer.querySelector('.trip-events');
    const formElement = this.formComponent.getElement().querySelector('.event');

    render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
    render(new FilterView(), tripControlsElement);
    render(new SortView(), tripEventsElement);
    render(this.contentComponent, tripEventsElement);

    render(this.formComponent, this.contentComponent.getElement());
    render(new FormHeaderView(), formElement);
    render(this.formDetailsComponent, formElement);
    render(new FormDestinationView(), this.formDetailsComponent.getElement());
    render(new FormOffersView(), this.formDetailsComponent.getElement());

    for (let i = 0; i < POINT_LIST_RENDER_COUNT; i++) {
      render(new TripPointView(), this.contentComponent.getElement());
    }
  }
}
