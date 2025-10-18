# Integration Guide

##  How to Integrate into Existing Website

### **Method 1: Iframe Integration (Easiest)**
```html
<!-- Add this to your existing website -->
<iframe 
  src="https://erirem.github.io/dijitaxi/" 
  width="100%" 
  height="600px"
  frameborder="0"
  style="border-radius: 12px;">
</iframe>
```

### **Method 2: File Integration (Recommended)**
1. **Clone the repository:**
```bash
git clone https://github.com/erirem/dijitaxi.git
```

2. **Copy files to your project:**
```
your-project/
├── taxi-service/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
```

3. **Update paths in your project:**
```html
<!-- In your main page -->
<a href="taxi-service/index.html">Book a Taxi</a>
```

### **Method 3: Component Integration**
```html
<!-- Include CSS -->
<link rel="stylesheet" href="taxi-service/css/main.css">
<link rel="stylesheet" href="taxi-service/css/components.css">
<link rel="stylesheet" href="taxi-service/css/responsive.css">

<!-- Include HTML -->
<div id="taxi-widget">
  <!-- Copy the content from index.html -->
</div>

<!-- Include JavaScript -->
<script src="taxi-service/js/tabs.js"></script>
<script src="taxi-service/js/main.js"></script>
```

### **Method 4: API Integration**
```javascript
// For backend integration
fetch('/api/taxi-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

##  Integration Benefits

-  **Standalone** - Works independently
-  **Responsive** - Mobile-friendly
-  **Modular** - Easy to customize
-  **Professional** - Production-ready

##  Mobile Integration

```html
<!-- Mobile-optimized iframe -->
<iframe 
  src="https://erirem.github.io/dijitaxi/" 
  width="100%" 
  height="100vh"
  frameborder="0"
  style="border-radius: 0;">
</iframe>
```

##  Customization

### **Styling:**
Edit CSS variables in `css/main.css`:
```css
:root {
  --gold: #your-brand-color;
  --bg: #your-background;
}
```

### **Functionality:**
Extend JavaScript in `js/main.js`:
```javascript
// Add your custom logic
class CustomTaxiApp extends TaxiApp {
  // Your custom methods
}
```
