const jumbotron = () => {
  const jumbotronElement = document.createElement('div');
  jumbotronElement.classList.add('jumbotron');
  const title = document.createElement('h1');
  title.classList.add('text-center');
  title.textContent = 'RSS Reader';
  const form = document.createElement('form');
  const formGroup = document.createElement('div');
  formGroup.classList.add('form-group');
  formGroup.innerHTML = '<input class="form-control" id="inputInfo" placeholder="">';
  const submit = document.createElement('button');
  submit.setAttribute('type', 'submit');
  submit.classList.add('btn', 'btn-primary');
  submit.disabled = true;
  submit.textContent = 'add feed';
  form.append(formGroup, submit);
  jumbotronElement.append(title, form);
  return jumbotronElement;
};

const content = () => {
  const container = document.createElement('div');
  container.classList.add('container-fluid');
  const row = document.createElement('div');
  row.classList.add('row');
  const column = document.createElement('div');
  column.classList.add('col-lg-3', 'border-right', 'mb-4');
  const feed = document.createElement('div');
  feed.classList.add('feeds');
  const feedInner = document.createElement('div');
  const feedHeader = document.createElement('h3');
  feedHeader.classList.add('feedHeader', 'text-center', 'border-bottom', 'mb-3', 'pb-sm-2');
  feedInner.append(feedHeader);
  column.append(feedInner, feed);
  const post = document.createElement('div');
  post.classList.add('col-lg-9', 'posts');
  row.append(column, post);
  container.append(row);

  return container;
};

const footer = () => {
  const footerElement = document.createElement('footer');
  const copyright = document.createElement('div');
  copyright.classList.add('text-center', 'py-2', 'd-flex', 'justify-content-center', 'align-items-center');
  const copyrightLink = document.createElement('a');
  copyrightLink.classList.add('btn', 'btn-link');
  copyrightLink.setAttribute('type', 'button');
  copyrightLink.href = 'https://github.com/Shramkoweb';
  copyrightLink.textContent = 'GitHub account.';
  copyright.textContent = '© Serhii Shramko, 2020.';
  copyright.append(copyrightLink);
  footerElement.classList.add('fixed-bottom', 'bg-light', 'border-top');
  footerElement.append(copyright);
  return footerElement;
};

export default () => {
  const root = document.getElementById('root');
  root.append(jumbotron(), content(), footer());
};
