/* =====================================================
   JD DESIGNER — Application Logic
   ===================================================== */

// ---------- STATE ----------
const state = {
  jobTitle: 'Motion Graphic Designer',
  jobTitleFontSize: 36,   // px, applied to SVG text element
  jobTitleAutoFit: true,  // shrinks/grows to fill available width automatically
  footerUrl1: 'www.quantumleap.co.in',
  footerUrl2: 'www.rajivtalreja.com',
  footerUrl3: 'www.karanhasija.com',
  blocks: [
    {
      id: uid(),
      type: 'header',
      title: 'Job Description:'
    },
    {
      id: uid(),
      type: 'paragraph',
      text: 'We are currently hiring a Motion Graphics Designer who will work closely with the marketing team, video producers and other key stakeholders to brainstorm and create high-quality video content that reflects branding priorities. The ideal candidate will have 3-4 years of experience in motion graphics, with strong proficiency in motion graphics tools and video editing softwares.'
    },
    {
      id: uid(),
      type: 'infobox',
      rows: [
        { label: 'Job Type:', value: 'Permanent (On-site)' },
        { label: 'Age:', value: '22 to 34 Years' },
        { label: 'Location:', value: 'Bangalore.' },
        { label: 'Preferred Experience:', value: 'Min. 3 yrs experience' }
      ]
    },
    {
      id: uid(),
      type: 'header',
      title: 'Responsibility Deliverables:'
    },
    {
      id: uid(),
      type: 'bullets',
      items: [
        { text: 'Creating visually stunning motion graphics and animations for various digital media platforms', highlight: false },
        { text: 'Utilizing video software, such as Adobe After Effects, Adobe Premiere Pro, and Cinema 4D, to design and execute captivating motion graphic projects', highlight: false },
        { text: 'Collaborating with the creative team, including graphic designers, video editors, and content creators, to conceptualise and storyboard motion graphic projects that align with brand guidelines and project objectives', highlight: false },
        { text: 'Incorporating typography, visual effects, and sound design to enhance the overall impact and engagement of motion graphic content', highlight: false },
        { text: 'Adapting and optimizing motion graphics for different screen sizes and resolutions to ensure seamless playback on various devices', highlight: false },
        { text: 'Demonstrating a keen eye for aesthetics and attention to detail, ensuring high-quality motion graphic deliverables that meet client requirements and exceed expectations', highlight: false },
        { text: 'Contributing to the creative process by bringing innovative ideas and creative solutions to the table, contributing to the overall success of the design team', highlight: false },
        { text: 'Managing multiple projects simultaneously, adhering to project timelines, and delivering projects on time', highlight: false },
        { text: 'Collaborating with stakeholders to understand project goals, gather feedback, and incorporate revisions to achieve the desired creative vision', highlight: false },
        { text: 'Staying updated with industry trends and best practices, continuously refining skills, and exploring new techniques to push the boundaries of motion graphics design', highlight: false }
      ]
    },
    {
      id: uid(),
      type: 'header',
      title: 'Desired Skills:'
    },
    {
      id: uid(),
      type: 'bullets',
      items: [
        { text: 'You have a degree/diploma in Design, Fine Arts, or a related field', highlight: false },
        { text: 'You have prior experience as a Motion Graphics Designer as well as a strong portfolio of sample projects', highlight: false },
        { text: 'You possess strong knowledge of Adobe After Effects and Adobe Premiere Pro or similar tools', highlight: false },
        { text: 'You have a keen eye for design and aesthetics', highlight: false },
        { text: 'You are organized and can prioritize effectively', highlight: false },
        { text: 'You have excellent communication skills and can clearly articulate your ideas', highlight: false },
        { text: 'You are a strong team player who can collaborate effectively with different stakeholders', highlight: false }
      ]
    },
    {
      id: uid(),
      type: 'linksbox',
      rows: [
        { label: 'Website:', url: 'https://rajivtalreja.com/' },
        { label: 'Company:', url: 'https://quantumleap.co.in/' },
        { label: 'Instagram:', url: 'https://www.instagram.com/rajivtalreja/' },
        { label: 'Youtube:', url: 'https://www.youtube.com/c/RajivTalrejaD' },
        { label: 'LinkedIn:', url: 'https://www.linkedin.com/in/rajivtalreja/' }
      ]
    },
    {
      id: uid(),
      type: 'note',
      text: 'Note: This is a full-time role based in Bangalore and will require you to work from the office.'
    }
  ]
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ---------- SVG COVER ----------
async function loadSVGCover() {
  try {
    const res = await fetch('Page%201.svg');
    const text = await res.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, 'image/svg+xml');
    const svgEl = svgDoc.querySelector('svg');

    // Remove fixed width/height so it fills the container
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const wrap = document.getElementById('svgWrap');
    wrap.innerHTML = '';
    wrap.appendChild(svgEl);

    updateSVGJobTitle();
  } catch (e) {
    document.getElementById('svgWrap').innerHTML =
      '<div class="svg-loading">⚠ Could not load Page 1.svg — make sure it is in the same folder.</div>';
  }
}

