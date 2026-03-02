import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Loads and decorates the featured-article block
 * Expected row structure:
 *   Row 0: image
 *   Row 1: category tag
 *   Row 2: title
 *   Row 3: description
 *   Row 4: byline (author | date · read time)
 *   Row 5: CTA link
 */
export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'featured-article-inner';

  // Image
  const imageDiv = document.createElement('div');
  imageDiv.className = 'featured-article-image';
  if (rows[0]) {
    const picture = rows[0].querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        imageDiv.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '800' }]));
      }
    }
  }

  // Content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'featured-article-content';

  // Category
  if (rows[1]) {
    const category = document.createElement('span');
    category.className = 'featured-article-category';
    category.textContent = rows[1].textContent.trim();
    contentDiv.append(category);
  }

  // Title
  if (rows[2]) {
    const title = document.createElement('h2');
    title.className = 'featured-article-title';
    title.textContent = rows[2].textContent.trim();
    contentDiv.append(title);
  }

  // Description
  if (rows[3]) {
    const desc = document.createElement('p');
    desc.className = 'featured-article-description';
    desc.textContent = rows[3].textContent.trim();
    contentDiv.append(desc);
  }

  // Byline
  if (rows[4]) {
    const bylineText = rows[4].textContent.trim();
    const byline = document.createElement('div');
    byline.className = 'featured-article-byline';

    const [authorText, metaText] = bylineText.split('|').map((s) => s.trim());
    if (authorText) {
      const author = document.createElement('span');
      author.className = 'featured-article-author';
      author.textContent = authorText;
      byline.append(author);
    }
    if (metaText) {
      const meta = document.createElement('span');
      meta.className = 'featured-article-meta';
      meta.textContent = metaText;
      byline.append(meta);
    }
    contentDiv.append(byline);
  }

  // CTA
  if (rows[5]) {
    const link = rows[5].querySelector('a');
    if (link) {
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.className = 'featured-article-cta';
      cta.textContent = `${link.textContent.trim()} ›`;
      contentDiv.append(cta);
    }
  }

  wrapper.append(imageDiv);
  wrapper.append(contentDiv);
  block.replaceChildren(wrapper);
}
