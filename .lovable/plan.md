

# 💕 "Deep Love" — Valentine's Day Interactive Web App

## Design & Atmosphere
- **Color palette:** Deep reds (#8B0000, #DC143C), soft pinks (#FFB6C1, #FF69B4), romantic gradients
- **Background:** Continuously floating heart particles animated with GSAP across the entire app
- **Layout:** Full viewport (100vw × 100vh), no scrolling, immersive experience
- **Landscape lock:** Portrait mode shows a full-screen overlay with "Please rotate your phone ❤️" message; app only visible in landscape

## User Flow (4 States)

### State 1 — The Gate (Date Picker)
- Centered minimalist date input with the question: *"Kiedy zaczęła się nasza historia?"*
- User picks a date — correct answer is **12.07.2025**
- ✅ Correct → smooth GSAP fade-out transition to State 2
- ❌ Wrong → shake animation + gentle message *"Spróbuj ponownie kochanie"*

### State 2 — The Trigger
- Large, pulsing heart-shaped PLAY button centered on screen
- Clicking it launches the cinematic experience (State 3)
- This is also the return point after the letter finishes

### State 3 — The Cinema
- Full-screen HTML5 video player (placeholder video, `object-fit: cover`, `playsInline`)
- Background audio track plays simultaneously (Adele placeholder)
- No default controls visible
- When video ends → GSAP smooth fade-out into State 4

### State 4 — The Love Letter
- Dark background (black/deep red) matching the video's final frame
- Centered love letter container
- Text revealed line-by-line using GSAP stagger/typewriter animation
- Placeholder Polish love letter text
- After animation completes, a "Reset" button fades in (bottom-right) → returns to State 2

## Technical Approach
- Install **GSAP** (with TextPlugin) for all animations and transitions
- Clean React component structure: one main controller component managing state, with sub-components for each state
- Tailwind CSS for all styling
- No backend needed — purely front-end experience

