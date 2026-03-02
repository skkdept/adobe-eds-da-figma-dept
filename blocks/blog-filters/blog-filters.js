/**
 * Loads and decorates the blog-filters block
 * Expected structure: list of filter items (categories)
 */
export default function decorate(block) {
  const filterList = document.createElement('div');
  filterList.className = 'blog-filters-wrapper';

  const filterContainer = document.createElement('div');
  filterContainer.className = 'blog-filters';

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];
    if (cells.length > 0) {
      const filterText = cells[0].textContent.trim();
      const button = document.createElement('button');
      button.className = 'blog-filter';
      if (index === 0) button.classList.add('active');
      button.textContent = filterText;
      button.dataset.category = filterText;

      button.addEventListener('click', (e) => {
        document.querySelectorAll('.blog-filter').forEach((b) => {
          b.classList.remove('active');
        });
        e.target.classList.add('active');
        // Trigger filter event if a handler is attached
        window.dispatchEvent(new CustomEvent('blog-filter-change', {
          detail: { category: filterText },
        }));
      });

      filterContainer.append(button);
    }
  });

  filterList.append(filterContainer);
  block.replaceChildren(filterList);
}
