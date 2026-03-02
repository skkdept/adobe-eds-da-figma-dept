export default function decorate(block) {
  const tabs = [];
  [...block.children].forEach((row) => {
    const cell = row.children[0];
    if (cell) {
      tabs.push(cell.textContent.trim());
    }
  });

  const ul = document.createElement('ul');
  ul.classList.add('category-tabs-list');

  tabs.forEach((tab, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = tab;
    button.setAttribute('type', 'button');
    if (index === 0) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      ul.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
    });
    li.append(button);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
