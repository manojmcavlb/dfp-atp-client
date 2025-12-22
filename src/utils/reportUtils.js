import html2pdf from 'html2pdf.js';

// prettier-ignore
export const downloadReportAsPDF = (element) => {
    const scrollable = element.querySelector('.scrollable-content');
    const originalMaxHeight = scrollable.style.maxHeight;
    const originalOverflow = scrollable.style.overflow;
    scrollable.style.maxHeight = 'none';
    scrollable.style.overflow = 'visible';
    html2pdf()
        .from(element)
        .save()
        .finally(() => {
            scrollable.style.maxHeight = originalMaxHeight;
            scrollable.style.overflow = originalOverflow;
        });
};

// prettier-ignore
export const printReport = (element) => {
    const printWindow = window.open('', '_blank');
    let contentHTML = element.innerHTML;
    contentHTML = contentHTML
        .replace(/<button/g, '<span')
        .replace(/<\/button>/g, '</span>');
    printWindow.document.write('<html><head><title>View Report</title><style>');
    printWindow.document.write(`
    body { font-family: Arial, sans-serif; margin: 20px; }
    .popup-view-content { padding: 10px; }
    .page-title { font-size: 1.5rem; font-weight: 400; margin-bottom: 20px; }
    .report-title { font-size: 1.2rem; font-weight: 400; }
    .product-name { color: #3498db; font-weight: 700; }
    .serial-info { color: #3498db; margin-bottom: 1.5rem; }
    .action-btns { display: none; }
    .scrollable-content { max-height: none; overflow: visible; }
    .row { display: block; margin-bottom: 10px; }
    .col-md-6 { width: 100%; padding: 0 15px; }
    .col-md-12 { width: 100%; padding: 0 15px; }
    .section-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
    .device-info { margin-bottom: 15px; }
    .label { display: block; margin-bottom: 5px; }
    .lbl-text { font-weight: 700; }
    .lbl-value { font-weight: 500; padding-left: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; font-weight: 600; }
    .btn-right { text-align: right; }
    span.btn-primary { display: inline-block; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; margin-top: 10px; }
    .btn-pass { background-color: #28a745; }
    .btn-fail { background-color: #dc3545; }
    .result-pass { font-weight: bold; color: green; }
    .result-fail { font-weight: bold; color: red; }
  `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(contentHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
};
