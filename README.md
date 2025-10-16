MacBook Pro Landing Page — A GSAP & Three.js Showcase

This repository contains the source code for a high-fidelity, fully responsive replica of the Apple MacBook Pro product page. The project is engineered to recreate the immersive, scroll-driven storytelling experience characteristic of Apple's marketing websites. It leverages a powerful animation and 3D rendering stack to deliver a seamless and visually stunning user experience.

The core of this project is the sophisticated integration of the GreenSock Animation Platform (GSAP) for timeline-based animations and Three.js for interactive 3D model rendering, all synchronized with user scroll events.

Core Features & Architecture

The application's dynamic behavior is driven by a carefully orchestrated system of animations and 3D rendering, primarily managed in js/main.js. This system deconstructs the user's scroll journey into a series of captivating visual scenes.

Scroll-Triggered Animation System

The central feature is a scroll-based animation system that controls the playback of complex visual sequences. This is achieved using GSAP's ScrollTrigger plugin, which links animation timelines directly to the viewport's scroll position.

Timeline Orchestration: For each major section of the page (e.g., the chip reveal, display features), a dedicated gsap.timeline() is created. This allows for the precise sequencing of multiple animations—like fades, slides, and scaling effects—that play forward or backward as the user scrolls.

Declarative Animations: A utility function, animateWithGsapTimeline, is used to register different elements and their corresponding animation properties. The main script then orchestrates these timelines with specific ScrollTrigger configurations, such as trigger, start, end, and scrub, to ensure smooth playback.

3D Model Integration with Three.js

To deliver a truly immersive experience, the project dynamically loads and manipulates a 3D model of the MacBook Pro.

Model Loading & Staging: A THREE.Scene is initialized, and a GLTF (GL Transmission Format) loader is used to asynchronously fetch and render the MacBook model. The scene is configured with appropriate lighting (THREE.AmbientLight) and a camera to frame the object correctly.

Scroll-Driven 3D Manipulation: The ScrollTrigger plugin is also used to control the properties of the 3D model. As the user scrolls, the system updates the model's rotation, position, and scale on the fly. This creates the illusion that the user is physically inspecting the product from different angles and distances.

Responsive & Fluid Design

The project is built with a mobile-first philosophy to ensure a consistent experience across all devices.

Dynamic Sizing: JavaScript is used to dynamically detect the viewport size and adjust the 3D model's scale and position accordingly, ensuring it looks great on everything from a small phone to a large desktop monitor.

CSS Media Queries: The stylesheet in css/style.css makes extensive use of media queries to adapt the layout, typography, and spacing for different breakpoints. CSS variables are used for a maintainable and consistent theme.

Tech Stack

Core Framework: HTML5, CSS3, JavaScript (ES6 Modules)

Animation Engine: GSAP (GreenSock Animation Platform) - Specifically leveraging the Core and the ScrollTrigger plugin for high-performance, timeline-based animations.

3D Rendering: Three.js - For loading and manipulating the 3D MacBook model in the browser.

Assets: All images, videos, and 3D models are hosted locally within the assets/ directory.



  Project Structure
MacBook-Pro-Page---Front-End-Project/
```
.
├── assets
│   ├── images
│   │   ├── gpu
│   │   │   ├── hardware.jpg
│   │   │   ├── screen-1.png
│   │   │   ├── screen-2.png
│   │   │   ├── screen-3.png
│   │   │   ├── screen-4.png
│   │   │   ├── screen-5.png
│   │   │   └── screen-6.png
│   │   ├── highlights_apple_intelligence_siri__d970vf0sy32a_large_2x.jpg
│   │   ├── highlights_battery__ua2dmuk7jvmm_large_2x.jpg
│   │   ├── highlights_display__ed8l4csvmfee_large_2x.jpg
│   │   ├── performance_endframe__dspvqz8ncdoy_large.jpg
│   │   ├── performance_startframe__czjd9afmxiqa_large.jpg
│   │   └── welcome_hero_endframe__c61x1mv7kgqe_large.jpg
│   └── videos
│       ├── highlight.mp4
│       ├── highlight2.mp4
│       ├── laptop.mp4
│       └── large.mp4
├── css
│   ├── base
│   │   ├── _base.css
│   │   └── _variables.css
│   ├── components
│   │   ├── _footer.css
│   │   ├── _gpu-burst.css
│   │   ├── _header.css
│   │   ├── _hero.css
│   │   ├── _highlights.css
│   │   └── _m4-chip.css
│   └── style.css
├── index.html
└── js
    ├── main.js
    └── modules
        ├── chipAnimation.js
        ├── gallery.js
        ├── gpuAnimation.js
        ├── headerScroll.js
        └── heroAnimation.js
```
  Configuration & Setup
This project is a static website and does not require a complex build process. You only need a modern web browser and a local web server to run it.

Prerequisites

A modern web browser that supports WebGL (e.g., Chrome, Firefox, Safari, Edge).

A local web server. (Opening index.html directly via the file:// protocol may cause issues with loading 3D models due to browser security policies).

Installation & Execution

Clone the repository:

Bash
git clone https://github.com/daniela-8/MacBook-Pro-Page---Front-End-Project.git
Navigate to the project directory:

Bash
cd MacBook-Pro-Page---Front-End-Project
Run a local web server. If you have Python 3 installed, you can easily start one:

Bash
python -m http.server
Alternatively, you can use the Live Server extension for VS Code.