// Max width available for job title text in SVG coordinate space.
// SVG viewBox width (595.28) minus left offset (43.58) minus right margin (~42).
const SVG_TITLE_MAX_W = 508;
const FONT_SIZE_MAX = 48;
const FONT_SIZE_MIN = 14;

function updateSVGJobTitle() {
  const jobTitleEl = document.getElementById('Job_Title');
  if (!jobTitleEl) return;

  // Apply font size from state to the <text> element
  jobTitleEl.style.fontSize = state.jobTitleFontSize + 'px';
  jobTitleEl.innerHTML =
    `<tspan class="cls-175" x="0" y="0">${escapeXML(state.jobTitle)}</tspan>`;

  if (state.jobTitleAutoFit) {
    autoFitJobTitle(jobTitleEl);
  }
}

function autoFitJobTitle(jobTitleEl) {
  // Start from the max allowed size, then scale down proportionally to fit
  jobTitleEl.style.fontSize = FONT_SIZE_MAX + 'px';

  const tspan = jobTitleEl.querySelector('tspan');
  if (!tspan) return;

  const textLen = tspan.getComputedTextLength();
  if (textLen <= 0) return;

  let fitted = textLen > SVG_TITLE_MAX_W
    ? Math.floor(FONT_SIZE_MAX * (SVG_TITLE_MAX_W / textLen))
    : FONT_SIZE_MAX;

  fitted = Math.max(FONT_SIZE_MIN, Math.min(FONT_SIZE_MAX, fitted));

  state.jobTitleFontSize = fitted;
  jobTitleEl.style.fontSize = fitted + 'px';

  // Sync slider and display
  const slider = document.getElementById('fontSizeSlider');
  const display = document.getElementById('fontSizeDisplay');
  if (slider) slider.value = fitted;
  if (display) display.textContent = fitted + 'px';
}

function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------- PREVIEW RENDERER ----------
// Page body available height at 100% scale:
// A4 height (1123px) - footer (36px) - top padding (52px) - bottom padding (24px) = 1011px
const CONTENT_HEIGHT = 1011;

// Width of page body in px (A4 794px - left padding 52px - right padding 52px)
const BODY_WIDTH = 690;

function renderPreview() {
  const container = document.getElementById('pagesContainer');
  container.querySelectorAll('.page--content').forEach(p => p.remove());

  // 1. Render all blocks into a hidden measurement container at true page width
  const ruler = document.createElement('div');
  ruler.style.cssText =
    `position:absolute;top:-9999px;left:-9999px;width:${BODY_WIDTH}px;visibility:hidden;pointer-events:none;`;
  ruler.className = 'page__body'; // inherits doc typography
  document.body.appendChild(ruler);

  const rendered = state.blocks.map(block => {
    const el = renderBlock(block);
    ruler.appendChild(el);
    return { block, el, height: el.offsetHeight };
  });

  document.body.removeChild(ruler);

  // 2. Paginate using real heights, keeping headers with their next block
  const pages = [];
  let currentPage = [];
  let usedHeight = 0;

  const flush = () => {
    if (currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [];
      usedHeight = 0;
    }
  };

  rendered.forEach(({ block, height }, idx) => {
    // Would this block overflow the current page?
    if (usedHeight + height > CONTENT_HEIGHT && currentPage.length > 0) {
      flush();
    }

    // Keep header glued to the next block — if both don't fit together, push header to next page
    if (block.type === 'header' && currentPage.length > 0) {
      const next = rendered[idx + 1];
      if (next && usedHeight + height + next.height > CONTENT_HEIGHT) {
        flush();
      }
    }

    currentPage.push(block);
    usedHeight += height;
  });

  flush();

  // 3. Build and append pages
  pages.forEach(blockGroup => {
    container.appendChild(buildContentPage(blockGroup));
  });
}

