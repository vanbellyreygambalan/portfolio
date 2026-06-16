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
    pdf.text('Web & Mobile Developer  ·  vanbellyrey@gmail.com  ·  +63 9300748861', pageWidth / 2, y, { align: 'center' });
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
    addText('Email: vanbellyrey@gmail.com  ·  Phone: +63 9300748861  ·  LinkedIn: Van Belly Rey Gambalan', 10);

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