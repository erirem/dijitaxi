# Xheko Imperial Taxi Service

Modern, responsive taxi request application for luxury hotel guests.

## 🚀 Features

- ✅ **3-Tab Navigation** - Call a Taxi, My Requests, Active Expedition
- ✅ **Mobile-First Design** - Responsive across all devices
- ✅ **Safari Compatible** - Fixed button positioning issues resolved
- ✅ **Modern UI** - Dark theme with luxury aesthetics
- ✅ **Touch-Friendly** - Optimized for mobile interaction
- ✅ **Modular Architecture** - Clean, maintainable code structure

## 📁 Project Structure

```
dijitaxi/
├── index.html              # Main application file
├── css/
│   ├── main.css           # Base styles & variables
│   ├── components.css     # UI components
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Application logic
│   └── tabs.js           # Tab navigation
├── assets/
│   └── xheko_imperial.png # Hotel logo
└── README.md             # Documentation
```

## 🛠️ Setup

1. **Clone the repository:**
```bash
git clone https://github.com/erirem/dijitaxi.git
cd dijitaxi
```

2. **Open in browser:**
```bash
# Simple HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000
```

3. **Or simply open `index.html` in your browser**

## 🌐 Live Demo

**https://erirem.github.io/dijitaxi/**

## 📱 Browser Support

- ✅ **Chrome/Edge** - Full support
- ✅ **Safari (iOS/macOS)** - Full support with fixes
- ✅ **Firefox** - Full support
- ✅ **Mobile browsers** - Optimized experience

## 🏗️ Architecture

### **CSS Architecture:**
- **main.css** - CSS variables, base styles, typography
- **components.css** - Reusable UI components
- **responsive.css** - Mobile-first media queries

### **JavaScript Architecture:**
- **tabs.js** - Tab navigation functionality (ES6 class)
- **main.js** - Application logic and form handling

### **Key Features:**
- **Modular CSS** - Easy to maintain and extend
- **ES6 Classes** - Modern JavaScript patterns
- **Event Delegation** - Efficient event handling
- **Form Validation** - Ready for backend integration

## 🔧 Development

### **Adding New Features:**
1. **CSS** - Add to appropriate file (main/components/responsive)
2. **JavaScript** - Extend existing classes or create new modules
3. **Components** - Follow existing naming conventions

### **Best Practices:**
- Use CSS custom properties (variables)
- Follow BEM-like naming for components
- Keep JavaScript modular and testable
- Maintain responsive design principles

## 🚀 Production Ready

This application is **production-ready** with:
- ✅ **Clean code structure**
- ✅ **Cross-browser compatibility**
- ✅ **Mobile optimization**
- ✅ **Accessibility considerations**
- ✅ **Performance optimized**

## 📋 Next Steps for Developer

1. **Backend Integration** - Connect to API endpoints
2. **Form Validation** - Enhanced client-side validation
3. **User Authentication** - Add login/session management
4. **Real-time Updates** - WebSocket integration
5. **Database Integration** - Store user requests and history
6. **Push Notifications** - Mobile notification support

## 🎨 Customization

### **Colors:**
Edit CSS variables in `css/main.css`:
```css
:root {
  --bg: #0e0e0f;
  --gold: #a69569;
  /* ... */
}
```

### **Components:**
Modify component styles in `css/components.css`

### **Responsive:**
Adjust breakpoints in `css/responsive.css`

## 📞 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for Xheko Imperial Luxury Hotel & Spa**
