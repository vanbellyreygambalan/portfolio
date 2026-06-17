window.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const resumeLink = document.querySelector('.resume-link');
  if (resumeLink) {
    resumeLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.print();
    });
  }

  document.querySelectorAll('#menu a').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu) menu.classList.remove('open');
    });
  });
});

function downloadCV(e) {
  if (e) e.preventDefault();

  Swal.fire({
    title: 'Download CV?',
    text: 'This will generate and download your CV as a PDF file.',
    icon: 'question',
    iconColor: '#000000',
    showCancelButton: true,
    confirmButtonText: 'Yes, download it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#000000',
    cancelButtonColor: '#9ca3af',
    background: '#ffffff',
    color: '#111111',
    reverseButtons: true
  }).then((result) => {
    if (!result.isConfirmed) return;

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');

    const margin = 20;
    const pageWidth = 210;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    const addLine = () => {
      pdf.setDrawColor(0);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 5;
    };

    const addText = (text, size, style = 'normal', color = [50, 50, 50]) => {
      pdf.setFontSize(size);
      pdf.setFont('helvetica', style);
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(text, contentWidth);
      pdf.text(lines, margin, y);
      y += lines.length * (size * 0.45) + 3;
    };

    const addTwoCol = (left, right, size = 11) => {
      pdf.setFontSize(size);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(left, margin, y);
      pdf.text(right, pageWidth - margin, y, { align: 'right' });
      y += 6;
    };

    const sectionTitle = (title) => {
      y += 4;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(title.toUpperCase(), margin, y);
      y += 3;
      addLine();
    };

    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('VAN BELLY REY GAMBALAN', pageWidth / 2, y, { align: 'center' });
    y += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text('Web & Mobile Developer  ·  vanbellyrey@gmail.com  ·  +63 9300748861  ·  https://vangambalan.netlify.app/', pageWidth / 2, y, { align: 'center' });
    y += 4;
    pdf.setDrawColor(0);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    sectionTitle('Profile');
    addText('I specialize in web and mobile development, focusing on a precise stack: Laravel for scalable backend engineering and Flutter/Dart for responsive, modern client applications. I thrive on diving deep into API architectures, handling secure data synchronization, and bringing practical, functional applications to life.', 10);

    sectionTitle('Experience');
    addTwoCol('Internship', '2025');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(80, 80, 80);
    pdf.text('Department of Education (DepEd) · Surigao del Sur', margin, y);
    y += 6;
    [
      'Sole developer of the Web-Based File Management System for the SGOD office.',
      'Engineered recursive database mapping for nested directories and secure file streaming.',
      'Implemented custom middleware to protect sensitive administrative assets.'
    ].forEach(b => {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);
      pdf.setFontSize(10);
      pdf.text('•', margin, y);
      const lines = pdf.splitTextToSize(b, contentWidth - 5);
      pdf.text(lines, margin + 4, y);
      y += lines.length * 5 + 1;
    });

    sectionTitle('Education');
    addTwoCol('Bachelor of Science in Computer Science', '2022 — 2026');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(80, 80, 80);
    pdf.text('North Eastern Mindanao State University', margin, y);
    y += 8;

    sectionTitle('Skills');
    addText('HTML  ·  CSS  ·  JavaScript  ·  Dart  ·  Laravel  ·  UI/UX  ·  Flutter', 10);

    sectionTitle('Selected Projects');
    [
      { name: 'File Management System', desc: 'A secure, production-ready system built from scratch to digitize and centralize administrative files for the DepEd Surigao del Sur (SGOD) office. Features recursive database mapping, secure file streaming, and custom middleware access controls.' },
      { name: 'TesDesk', desc: 'An intelligent full-stack web application that automates student onboarding for TESDA. Integrates Gemini AI as a multimodal OCR engine and uses the Levenshtein Distance algorithm to verify applicant data integrity.' }
    ].forEach(p => {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('•  ' + p.name, margin, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);
      const lines = pdf.splitTextToSize(p.desc, contentWidth - 5);
      pdf.text(lines, margin + 4, y);
      y += lines.length * 5 + 3;
    });

    sectionTitle('Contact');
    addText('Email: vanbellyrey@gmail.com  ·  Phone: +63 9300748861  ·  Web: https://vangambalan.netlify.app/  ·  LinkedIn: Van Belly Rey Gambalan', 10);

    pdf.save('Van_Belly_Rey_Gambalan_CV.pdf');

    Swal.fire({
      title: 'Downloaded!',
      text: 'Your CV has been saved.',
      icon: 'success',
      iconColor: '#000000',
      background: '#ffffff',
      color: '#111111',
      timer: 1800,
      showConfirmButton: false
    });
  });
}

