import {
  createElement,
  redFixture,
  render,
  renderPositions,
} from '../utils';

describe('createElement', () => {
  let html;

  beforeAll(() => {
    html = redFixture('test.html');
  });

  it('should return Node', () => {
    const element = createElement(html);

    expect(element).toBeInstanceOf(Node);
  });

  it('should render correct markup', () => {
    const element = createElement(html);

    expect(element).toMatchSnapshot();
  });

  it('should throw error without template', () => {
    const callWithError = () => {
      createElement();
    };

    expect(callWithError).toThrowErrorMatchingSnapshot();
  });
});

describe('render', () => {
  let container;
  let testElement;
  let html;

  beforeAll(() => {
    html = redFixture('test.html');
    testElement = document.createElement('p');
    testElement.textContent = 'Render test element';
  });

  beforeEach(() => {
    container = createElement(html);
  });

  afterEach(() => {
    container = null;
  });

  it('should throw error without place', () => {
    const callWithError = () => {
      render();
    };

    expect(callWithError).toThrowErrorMatchingSnapshot();
  });

  it('should render AFTERBEGIN ', () => {
    render(container, testElement, renderPositions.AFTERBEGIN);

    expect(container).toMatchSnapshot();
  });

  it('should render BEFOREEND ', () => {
    render(container, testElement, renderPositions.BEFOREEND);

    expect(container).toMatchSnapshot();
  });
});
