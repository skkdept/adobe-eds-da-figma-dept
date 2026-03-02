# TurboTax Blog Page - EDS Implementation

This project implements the TurboTax blog page design using Adobe Edge Delivery Services (EDS) blocks and vanilla JavaScript.

## Blocks Implemented

### 1. **Announcement Block** (`/blocks/announcement/`)
Displays a banner announcement at the top of the page.

**Expected HTML Structure:**
```html
<div class="announcement">
  <p>File taxes confidently. Get your biggest refund, guaranteed. <a href="#">Start for Free ›</a></p>
</div>
```

**Features:**
- Dark navy background with white text
- Optional link support
- Responsive padding
- Mobile-friendly

### 2. **Featured Article Block** (`/blocks/featured-article/`)
Displays a large featured article with image and content side-by-side.

**Expected HTML Structure:**
```html
<div class="featured-article">
  <div>
    <!-- Left: Image -->
    <picture>
      <img src="..." alt="...">
    </picture>
  </div>
  <div>
    <!-- Right: Content -->
    <p>Tax Tips</p>
    <h1>Article Title</h1>
    <p>Article excerpt...</p>
    <p class="byline">
      <span class="author">Author Name</span>
      <span class="meta">Date • Read Time</span>
    </p>
    <p><a href="#">Read More →</a></p>
  </div>
</div>
```

**Features:**
- Two-column grid layout (responsive to single column on mobile)
- Optimized image handling
- Category tag styling with TurboTax green
- Author and date metadata
- Hover effects

### 3. **Blog Filters Block** (`/blocks/blog-filters/`)
Displays category filter buttons for filtering blog posts.

**Expected HTML Structure:**
```html
<div class="blog-filters">
  <div><p>All</p></div>
  <div><p>Tax Tips</p></div>
  <div><p>Deductions & Credits</p></div>
  <!-- Additional categories... -->
</div>
```

**Features:**
- Active state styling
- Responsive button layout
- Light gray background
- Dispatches custom events for filtering
- Touch-friendly on mobile

### 4. **Blog Block** (`/blocks/blog/`)
Displays a grid of blog post cards with image, category, title, excerpt, and metadata.

**Expected HTML Structure:**
```html
<div class="blog">
  <div>
    <!-- Image -->
    <picture>
      <img src="..." alt="...">
    </picture>
  </div>
  <div><p>Category Name</p></div>
  <div><h2>Article Title</h2></div>
  <div><p>Article excerpt...</p></div>
  <div><p>Author Name</p></div>
  <div><p>Date</p></div>
  <div><p>Read Time</p></div>
</div>
```

**Features:**
- Responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Hover effects with shadow and slight lift
- Optimized images
- Category tags with TurboTax green
- Metadata display (author, date, read time)
- Flexible height cards

## Color Scheme

The implementation uses the TurboTax brand colors defined in `/styles/styles.css`:

```css
--turbotax-green: #1b9b5b;        /* Primary action color */
--turbotax-dark-navy: #1a1a3e;    /* Headers, dark elements */
--turbotax-yellow: #ffd900;        /* Secondary accent */
--turbotax-light-gray: #f5f5f5;   /* Backgrounds */
--turbotax-text-gray: #5a5a5a;    /* Body text */
```

## Responsive Breakpoints

All blocks are optimized for three main breakpoints:

- **Mobile**: < 600px
- **Tablet**: 600px - 900px
- **Desktop**: ≥ 900px

## Development Notes

1. **Images**: All images are automatically optimized using the `createOptimizedPicture()` helper from the AEM library.

2. **Styling**: 
   - All CSS is scoped to block selectors
   - Modern CSS features (Grid, Flexbox) are used
   - Mobile-first approach with min-width media queries

3. **JavaScript**:
   - ES6+ features without transpiling
   - Event delegation for interactivity
   - Custom events for cross-block communication

4. **Accessibility**:
   - Semantic HTML5 elements
   - Proper heading hierarchy
   - ARIA labels where necessary
   - Focus-friendly button interactions

## Testing Page

A test page is available at `/drafts/turbotax-blog.html` for local development before publishing to the CMS.

To test locally:
```bash
aem up --html-folder drafts
```

Then navigate to: `http://localhost:3000/drafts/turbotax-blog`

## Files Modified

- `/blocks/hero/hero.js` - Updated with image optimization
- `/blocks/hero/hero.css` - Enhanced styling with overlay and responsiveness
- `/blocks/cards/cards.css` - Updated grid and card styling
- `/styles/styles.css` - Added TurboTax brand color variables
- `/blocks/announcement/` - New block (announcement banner)
- `/blocks/featured-article/` - New block (featured article)
- `/blocks/blog-filters/` - New block (category filters)
- `/blocks/blog/` - New block (blog post grid)
- `/drafts/turbotax-blog.html` - Test content file

## Performance Considerations

- Images are lazy-loaded by default
- Grid layouts use CSS Grid for optimal performance
- No unnecessary dependencies or build steps
- Minimal JavaScript footprint
- CSS animations use GPU-accelerated properties (transform, opacity)
