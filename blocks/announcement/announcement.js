/**
 * Loads and decorates the announcement block
 * Expected structure: Simple content with message and optional link
 */
export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'announcement-wrapper';

  // Get all content from the block
  const content = document.createElement('div');
  content.className = 'announcement-content';

  while (block.firstElementChild) {
    const element = block.firstElementChild;
    const text = element.textContent.trim();

    // Check if it's a link
    const link = element.querySelector('a');
    if (link) {
      const span = document.createElement('span');
      span.className = 'announcement-text';
      // Get text before link
      const beforeLink = Array.from(element.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join(' ');

      if (beforeLink) {
        span.textContent = `${beforeLink.trim()} `;
      }

      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'announcement-link';
      a.textContent = link.textContent;
      a.title = link.title || link.textContent;

      content.append(span, a);
    } else if (text) {
      const span = document.createElement('span');
      span.className = 'announcement-text';
      span.textContent = text;
      content.append(span);
    }

    element.remove();
  }

  wrapper.append(content);
  block.replaceChildren(wrapper);
}
