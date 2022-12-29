const PdfPrinter = require('pdfmake');

exports.printLitSn = () => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
    Times: {
      normal: "Times-Roman",
      bold: "Times-Bold",
      italics: "Times-Italic",
      bolditalics: "Times-BoldItalic",
    },
    Roboto: {
      normal: path.resolve(__dirname, "public", "Roboto-Regular.ttf"),
      bold: path.resolve(__dirname, "public", "Roboto-Bold.ttf"),
    },
  };
};
