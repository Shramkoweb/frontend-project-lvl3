import path from 'path';
import fs from 'fs';

import {
  createElement,
  render,
  renderPositions,
} from '../utils';

const getFixturePath = (filename) => path.join(process.cwd(), '/src', '/__fixtures__', filename);
const readFixtureContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('createElement', () => {
  let html;

  beforeAll(() => {
    html = readFixtureContent('test.html');
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
    html = readFixtureContent('test.html');
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
