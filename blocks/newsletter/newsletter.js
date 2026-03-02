export default function decorate(block) {
  const rows = [...block.children];

  const container = document.createElement('div');
  container.classList.add('newsletter-content');

  // Row 0: Heading
  if (rows[0]) {
    const heading = document.createElement('h2');
    heading.classList.add('newsletter-heading');
    heading.textContent = rows[0].textContent.trim();
    container.append(heading);
  }

  // Row 1: Description
  if (rows[1]) {
    const desc = document.createElement('p');
    desc.classList.add('newsletter-description');
    desc.textContent = rows[1].textContent.trim();
    container.append(desc);
  }

  // Form
  const form = document.createElement('form');
  form.classList.add('newsletter-form');
  form.addEventListener('submit', (e) => e.preventDefault());

  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter your email address';
  input.required = true;
  input.classList.add('newsletter-input');

  const button = document.createElement('button');
  button.type = 'submit';
  button.classList.add('newsletter-button');
  button.textContent = 'Subscribe';

  form.append(input);
  form.append(button);
  container.append(form);

  // Row 2: Disclaimer
  if (rows[2]) {
    const disclaimer = document.createElement('p');
    disclaimer.classList.add('newsletter-disclaimer');
    disclaimer.textContent = rows[2].textContent.trim();
    container.append(disclaimer);
  }

  block.replaceChildren(container);
}
