import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  const article = document.createElement('article');
  article.classList.add('featured-article-card');

  // Row 0: Image
  const imageRow = rows[0];
  if (imageRow) {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featured-article-image');
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        picture.replaceWith(
          createOptimizedPicture(img.src, img.alt, true, [{ width: '1200' }]),
        );
      }
      imageDiv.append(imageRow.querySelector('picture') || picture);
    }
    article.append(imageDiv);
  }

  // Body content
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('featured-article-body');

  // Row 1: Category
  if (rows[1]) {
    const category = document.createElement('span');
    category.classList.add('featured-article-category');
    category.textContent = rows[1].textContent.trim();
    bodyDiv.append(category);
  }

  // Row 2: Title
  if (rows[2]) {
    const title = document.createElement('h1');
    title.classList.add('featured-article-title');
    title.textContent = rows[2].textContent.trim();
    bodyDiv.append(title);
  }

  // Row 3: Description
  if (rows[3]) {
    const desc = document.createElement('p');
    desc.classList.add('featured-article-description');
    desc.textContent = rows[3].textContent.trim();
    bodyDiv.append(desc);
  }

  // Row 4: Author + Date
  const metaDiv = document.createElement('div');
  metaDiv.classList.add('featured-article-meta');

  if (rows[4]) {
    const [authorText, dateText] = rows[4].textContent.trim().split('|').map((s) => s.trim());
    const authorDate = document.createElement('div');
    authorDate.classList.add('featured-article-author-date');
    if (authorText) {
      const author = document.createElement('span');
      author.classList.add('featured-article-author');
      author.textContent = authorText;
      authorDate.append(author);
    }
    if (dateText) {
      const date = document.createElement('span');
      date.classList.add('featured-article-date');
      date.textContent = dateText;
      authorDate.append(date);
    }
    metaDiv.append(authorDate);
  }

  // Row 5: Read More link
  if (rows[5]) {
    const link = rows[5].querySelector('a') || document.createElement('a');
    if (!link.href) link.href = '#';
    link.classList.add('featured-article-readmore');
    if (!link.textContent.trim()) link.textContent = 'Read More';
    link.innerHTML = `${link.textContent} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    metaDiv.append(link);
  }

  bodyDiv.append(metaDiv);
  article.append(bodyDiv);
  block.replaceChildren(article);
}