function buildContentPage(blocks) {
  const page = document.createElement('div');
  page.className = 'page page--content';

  const body = document.createElement('div');
  body.className = 'page__body';

  blocks.forEach(block => {
    body.appendChild(renderBlock(block));
  });

  page.appendChild(body);
  page.appendChild(buildFooter());
  return page;
}

function buildFooter() {
  const footer = document.createElement('div');
  footer.className = 'page__footer';

  const urls = [state.footerUrl1, state.footerUrl2, state.footerUrl3].filter(Boolean);
  urls.forEach((url, i) => {
    const span = document.createElement('span');
    span.className = 'page__footer-text';
    span.textContent = url;
    footer.appendChild(span);
    if (i < urls.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'page__footer-sep';
      sep.textContent = '|';
      footer.appendChild(sep);
    }
  });
  return footer;
}

function renderBlock(block) {
  switch (block.type) {
    case 'header':    return renderHeader(block);
    case 'paragraph': return renderParagraph(block);
    case 'infobox':   return renderInfoBox(block);
    case 'bullets':   return renderBullets(block);
    case 'linksbox':  return renderLinksBox(block);
    case 'note':      return renderNote(block);
    default:          return document.createElement('div');
  }
}

function renderHeader(block) {
  const el = document.createElement('h2');
  el.className = 'doc-header';
  el.textContent = block.title;
  return el;
}

function renderParagraph(block) {
  const el = document.createElement('p');
  el.className = 'doc-paragraph';
  el.textContent = block.text;
  return el;
}

function renderInfoBox(block) {
  const el = document.createElement('div');
  el.className = 'doc-infobox';
  block.rows.forEach(row => {
    const label = document.createElement('div');
    label.className = 'doc-infobox__label';
    label.textContent = row.label;

    const value = document.createElement('div');
    value.className = 'doc-infobox__value';
    value.textContent = row.value;

    el.appendChild(label);
    el.appendChild(value);
  });
  return el;
}

function renderBullets(block) {
  const ul = document.createElement('ul');
  ul.className = 'doc-bullets';
  block.items.forEach(item => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item.text));
    ul.appendChild(li);
  });
  return ul;
}

function renderLinksBox(block) {
  const el = document.createElement('div');
  el.className = 'doc-linksbox';
  block.rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'doc-linksbox__row';

    const label = document.createElement('span');
    label.className = 'doc-linksbox__label';
    label.textContent = row.label;

    const url = document.createElement('span');
    url.className = 'doc-linksbox__url';
    url.textContent = row.url;

    rowEl.appendChild(label);
    rowEl.appendChild(url);
    el.appendChild(rowEl);
  });
  return el;
}

function renderNote(block) {
  const el = document.createElement('div');
  el.className = 'doc-note';
  el.textContent = block.text;
  return el;
}

// ---------- BUILDER RENDERER ----------
function renderBuilder() {
  const list = document.getElementById('blockList');
  list.innerHTML = '';

  state.blocks.forEach((block, idx) => {
    list.appendChild(buildBlockCard(block, idx));
  });
}

function buildBlockCard(block, idx) {
  const card = document.createElement('div');
  card.className = 'block-card';
  card.dataset.id = block.id;

  // Header row
  const head = document.createElement('div');
  head.className = 'block-card__head';

  const badge = document.createElement('span');
  badge.className = `block-badge block-badge--${block.type}`;
  badge.textContent = block.type[0].toUpperCase();

  const label = document.createElement('span');
  label.className = 'block-card__label';
  label.textContent = blockTypeLabel(block.type);

  const actions = document.createElement('div');
  actions.className = 'block-card__actions';

  const upBtn = document.createElement('button');
  upBtn.className = 'btn btn--ghost btn--small';
  upBtn.textContent = '↑';
  upBtn.title = 'Move up';
  upBtn.disabled = idx === 0;
  upBtn.addEventListener('click', () => moveBlock(block.id, -1));

  const downBtn = document.createElement('button');
  downBtn.className = 'btn btn--ghost btn--small';
  downBtn.textContent = '↓';
  downBtn.title = 'Move down';
  downBtn.disabled = idx === state.blocks.length - 1;
  downBtn.addEventListener('click', () => moveBlock(block.id, 1));

  const delBtn = document.createElement('button');
  delBtn.className = 'btn btn--danger btn--small';
  delBtn.textContent = '×';
  delBtn.title = 'Delete block';
  delBtn.addEventListener('click', () => deleteBlock(block.id));

  actions.appendChild(upBtn);
  actions.appendChild(downBtn);
  actions.appendChild(delBtn);

  head.appendChild(badge);
  head.appendChild(label);
  head.appendChild(actions);
  card.appendChild(head);

  // Block-specific inputs
  card.appendChild(buildBlockInputs(block));

  return card;
}

