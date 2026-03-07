# Itkan Automotive — Website

A custom, high-performance static website built for **Itkan Automotive**, a wholesale automotive spare parts supplier based in Tunisia. 

The website is designed to establish a strong online presence, build trust with spare parts shops, and facilitate seamless quote requests. It features a modern, dark-themed industrial aesthetic tailored to the automotive industry.

## Features

- **Responsive Design**: fully optimized for desktop, tablet, and mobile devices, including a custom mobile hamburger navigation menu.
- **Multilingual Support**: Built-in Google Translate integration with a custom, native-looking dropdown menu (English, French, Arabic, Turkish, Chinese, and Polish).
- **Working Contact Form**: Integrates directly with [Web3Forms](https://web3forms.com/) to send quote requests securely to a designated email inbox, bypassing the need for a backend server. Features loading states, success views, and honeypot spam protection.
- **Dynamic UI**: Includes scroll-reveal animations, interactive number counters for key statistics, and an infinite-scrolling marquee for supported car brands.
- **Static Assets**: 100% plain HTML, CSS, and vanilla JS for fast load times and zero-dependency deployment.

## Project Structure

```
/website
│
├── index.html        # Home page
├── about.html        # About Us page
├── products.html     # Product Catalog page
├── contact.html      # Contact & Quote Request page
│
├── styles.css        # Main stylesheet (all custom CSS)
├── script.js         # Interactive logic, form handling & animations
│
├── assets/           # Images, logos, and icons
│   ├── products/     # Category thumbnails
│   ├── brands/       # Supported car brand logos for marquee
│   └── ...
└── README.md
```

## How to Run Locally

Since this is a static website, you do not need Node.js, Python, or any build tools to run it. 

### Method 1: Direct File Access
Simply double-click the `index.html` file to open it directly in your web browser.

### Method 2: Local Server (Recommended for Testing)
Certain features (like fetching external API requests or handling CORS) work best when served over `http://` instead of `file://`. You can run a simple local web server:

1. Use `npx` (requires Node.js):
   ```bash
   npx http-server ./ -p 8080
   ```
2. Navigate to `http://localhost:8080` in your browser.

## Integrations

- **Web3Forms API**: Routes contact form submissions to the support email address without a backend. *The Access Key can be updated in `contact.html` by replacing the `access_key` hidden input value.*
- **Google Translate Script**: Appended to all `.html` pages to provide auto-translation routing, styled via custom CSS to hide the default widget visual footprint.

## Deployment

This website can be hosted on any static web hosting provider (e.g., GitHub Pages, Vercel, Netlify, Cloudflare Pages, or a standard Apache/Nginx web hosting server). 
No build step is required — simply upload the files directly to your web root.
