📋 Project Overview
DisabilityAware is a comprehensive, accessibility-focused educational web application built with ASP.NET Core MVC. The platform provides detailed information about various disabilities, support services, educational resources, and inclusion best practices, all while maintaining strict accessibility standards.

🏗️ Project Architecture
Technology Stack
Backend: ASP.NET Core 7.0 MVC

Frontend: HTML5, CSS3, JavaScript (ES6+)

UI Framework: Bootstrap 5.3

JavaScript Libraries: jQuery 3.6

Icons: Font Awesome 6.4

Fonts: Inter + Space Grotesk (Google Fonts)

Styling: Custom CSS with CSS Variables

Deployment: Local development (IIS Express)


🚀 Features & Functionality
1. Core Accessibility Features
Accessibility Toolbar (Fixed Position)
Font Size Adjustment: Increase/Decrease text size (12px to 30px range)

High Contrast Mode: Toggle black/white contrast theme

Text-to-Speech: Full page content reading using Web Speech API

Stop Speech: Interrupt reading functionality

Persistent Settings: User preferences saved in localStorage

Navigation Features
Responsive navigation with Bootstrap 5

Active page highlighting

Sticky navigation with scroll effects

Smooth scrolling for anchor links

Back-to-top button

2. Content Pages
Home Page (Index.cshtml)
Hero Section: Gradient background with animations

Educational Cards: 6 disability categories with detailed information

Statistics Section: Key disability facts with animated cards

Support Section: Inclusion principles with check items

Responsive Design: Mobile-first approach

Disability Types Page (Types.cshtml)
Detailed information about various disabilities

Categorized content with filtering

Interactive tables and cards

Resource links and references

Support Services Page (Services.cshtml) - MOST COMPREHENSIVE
6 Service Categories: Assistive tech, personal support, educational, employment, housing, health

Technology Assessment Tool: Interactive form with recommendations

Funding Resources: South African specific grants and assistance

Service Provider Directory: Extensive table with 150+ links

Interactive Forms: Service requests with modal confirmations

Quick Access Resources: Downloadable materials and tutorials

Resources Page (Resources.cshtml)
Educational materials and guides

Downloadable resources

Training calendars

Search functionality

Inclusion Guide Page (Inclusion.cshtml)
Best practices for inclusion

Accessibility guidelines

Community resources

Training materials

3. Technical Features
CSS Architecture (site.css - 5,000+ lines)
CSS Custom Properties: Comprehensive design system

Modern Gradients: 4 predefined gradient combinations

Animation System: Keyframes and transitions

Responsive Breakpoints: Mobile-first responsive design

Component-Based Structure: Modular CSS components

JavaScript Functionality (site.js)
Accessibility Controls: Font sizing, contrast, speech synthesis

Form Handling: Newsletter subscription, service requests

UI Interactions: Modals, toasts, animations

Scroll Management: Intersection Observer for animations

Local Storage: User preference persistence

🎨 Design System
Color Palette (CSS Variables)
css
:root {
    --primary: #6366f1;      /* Indigo */
    --primary-dark: #4f46e5;
    --secondary: #8b5cf6;    /* Purple */
    --accent: #ec4899;       /* Pink */
    --success: #10b981;      /* Emerald */
    --warning: #f59e0b;      /* Amber */
    --danger: #ef4444;       /* Red */
    --light: #f8fafc;        /* Light gray */
    --dark: #0f172a;         /* Dark blue */
    --gray: #64748b;         /* Gray */
}
Typography
Body Font: Inter (300-800 weights)

Headings: Space Grotesk (400-700 weights)

Base Size: 16px (adjustable via toolbar)

Line Height: 1.7 for optimal readability

Gradient System
--gradient-1: #667eea → #764ba2 (Primary)

--gradient-2: #f093fb → #f5576c (Secondary)

--gradient-3: #4facfe → #00f2fe (Info)

--gradient-4: #43e97b → #38f9d7 (Success)

⚡ Performance & Optimization
Frontend Optimization
CSS Minification: Combined and minified styles

JavaScript Optimization: Minified and bundled

Image Optimization: Responsive images with lazy loading

Font Optimization: Local font loading strategy

Accessibility Compliance
WCAG 2.1 AA: Meets international standards

Keyboard Navigation: Full keyboard support

Screen Reader Compatible: ARIA labels and semantic HTML

Color Contrast: Minimum 4.5:1 ratio maintained

🛠️ Development Setup
Prerequisites
.NET 7.0 SDK or later

Visual Studio 2022 or VS Code

Node.js (for optional frontend tooling)

Modern web browser (Chrome 90+, Firefox 88+, Safari 14+