function blockTypeLabel(type) {
  return {
    header:    'Section Header',
    paragraph: 'Paragraph',
    infobox:   'Info / Highlight Box',
    bullets:   'Bullet List',
    linksbox:  'Links Box',
    note:      'Note Box'
  }[type] || type;
}

function buildBlockInputs(block) {
  const wrap = document.createElement('div');

  switch (block.type) {
    case 'header': {
      const input = makeInput(block.title, 'Section title…', val => {
        block.title = val;
        renderPreview();
      });
      wrap.appendChild(input);
      break;
    }

    case 'paragraph': {
      const ta = makeTextarea(block.text, 'Body text…', val => {
        block.text = val;
        renderPreview();
      });
      wrap.appendChild(ta);
      break;
    }

    case 'infobox': {
      const rowsWrap = document.createElement('div');

      const refreshRows = () => {
        rowsWrap.innerHTML = '';
        block.rows.forEach((row, ri) => {
          const rowEl = document.createElement('div');
          rowEl.className = 'row-editor';

          const labelIn = makeInput(row.label, 'Label (bold)', val => {
            row.label = val; renderPreview();
          });
          const valueIn = makeInput(row.value, 'Value', val => {
            row.value = val; renderPreview();
          });
          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn--danger';
          delBtn.textContent = '×';
          delBtn.addEventListener('click', () => {
            block.rows.splice(ri, 1);
            refreshRows();
            renderPreview();
          });

          rowEl.appendChild(labelIn);
          rowEl.appendChild(valueIn);
          rowEl.appendChild(delBtn);
          rowsWrap.appendChild(rowEl);
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'add-row-btn';
        addBtn.textContent = '+ Add row';
        addBtn.addEventListener('click', () => {
          block.rows.push({ label: '', value: '' });
          refreshRows();
          renderPreview();
        });
        rowsWrap.appendChild(addBtn);
      };

      refreshRows();
      wrap.appendChild(rowsWrap);
      break;
    }

    case 'bullets': {
      const itemsWrap = document.createElement('div');

      const refreshItems = () => {
        itemsWrap.innerHTML = '';
        block.items.forEach((item, ii) => {
          const rowEl = document.createElement('div');
          rowEl.className = 'bullet-row';

          const textIn = makeInput(item.text, 'Bullet text…', val => {
            item.text = val; renderPreview();
          });

          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn--danger';
          delBtn.textContent = '×';
          delBtn.addEventListener('click', () => {
            block.items.splice(ii, 1);
            refreshItems();
            renderPreview();
          });

          rowEl.appendChild(textIn);
          rowEl.appendChild(delBtn);
          itemsWrap.appendChild(rowEl);
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'add-row-btn';
        addBtn.textContent = '+ Add bullet';
        addBtn.addEventListener('click', () => {
          block.items.push({ text: '', highlight: false });
          refreshItems();
          renderPreview();
        });
        itemsWrap.appendChild(addBtn);
      };

      refreshItems();
      wrap.appendChild(itemsWrap);
      break;
    }

    case 'linksbox': {
      const rowsWrap = document.createElement('div');

      const refreshRows = () => {
        rowsWrap.innerHTML = '';
        block.rows.forEach((row, ri) => {
          const rowEl = document.createElement('div');
          rowEl.className = 'row-editor';

          const labelIn = makeInput(row.label, 'Label (bold)', val => {
            row.label = val; renderPreview();
          });
          const urlIn = makeInput(row.url, 'https://…', val => {
            row.url = val; renderPreview();
          });
          const delBtn = document.createElement('button');
          delBtn.className = 'btn btn--danger';
          delBtn.textContent = '×';
          delBtn.addEventListener('click', () => {
            block.rows.splice(ri, 1);
            refreshRows();
            renderPreview();
          });

          rowEl.appendChild(labelIn);
          rowEl.appendChild(urlIn);
          rowEl.appendChild(delBtn);
          rowsWrap.appendChild(rowEl);
        });

        const addBtn = document.createElement('button');
        addBtn.className = 'add-row-btn';
        addBtn.textContent = '+ Add link';
        addBtn.addEventListener('click', () => {
          block.rows.push({ label: '', url: '' });
          refreshRows();
          renderPreview();
        });
        rowsWrap.appendChild(addBtn);
      };

      refreshRows();
      wrap.appendChild(rowsWrap);
      break;
    }

    case 'note': {
      const ta = makeTextarea(block.text, 'Note text…', val => {
        block.text = val;
        renderPreview();
      });
      wrap.appendChild(ta);
      break;
    }
  }

  return wrap;
}

// ---------- BLOCK MUTATIONS ----------
function moveBlock(id, direction) {
  const idx = state.blocks.findIndex(b => b.id === id);
  if (idx === -1) return;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= state.blocks.length) return;

  const [block] = state.blocks.splice(idx, 1);
  state.blocks.splice(newIdx, 0, block);

  renderBuilder();
  renderPreview();
}

function deleteBlock(id) {
  const idx = state.blocks.findIndex(b => b.id === id);
  if (idx !== -1) state.blocks.splice(idx, 1);
  renderBuilder();
  renderPreview();
}

function addBlock(type) {
  const defaults = {
    header:    { type: 'header', title: 'New Section:' },
    paragraph: { type: 'paragraph', text: '' },
    infobox:   { type: 'infobox', rows: [{ label: 'Label:', value: 'Value' }] },
    bullets:   { type: 'bullets', items: [{ text: '', highlight: false }] },
    linksbox:  { type: 'linksbox', rows: [{ label: 'Link:', url: 'https://' }] },
    note:      { type: 'note', text: 'Note: ' }
  };

  const block = { id: uid(), ...defaults[type] };
  state.blocks.push(block);
  renderBuilder();
  renderPreview();

  // Scroll new block into view in builder
  setTimeout(() => {
    const card = document.querySelector(`[data-id="${block.id}"]`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

// ---------- INPUT HELPERS ----------
function makeInput(value, placeholder, onChange) {
  const input = document.createElement('input');
  input.className = 'field-input';
  input.type = 'text';
  input.value = value;
  input.placeholder = placeholder;
  input.addEventListener('input', () => onChange(input.value));
  return input;
}

function makeTextarea(value, placeholder, onChange) {
  const ta = document.createElement('textarea');
  ta.className = 'field-textarea';
  ta.value = value;
  ta.placeholder = placeholder;
  ta.addEventListener('input', () => onChange(ta.value));
  return ta;
}

// ---------- GLOBAL INPUTS ----------
function bindGlobalInputs() {
  const jobTitleInput = document.getElementById('jobTitleInput');
  jobTitleInput.addEventListener('input', () => {
    state.jobTitle = jobTitleInput.value;
    updateSVGJobTitle();
  });

  const slider = document.getElementById('fontSizeSlider');
  const display = document.getElementById('fontSizeDisplay');
  const autoBtn = document.getElementById('fontSizeAutoBtn');

  slider.addEventListener('input', () => {
    // Manual adjustment disables auto-fit
    state.jobTitleAutoFit = false;
    autoBtn.classList.remove('active');
    state.jobTitleFontSize = Number(slider.value);
    display.textContent = slider.value + 'px';
    const el = document.getElementById('Job_Title');
    if (el) el.style.fontSize = slider.value + 'px';
  });

  autoBtn.addEventListener('click', () => {
    state.jobTitleAutoFit = true;
    autoBtn.classList.add('active');
    updateSVGJobTitle();
  });

  ['footerUrl1', 'footerUrl2', 'footerUrl3'].forEach(id => {
    document.getElementById(id).addEventListener('input', e => {
      state[id] = e.target.value;
      renderPreview();
    });
  });
}

// ---------- ADD BLOCK MENU ----------
function bindAddBlockMenu() {
  const btn = document.getElementById('addBlockBtn');
  const menu = document.getElementById('addBlockMenu');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.add-block-menu__item').forEach(item => {
    item.addEventListener('click', () => {
      addBlock(item.dataset.type);
      menu.classList.remove('open');
    });
  });

  document.addEventListener('click', () => menu.classList.remove('open'));
}

// ---------- INIT ----------
async function init() {
  bindGlobalInputs();
  bindAddBlockMenu();
  renderBuilder();
  renderPreview();
  await loadSVGCover();
}

document.addEventListener('DOMContentLoaded', init);
