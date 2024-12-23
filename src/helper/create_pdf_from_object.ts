import html2pdf from "html2pdf.js";

const handlePrintPdfFromObject = (data: { [key: string]: any }, keys: string[], title: string) => {
    const element = document.createElement("div");

    // Create key-value pairs
    keys.forEach((key) => {
        const keyValueDiv = document.createElement("div");
        keyValueDiv.style.marginBottom = "8px";

        const keyElement = document.createElement("strong");
        keyElement.style.display = "inline-block";
        keyElement.style.width = "150px";
        keyElement.textContent = `${key}:`;

        const valueElement = document.createElement("span");
        valueElement.textContent = data[key];

        keyValueDiv.appendChild(keyElement);
        keyValueDiv.appendChild(valueElement);
        element.appendChild(keyValueDiv);
    });

    html2pdf()
        .from(element)
        .set({
            margin: 0.5,
            filename: title,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 1 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .toPdf()
        .save();
};

export default handlePrintPdfFromObject;