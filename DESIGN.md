# Design System

## Direction

Apple HIG-inspired, light-only, minimal, premium, cheerful and friendly.

The interface should feel:

**modern, bright, welcoming, playful, trustworthy and subtly Islamic.**

Core principles:

* Clarity over decoration
* Strong visual hierarchy
* Friendly and approachable UI
* Generous whitespace
* Simple, predictable interactions
* Accessibility first
* Content over chrome
* Cheerful visual details without visual clutter

---

## Color Tokens

```css
--background: #FFFFFF;
--foreground: #000000;

--primary: #38BDF8;
--primary-foreground: #FFFFFF;

--secondary: #22C55E;
--secondary-foreground: #FFFFFF;

--highlight: #FACC15;

--border: #E5E7EB;
--muted-foreground: rgba(0, 0, 0, 0.60);
--subtle-border: #E5E7EB;
--disabled: rgba(0, 0, 0, 0.35);
```

### Color Roles

**Sky Blue `#38BDF8`**

* Primary brand color
* Primary buttons
* Active navigation
* Links
* Interactive highlights

**Green `#22C55E`**

* Secondary actions
* Success states
* Positive feedback
* Supporting UI

**Yellow `#FACC15`**

* Highlights
* Achievements
* Badges
* Friendly decorative accents

**White `#FFFFFF`**

* Main background
* Cards and surfaces
* Primary button text

**Black `#000000`**

* Primary text
* Headings
* Important content

### Rules

* White must remain the dominant background.
* Sky blue is the primary accent.
* Green and yellow are supporting colors.
* Yellow must be used sparingly.
* Do not introduce additional brand colors.
* No gradients.
* No dark mode.
* Avoid using multiple accent colors in one component unless semantically necessary.

---

## Typography

### Persian and Latin

`Estedad`, falling back to system UI fonts.

```text
Display  40–48px / 600
H1       32–36px / 600
H2       24–28px / 600
H3       20–22px / 600
Body     16px / 400
Small    14px / 400
Caption  12px / 400
```

Typography should feel friendly and approachable rather than corporate.

Avoid excessive font weights and oversized headings.

---

## Spacing

Use a 4px base scale:

```text
4  8  12  16  24  32  40  48  64  80
```

Prefer whitespace and clear grouping over additional decoration.

---

## Shape

```text
Small controls: 8–10px
Cards:          12–16px
Dialogs:        16–20px
Pills:          9999px
```

Rounded corners should create a friendly feeling without making every element pill-shaped.

---

## Borders & Elevation

Use Tailwind's standard border token:

```text
border-gray-200
```

All borders should normally be:

```text
border border-gray-200
```

### Shadows

**No box shadows anywhere.**

Do not use:

```text
shadow
shadow-sm
shadow-md
shadow-lg
shadow-xl
drop-shadow
```

Create hierarchy using:

* spacing
* borders
* typography
* surface contrast
* size

---

## Components

All interactive components must define:

```text
default
hover
focus
active
disabled
loading
error
```

Primary actions:

```text
bg-sky-400
text-white
```

Secondary actions:

```text
bg-white
border border-gray-200
text-black
```

Success states:

```text
text-green-500
```

Highlights:

```text
yellow-400
```

### Interactive Rule

**Every element that responds to hover must use:**

```text
cursor-pointer
duration-700
transition
```

Example:

```text
transition duration-700 cursor-pointer
```

This applies to:

* buttons
* links
* cards with interactions
* navigation items
* tabs
* selectable items
* dropdown triggers
* interactive icons
* clickable images
* interactive list items

Do not use `cursor-pointer` on purely static elements.

---

## Hover

Hover states should feel cheerful and friendly, not aggressive.

Preferred effects:

* subtle background changes
* slight color changes
* border color changes
* subtle scale when appropriate

Avoid:

* dramatic movement
* shaking
* bouncing
* glow effects
* shadows

All hover transitions use:

```text
duration-700
```

---

## Layout

* Responsive and mobile-first.
* Use CSS logical properties for RTL/LTR.
* Support Persian `RTL` and English `LTR`.
* Prefer centered content with a maximum width around `1200px`.
* Maintain generous whitespace.
* Avoid dense enterprise-style layouts.

---

## Islamic Visual Language

Islamic influence should be **subtle, modern and cheerful**.

Use:

* geometric symmetry
* Islamic geometric patterns
* eight-point geometry
* structured repetition
* balanced proportions
* simple ornamental linework

Use these primarily in:

* hero sections
* empty states
* subtle backgrounds
* separators
* illustrations

Use the brand palette for Islamic geometric elements:

```text
Sky Blue #38BDF8
Green    #22C55E
Yellow   #FACC15
```

The Islamic identity should come from **geometry, balance and visual rhythm**, not heavy religious imagery.

Avoid excessive:

* mosque illustrations
* crescent and star motifs
* ornamental patterns
* traditional religious website aesthetics

---

## Motion

Motion should make the interface feel **alive, friendly and responsive**.

Interactive hover transitions:

```text
duration-700
```

Use motion for:

* hover
* navigation
* feedback
* expanding content
* state changes

Avoid:

* bouncing
* shaking
* excessive movement
* decorative continuous animations

Respect:

```text
prefers-reduced-motion
```

---

## Accessibility

Target WCAG 2.2 AA.

Required:

* semantic HTML
* keyboard navigation
* visible focus states
* accessible labels
* sufficient contrast
* accessible error states
* reduced-motion support

Never communicate important information through color alone.

---

## Hard Constraints

Never use:

* Dark mode
* Gradients
* Box shadows
* Glow effects
* Neon effects
* Glassmorphism
* Random colors
* Excessive rounded containers
* Excessive Islamic ornamentation
* Inconsistent icon styles
* Arbitrary design values
* Corporate/enterprise-heavy visual patterns

For interactive elements:

```text
transition
duration-700
cursor-pointer
```

must be used consistently.

Prefer reusable design tokens and components over one-off styling.

---

## Design Principle

> **Simple, joyful, friendly, precise, and quietly Islamic.**

The interface should feel like a modern product made for real people — **bright, welcoming and enjoyable to use**, while maintaining Apple's clarity and visual discipline.
