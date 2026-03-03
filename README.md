# JD Designer

A browser-based Job Description builder that lets you compose, preview, and export print-ready JD documents as PDFs — no installation required.

**Live App:** [https://16th-psyche.github.io/JD-Designer/](https://16th-psyche.github.io/JD-Designer/)

---

## Overview

JD Designer provides a split-pane interface: a **Builder** panel on the left for editing content, and a live **Preview** panel on the right that renders an A4-formatted document in real time. When you're satisfied, export the document directly to PDF with one click.

---

## Features

- **SVG Cover Page** — Branded cover page (Page 1) with an editable job title that auto-scales to fit the available width.
- **Content Blocks** — Build the body of your JD using six block types:
  - **Section Header** — Bold section title
  - **Paragraph** — Free-form body text
  - **Info / Highlight Box** — Label-value rows for key job details (type, location, experience, etc.)
  - **Bullet List** — Itemised lists with optional orange highlight per bullet
  - **Links Box** — Label + URL rows for social/website links
  - **Note Box** — Callout text for disclaimers or notices
- **Drag-free Reordering** — Move blocks up or down using arrow buttons; delete blocks with the × button.
- **Footer URLs** — Configure up to three URLs that appear in the footer of every content page (Pages 2+).
- **Smart Pagination** — Content is automatically distributed across A4 pages; section headers are kept glued to the block that follows them.
- **PDF Export** — Click **Download PDF** to print/save the document using the browser's native print dialog.

---

## How to Use

1. Open the [live app](https://16th-psyche.github.io/JD-Designer/).
2. Enter the **Job Title** in the left panel — it auto-fits to the cover page.
3. Update the **Footer URLs** if needed.
4. Edit the pre-loaded content blocks or add new ones via **+ Add Block**.
5. Rearrange or delete blocks using the ↑ ↓ × controls on each card.
6. When ready, click **Download PDF** and use your browser's print dialog to save as PDF.

---

## Project Structure

```
JD Designer/
├── index.html   — App shell and builder UI
├── app.js       — State management, rendering, and pagination logic
├── style.css    — App and document styles
└── Page 1.svg   — SVG cover page template
```

---

## Tech Stack

- Pure HTML, CSS, and JavaScript — no build tools or external dependencies.
- PDF export via `window.print()` with print-media CSS rules.

---

Built by **QuantumLeap** · [quantumleap.co.in](https://quantumleap.co.in)
