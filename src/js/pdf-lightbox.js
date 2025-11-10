(function(){
  const cdn = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js";
  const workerCdn = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js";

  function ensurePdfJs(){
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) return resolve();
      const s = document.createElement('script');
      s.src = cdn;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    }).then(() => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerCdn;
    });
  }

  async function renderPdf(url, container){
    await ensurePdfJs();
    const pdf = await window.pdfjsLib.getDocument({ url }).promise;
    container.innerHTML = "";
    for (let i = 1; i <= pdf.numPages; i++){
      const page = await pdf.getPage(i);

      // Fit-to-width scaling so the “font” looks smaller
      const unscaled = page.getViewport({ scale: 1 });
      const maxWidth = Math.min(container.clientWidth || 900, 900);
      const scale = maxWidth / unscaled.width;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-canvas';
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      container.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
    }
  }

  function fallbackEmbed(url, container){
    container.innerHTML =
      `<embed src="${url}#toolbar=0" type="application/pdf" style="width:100%;height:80vh;border:1px solid var(--border);border-radius:8px;background:#111">`;
  }

  function openModal(title, url){
    const modal = document.querySelector('#pdfModal');
    modal.classList.add('open');
    modal.querySelector('.modal-title').textContent = title;
    const body = modal.querySelector('.modal-body');
    body.innerHTML = '<p class="muted">Loading preview…</p>';
    renderPdf(url, body).catch(err => {
      console.error("PDF.js failed, falling back to <embed>:", err);
      fallbackEmbed(url, body);
    });
  }

  function closeModal(){
    document.querySelector('#pdfModal').classList.remove('open');
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-preview]');
    if (btn){
      e.preventDefault();
      const safeUrl = encodeURI(btn.getAttribute('data-file'));  // handles spaces
      const title = btn.getAttribute('data-title') || 'Preview';
      openModal(title, safeUrl);
    }
    if (e.target.matches('.modal') || e.target.matches('.modal-close')){
      closeModal();
    }
  });
})();
