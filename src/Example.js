// @ts-check

export default class Example {
  constructor(element) {
    this.element = element;
  }

  init() {
    this.element.innerHTML = `
    <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>`;
  }
}
