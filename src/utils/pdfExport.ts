export function printResume(): void {
  window.print();
}

export async function downloadPdfWithHtml2Pdf(
  elementId: string,
  filename: string = 'Curriculo_ATS.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Elemento do currículo não encontrado:', elementId);
    window.print();
    return false;
  }

  // Check if html2pdf library is available from window
  const html2pdf = (window as unknown as { html2pdf?: () => any }).html2pdf;

  if (typeof html2pdf === 'function') {
    try {
      const opt = {
        margin: [0, 0, 0, 0], // In millimeters, page margins are handled by internal CSS
        filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          avoid: ['.ats-section', '.ats-item', '.ats-header'],
        },
      };

      await html2pdf().set(opt).from(element).save();
      return true;
    } catch (err) {
      console.warn('Erro ao gerar via html2pdf, abrindo impressão do navegador:', err);
      window.print();
      return false;
    }
  } else {
    // Fallback directly to native print dialog
    window.print();
    return true;
  }
}
