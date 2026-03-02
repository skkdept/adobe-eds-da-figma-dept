import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Loads and decorates the featured-article block
 * Expected structure:
 * - First row: image (left), content (right)
 * - Content structure: category tag, heading, excerpt, author info
 */
export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-article-wrapper';

  if (rows.length > 0) {
    const firstRow = rows[0];
    const cells = [...firstRow.children];

    if (cells.length >= 2) {
      // Left side - image
      const imageCell = cells[0];
      const imageDiv = document.createElement('div');
      imageDiv.className = 'featured-article-image';

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
          imageDiv.append(optimized);
        }
      }

      // Right side - content
      const contentCell = cells[1];
      const contentDiv = document.createElement('div');
      contentDiv.className = 'featured-article-content';

      while (contentCell.firstElementChild) {
        contentDiv.append(contentCell.firstElementChild);
      }

      wrapper.append(imageDiv);
      wrapper.append(contentDiv);
    }
  }

  block.replaceChildren(wrapper);
}