const projectsData = {
  1: {
    num: "01",
    title: "File Management System",
    tags: ["Laravel", "PHP", "MySQL"],
    items: [
      {
        image: "assets/projects/fms-tree.jpg",
        caption: "Recursive folder tree",
        description: "The sidebar renders folders at any depth by walking the adjacency list in the database instead of hardcoding levels. Each folder lazy-loads its children on expand, so the tree stays fast even with thousands of nested directories.",
        language: "PHP",
        code: `public function getDescendants(Folder $folder)
{
    return $folder->children()
        ->with('children')
        ->get();
}`
      },
      {
        image: "assets/projects/fms-upload.jpg",
        caption: "Secure upload & streaming",
        description: "Uploaded files never get a public URL. Every download request passes through a controller that checks the requester's role against the folder's permission rules before streaming bytes back.",
        language: "PHP",
        code: `public function download(File $file)
{
    abort_unless($file->folder->isAccessibleBy(auth()->user()), 403);

    return response()->stream(function () use ($file) {
        echo Storage::get($file->path);
    });
}`
      }
    ]
  },
  2: {
    num: "02",
    title: "TesDesk",
    tags: ["Laravel", "PHP", "MySQL", "Gemini"],
    items: [
      {
        image: "assets/projects/tesdesk-ocr.jpg",
        caption: "Gemini OCR extraction",
        description: "Uploaded certificates are sent to Gemini as a multimodal prompt that returns structured JSON — name, school, date, credential number — removing manual transcription.",
        language: "PHP",
        code: `$response = Gemini::generativeModel('gemini-1.5-flash')
    ->generateContent([$certificateImage, $extractionPrompt]);

$fields = json_decode($response->text(), true);`
      },
      {
        image: "assets/projects/tesdesk-verify.jpg",
        caption: "Levenshtein verification",
        description: "Submitted form values are compared against the OCR output. Anything beyond a small edit-distance threshold is flagged for manual review instead of silently accepted.",
        language: "PHP",
        code: `function isMatch(string $submitted, string $extracted, int $threshold = 2): bool
{
    return levenshtein(
        strtolower($submitted),
        strtolower($extracted)
    ) <= $threshold;
}`
      }
    ]
  }
};

let currentProjectId = null;
let currentIndex = 0;

const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('modalCloseBtn');
const copyBtn = document.getElementById('copyBtn');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let lastFocused = null;

function openModal(id) {
  const data = projectsData[id];
  if (!data) return;

  currentProjectId = id;
  currentIndex = 0;

  document.getElementById('modalNum').textContent = data.num;
  document.getElementById('modalTitle').textContent = data.title;

  const tagsWrap = document.getElementById('modalTags');
  tagsWrap.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsWrap.appendChild(span);
  });

  renderDots(data.items.length);
  renderSlide();

  lastFocused = document.activeElement;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function renderDots(count) {
  const dotsWrap = document.getElementById('slideDots');
  dotsWrap.innerHTML = '';
  dotsWrap.style.display = count > 1 ? 'flex' : 'none';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
    dot.addEventListener('click', () => { currentIndex = i; renderSlide(); });
    dotsWrap.appendChild(dot);
  }
}

function renderSlide() {
  const data = projectsData[currentProjectId];
  const item = data.items[currentIndex];

  document.getElementById('modalCaption').textContent = item.caption || '';
  document.getElementById('modalDescription').textContent = item.description;
  document.getElementById('modalLang').textContent = item.language;
  document.getElementById('modalCode').textContent = item.code;

  const img = document.getElementById('modalImage');
  const placeholder = document.getElementById('modalImagePlaceholder');
  if (item.image) {
    img.src = item.image;
    img.alt = item.caption || data.title;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    img.style.display = 'none';
    placeholder.style.display = 'block';
  }

  document.getElementById('slideCounter').textContent = `${currentIndex + 1} / ${data.items.length}`;

  const showArrows = data.items.length > 1;
  prevBtn.style.display = showArrows ? 'flex' : 'none';
  nextBtn.style.display = showArrows ? 'flex' : 'none';

  document.querySelectorAll('#slideDots button').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

function goPrev() {
  const total = projectsData[currentProjectId].items.length;
  currentIndex = (currentIndex - 1 + total) % total;
  renderSlide();
}

function goNext() {
  const total = projectsData[currentProjectId].items.length;
  currentIndex = (currentIndex + 1) % total;
  renderSlide();
}

document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card.dataset.project);
    }
  });
});

closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') goPrev();
  if (e.key === 'ArrowRight') goNext();
});

copyBtn.addEventListener('click', () => {
  const code = document.getElementById('modalCode').textContent;
  navigator.clipboard.writeText(code).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
  });
});

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}