export const generatePDF = async (htmlContent: string): Promise<void> => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
  
      const pdfBlob = await response.blob();
      
      const nameMatch = htmlContent.match(/<title>(.*?) - Resume<\/title>/);
      const personName = nameMatch ? nameMatch[1] : 'resume';
      const filename = `${personName.replace(/\s+/g, '_')}_resume.pdf`;
      
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };
  
  export const extractResumeHTML = (): string => {
    let resumeContent = document.getElementById('resume-content');
    
    if (!resumeContent) {
      resumeContent = document.querySelector('.resume-template');
    }
    
    if (!resumeContent) {
      const previewContainer = document.getElementById('resume-preview');
      if (previewContainer) {
        const templateContent = previewContainer.querySelector('[class*="resume-template"], [id*="resume"], [class*="template"]');
        if (templateContent) {
          resumeContent = templateContent as HTMLElement;
        }
      }
    }
    
    if (!resumeContent) {
      alert('Resume content not found! Please make sure the template is properly loaded.');
      return '';
    }
  
    // Capture all style rules from the document's stylesheets
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('');
        } catch (e) {
          console.warn('Could not read cssRules from stylesheet:', e);
          return '';
        }
      })
      .join('\n');
    
    const nameElement = resumeContent.querySelector('p.text-\\[\\#101418\\].text-lg.font-bold, h1, h2, .name, [class*="name"]');
    const personName = nameElement?.textContent?.trim() || 'resume';
    
    return createPDFHTML(resumeContent.outerHTML, personName, styles);
  };
  
  const createPDFHTML = (contentHTML: string, personName: string, styles: string): string => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${personName} - Resume</title>
          <style>
            ${styles}
  
            /* PDF-specific overrides for A4 sizing */
            @page {
              margin: 0;
              size: A4;
            }
            body {
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .a4-container {
              width: 210mm !important;
              height: 297mm !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            .resume-template, #resume-content {
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
            /* Remove any conflicting styles */
            .a4-page, .shadow-lg, .rounded-lg {
              box-shadow: none !important;
              border-radius: 0 !important;
            }
          </style>
        </head>
        <body>
          ${contentHTML}
        </body>
      </html>
    `;
  };