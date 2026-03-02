import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Check for heading row (first row might be a heading like "Latest Articles | 9 articles")
  const rows = [...block.children];
  let headingRow = null;
  const articleRows = [];

  rows.forEach((row) => {
    const cells = [...row.children];
    // If row has an image, it's an article row
    if (row.querySelector('picture')) {
      articleRows.push(row);
    } else if (!headingRow && cells.length <= 2) {
      headingRow = row;
    } else {
      articleRows.push(row);
    }
  });

  const container = document.createElement('div');
  container.classList.add('article-cards-container');

  // Add heading if present
  if (headingRow) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('article-cards-heading');
    const cells = [...headingRow.children];
    const h2 = document.createElement('h2');
    h2.textContent = cells[0]?.textContent.trim() || '';
    headingDiv.append(h2);
    if (cells[1]) {
      const count = document.createElement('span');
      count.classList.add('article-cards-count');
      count.textContent = cells[1].textContent.trim();
      headingDiv.append(count);
    }
    container.append(headingDiv);
  }

  // Build article grid
  const grid = document.createElement('div');
  grid.classList.add('article-cards-grid');

  articleRows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('article');
    card.classList.add('article-card');

    // Image cell (first cell with picture)
    const imageCell = cells.find((c) => c.querySelector('picture'));
    if (imageCell) {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('article-card-image');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          imageDiv.append(
            createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
          );
        }
      }
      card.append(imageDiv);
    }

    // Content cell (cell without picture)
    const contentCell = cells.find((c) => !c.querySelector('picture'));
    if (contentCell) {
      const bodyDiv = document.createElement('div');
      bodyDiv.classList.add('article-card-body');

      const paragraphs = [...contentCell.querySelectorAll('p')];
      const headings = [...contentCell.querySelectorAll('h1, h2, h3, h4, h5, h6')];

      // First paragraph is category
      if (paragraphs[0] && !headings.length) {
        // All content is in paragraphs
        if (paragraphs.length >= 4) {
          const category = document.createElement('span');
          category.classList.add('article-card-category');
          category.textContent = paragraphs[0].textContent.trim();
          bodyDiv.append(category);

          const title = document.createElement('h3');
          title.classList.add('article-card-title');
          title.textContent = paragraphs[1].textContent.trim();
          bodyDiv.append(title);

          const desc = document.createElement('p');
          desc.classList.add('article-card-description');
          desc.textContent = paragraphs[2].textContent.trim();
          bodyDiv.append(desc);

          const metaDiv = document.createElement('div');
          metaDiv.classList.add('article-card-meta');

          // Remaining paragraphs are author | date | read time
          const remaining = paragraphs.slice(3);
          const metaText = remaining.map((p) => p.textContent.trim()).join(' | ');
          const [authorText, dateText, readTimeText] = metaText.split('|').map((s) => s.trim());

          const authorDate = document.createElement('div');
          authorDate.classList.add('article-card-author-date');
          if (authorText) {
            const author = document.createElement('span');
            author.classList.add('article-card-author');
            author.textContent = authorText;
            authorDate.append(author);
          }
          if (dateText) {
            const date = document.createElement('span');
            date.classList.add('article-card-date');
            date.textContent = dateText;
            authorDate.append(date);
          }
          metaDiv.append(authorDate);

          if (readTimeText) {
            const readTime = document.createElement('span');
            readTime.classList.add('article-card-readtime');
            readTime.textContent = readTimeText;
            metaDiv.append(readTime);
          }

          bodyDiv.append(metaDiv);
        }
      } else {
        // Mixed content with headings
        bodyDiv.append(...contentCell.childNodes);
      }

      card.append(bodyDiv);
    }

    grid.append(card);
  });

  container.append(grid);
  block.replaceChildren(container);
}
