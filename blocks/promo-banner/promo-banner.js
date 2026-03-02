export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const content = row.children[0];
  if (!content) return;

  content.classList.add('promo-banner-content');

  // Style the CTA link
  const link = content.querySelector('a');
  if (link) {
    link.classList.add('promo-banner-cta');
  }
}
