import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Loads and decorates the blog block
 * Expected structure:
 * Each row contains: image, category, title, excerpt, author, date, read time
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'blog-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'blog-item';

    const cells = [...row.children];

    // Extract content from cells
    if (cells[0]) {
      const picture = cells[0].querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
          const imageDiv = document.createElement('div');
          imageDiv.className = 'blog-item-image';
          imageDiv.append(optimized);
          li.append(imageDiv);
        }
      }
    }

    // Content wrapper
    const contentDiv = document.createElement('div');
    contentDiv.className = 'blog-item-content';

    // Process remaining cells
    for (let i = 1; i < cells.length; i += 1) {
      const cell = cells[i];
      const text = cell.textContent.trim();

      if (i === 1) {
        // Category
        const categoryTag = document.createElement('p');
        categoryTag.className = 'blog-category';
        categoryTag.textContent = text;
        contentDiv.append(categoryTag);
      } else if (i === 2) {
        // Title
        const title = document.createElement('h3');
        title.className = 'blog-title';
        title.textContent = text;
        contentDiv.append(title);
      } else if (i === 3) {
        // Excerpt
        const excerpt = document.createElement('p');
        excerpt.className = 'blog-excerpt';
        excerpt.textContent = text;
        contentDiv.append(excerpt);
      } else if (i === 4) {
        // Author
        const author = document.createElement('span');
        author.className = 'blog-author';
        author.textContent = text;
        contentDiv.append(author);
      } else if (i === 5) {
        // Date
        const date = document.createElement('span');
        date.className = 'blog-date';
        date.textContent = text;
        contentDiv.append(date);
      } else if (i === 6) {
        // Read time
        const readTime = document.createElement('span');
        readTime.className = 'blog-read-time';
        readTime.textContent = text;
        contentDiv.append(readTime);
      }
    }

    li.append(contentDiv);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
