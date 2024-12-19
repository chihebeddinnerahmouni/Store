declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | number[];
        filename?: string;
        image?: { type?: string; quality?: number };
        html2canvas?: { scale?: number; logging?: boolean; dpi?: number; letterRendering?: boolean };
        jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
    }

    interface Html2Pdf {
        from(element: HTMLElement): Html2Pdf;
        set(options: Html2PdfOptions): Html2Pdf;
        toPdf(): Html2Pdf;
        save(): void;
    }

    const html2pdf: () => Html2Pdf;
    export default html2pdf;
}