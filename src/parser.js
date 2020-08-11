import uniqueId from 'lodash/uniqueId';

export default (xml) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(xml, 'text/xml');
  const id = uniqueId();
  const channel = dom.querySelector('channel');
  const feed = {
    id,
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };
  const items = channel.querySelectorAll('item');
  const posts = [];
  items.forEach((item) => {
    const post = {
      feedID: id,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    };

    posts.push(post);
  });

  return { feed, posts };
};
