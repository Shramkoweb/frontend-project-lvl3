import path from 'path';
import fs from 'fs';

export const renderPositions = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const getFixturePath = (filename) => path.join(process.cwd(), '/src', '/__fixtures__', filename);
export const redFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

export const createElement = (template) => {
  if (!template) {
    throw new Error('Unexpected call createElement without template');
  }

  const element = document.createElement('div');
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPositions.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPositions.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Uncorrected render place ${place}`);
  }
};
