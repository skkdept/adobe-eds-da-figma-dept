import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // Extract the picture from the block
  const picture = block.querySelector('picture');

  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimized = createOptimizedPicture(img.src, img.alt, false, [
        { width: '1200' },
        { width: '750' },
      ]);
      picture.replaceWith(optimized);
    }
  }
}
