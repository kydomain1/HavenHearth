# HavenHearth Quick Start Guide

Welcome to HavenHearth! This guide will help you get started with your new editorial magazine blog.

## 🚀 Getting Started

### Option 1: Open Locally
1. Navigate to the `D:\HavenHearth` directory
2. Double-click `index.html` to open in your default browser
3. That's it! The website is fully functional

### Option 2: Use a Local Server (Recommended)
For best results, use a local development server:

**Using Python:**
```bash
# Python 3
cd D:\HavenHearth
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run server
cd D:\HavenHearth
http-server

# Then open: http://localhost:8080
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

## 📍 Website Navigation

### Main Pages:
- **Home** (`index.html`) - Featured content and latest articles
- **Category** (`category.html`) - Browse articles by category
- **About** (`about.html`) - Learn about HavenHearth
- **Contact** (`contact.html`) - Get in touch

### Article Categories:
Access via navigation menu or these URLs:
- `category.html?cat=fashion` - Fashion & Accessories
- `category.html?cat=health` - Health & Beauty
- `category.html?cat=home` - Home & Garden
- `category.html?cat=travel` - Travel & Accommodation
- `category.html?cat=finance` - Finance & Insurance
- `category.html?cat=food` - Food & Beverage

### Individual Articles:
- `articles/luxury-sustainable-fashion.html` (March 2025)
- `articles/wellness-routines.html` (January 2025)
- `articles/urban-garden-transformation.html` (May 2025)
- `articles/boutique-hotels-europe.html` (June 2025)
- `articles/artisan-coffee-guide.html` (August 2025)

## ✨ Key Features to Explore

### 1. Search Functionality
- Use the search bar in the header
- Type keywords to filter articles in real-time
- Works on homepage and category pages

### 2. Category Filtering
- Click category badges on the homepage
- Use the filter buttons below "Latest Articles"
- Navigate via the category page

### 3. Responsive Design
- Resize your browser to see mobile/tablet layouts
- Try on actual mobile devices
- All features work across all screen sizes

### 4. Interactive Elements
- Hover over article cards for animations
- Scroll to trigger fade-in effects
- Watch the reading progress bar on article pages
- Click pagination buttons (visual demo)

### 5. Social Sharing
- Social media icons in header and footer
- Share buttons on article pages
- Connected to major platforms

### 6. Newsletter Subscription
- Forms on homepage, category, about, and contact pages
- Email validation included
- Alert confirmation on submission

### 7. Contact Form
- Full contact form with validation
- Subject dropdown menu
- Required field indicators

## 🎨 Customization Tips

### Change Colors:
Edit `css/style.css` and modify the CSS variables:
```css
:root {
    --primary-color: #2C5364;    /* Main brand color */
    --secondary-color: #0F4C75;  /* Secondary accent */
    --accent-color: #3282B8;     /* Call-to-action color */
    /* etc. */
}
```

### Add New Articles:
1. Copy an existing article HTML file from `articles/`
2. Rename and update the content
3. Update image URLs (use Unsplash or your own)
4. Add article card to `index.html` and `category.html`

### Modify Images:
- All images use Unsplash URLs
- Replace with your own by updating `src` attributes
- Format: `https://images.unsplash.com/photo-[ID]?w=[WIDTH]&h=[HEIGHT]&fit=crop`
- Maintain aspect ratios for best results

### Update Content:
- Text content is in standard HTML
- Edit directly in the HTML files
- Maintain existing structure for consistent styling

## 🔧 Troubleshooting

### Images Not Loading?
- Check internet connection (images load from Unsplash CDN)
- Verify image URLs are correct
- Try refreshing the page

### Animations Not Working?
- Ensure AOS library is loading (check browser console)
- Verify JavaScript is enabled
- Clear browser cache and reload

### Styling Issues?
- Check that CSS files are in correct locations
- Verify file paths in `<link>` tags
- Clear browser cache

### Search/Filter Not Working?
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify `js/main.js` is loading correctly

## 📱 Testing Checklist

- [ ] Homepage loads correctly
- [ ] All 5 article pages open
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] All navigation links work
- [ ] Contact form validates
- [ ] Newsletter forms work
- [ ] Mobile responsive (320px+)
- [ ] Tablet responsive (768px+)
- [ ] Desktop optimal (1200px+)
- [ ] Images load properly
- [ ] Animations trigger on scroll
- [ ] Social links are clickable

## 🌐 Browser Testing

Test in these browsers for best compatibility:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance Tips

1. **Optimize Images**: If adding custom images, compress them first
2. **Minimize HTTP Requests**: CSS and JS are already consolidated
3. **Cache Management**: The site uses external CDNs for libraries
4. **Lazy Loading**: Images load as you scroll (built-in)

## 🎯 Next Steps

1. **Personalize Content**: Update text, images, and branding
2. **Add More Articles**: Follow the existing structure
3. **Configure Analytics**: Add Google Analytics if desired
4. **Set Up Hosting**: Deploy to GitHub Pages, Netlify, or Vercel
5. **Connect Forms**: Integrate with backend for actual form submissions

## 💡 Pro Tips

- Use the browser's developer tools (F12) to inspect and modify
- Take advantage of the responsive design testing tools
- The color scheme follows a consistent cool blue palette
- All fonts are web-safe and load from Google Fonts
- Icons use Font Awesome (no additional setup needed)

## 📞 Need Help?

- Review `README.md` for detailed documentation
- Check browser console for error messages
- Verify all files are in correct directories
- Ensure proper file paths (relative vs absolute)

---

**Enjoy your new HavenHearth editorial magazine blog!**

Built with ❤️ using HTML, CSS, and JavaScript

