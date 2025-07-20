# Craigslist - Modern Classifieds Dashboard 🚀

A futuristic, Gen Z-inspired Craigslist platform built with pure HTML, CSS, and JavaScript. Features stunning glassmorphism effects, custom animations, interactive games, and a modern UI/UX design.

![Craigslist Preview](https://via.placeholder.com/800x400/6366f1/ffffff?text=Craigslist+Preview)

## ✨ Features

### 🎨 Visual Design

- **Glassmorphism Effects** - Frosted glass cards with backdrop blur
- **Custom Cursor** - Smooth animated cursor with trail effects
- **Gradient Backgrounds** - Animated gradient backgrounds
- **3D Elements** - Floating elements and parallax effects
- **Neon Color Palette** - Vibrant Gen Z-inspired colors
- **Sparkles Animation** - Floating sparkles throughout the site
- **Interactive Logo** - Clickable "Craigslist" letters with effects
- **Responsive Design** - Beautiful across all devices

### 🔧 Functionality

- **Smart Search** - Real-time search with suggestions
- **Category Filtering** - Browse by category with smooth animations
- **Multi-step Form** - Beautiful form with progress tracking
- **Image Upload** - Drag & drop image upload with preview
- **Theme Toggle** - Dark/light mode switching
- **Profile System** - User profiles with stats and badges
- **Toast Notifications** - Elegant notification system
- **Interactive Game** - Sparkle-catching mini-game
- **Sound Effects** - Audio feedback for interactions

### 📱 Sections

- **Hero Section** - Animated landing with search
- **Listings Dashboard** - Responsive grid of classified ads
- **Post Ad Form** - Multi-step form with live preview
- **Profile Page** - User dashboard with activity tracking
- **Interactive Game** - Fun sparkle-catching mini-game
- **Footer** - Sparkle rain animation

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - No frameworks, pure JS
- **GSAP** - Professional animations
- **Three.js** - 3D effects (optional)
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/neolist.git
   cd neolist
   ```

2. **Open in browser**

   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start exploring!**
   - Navigate through different sections
   - Try the search functionality
   - Post a sample ad
   - Toggle themes
   - Experience the animations

## 📁 Project Structure

```
neolist/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Images and other assets (optional)
```

## 🎨 Design System

### Color Palette

```css
/* Gen Z Neon */
--neon-purple: #A855F7
--neon-blue: #0EA5E9
--neon-green: #10B981
--neon-yellow: #FACC15
--neon-pink: #EC4899
--neon-orange: #F97316

/* Cosmic Futuristic */
--cosmic-dark: #0F172A
--cosmic-navy: #1E293B
--cosmic-light: #38BDF8
```

### Typography

- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)
- **Mono Font**: JetBrains Mono (code)

### Spacing Scale

```css
--spacing-xs: 0.25rem  /* 4px */
--spacing-sm: 0.5rem   /* 8px */
--spacing-md: 1rem     /* 16px */
--spacing-lg: 1.5rem   /* 24px */
--spacing-xl: 2rem     /* 32px */
--spacing-2xl: 3rem    /* 48px */
--spacing-3xl: 4rem    /* 64px */
```

## 🔧 Customization

### Adding New Categories

1. Add category card in `index.html`:

   ```html
   <div class="category-card" data-category="your-category">
     <div class="category-icon">
       <i class="fas fa-your-icon"></i>
     </div>
     <span>Your Category</span>
   </div>
   ```

2. Add to form select in `index.html`:
   ```html
   <option value="your-category">Your Category</option>
   ```

### Modifying Colors

Update CSS custom properties in `styles.css`:

```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... */
}
```

### Adding Animations

Use GSAP for complex animations:

```javascript
gsap.from(".your-element", {
  duration: 1,
  y: 50,
  opacity: 0,
  ease: "power3.out",
});
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🎯 Key Features Explained

### Custom Cursor

The custom cursor provides a unique interactive experience:

- Follows mouse movement with smooth transitions
- Scales and changes color on hover
- Includes a trailing effect

### Glassmorphism Cards

Glass cards use backdrop-filter for the frosted glass effect:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Form Validation

Real-time form validation with visual feedback:

- Required field checking
- Visual error states
- Success notifications

### Search System

Smart search with:

- Real-time suggestions
- Category filtering
- Keyboard shortcuts (Ctrl/Cmd + K)

## 🚀 Performance Optimizations

- **CSS Custom Properties** - Efficient theming
- **Intersection Observer** - Optimized scroll animations
- **Event Delegation** - Reduced event listeners
- **Debounced Resize** - Smooth responsive behavior
- **Lazy Loading** - Images load on demand

## 🎨 Animation System

### CSS Animations

- `float` - Floating elements
- `glow` - Pulsing glow effects
- `slideUp` - Slide up from bottom
- `fadeIn` - Fade in effects
- `scaleIn` - Scale in animations

### GSAP Animations

- Hero section entrance animations
- Parallax scrolling effects
- Staggered card animations
- Smooth transitions

## 🔧 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📝 Usage Examples

### Creating a Toast Notification

```javascript
showToast("Your message here", "success");
// Types: 'success', 'error', 'warning', 'info'
```

### Loading States

```javascript
showLoading();
// Do something async
hideLoading();
```

### Theme Toggle

```javascript
toggleTheme(); // Switches between dark/light
```

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Real-time messaging
- [ ] Advanced filtering options
- [ ] Image gallery improvements
- [ ] PWA capabilities
- [ ] Backend integration
- [ ] Payment processing
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for icons
- **Google Fonts** for typography
- **GSAP** for animations
- **Three.js** for 3D effects
- **Unsplash** for sample images

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ for the modern web**
