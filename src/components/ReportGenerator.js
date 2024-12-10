// src/components/ReportGenerator.js
import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/app_logo.png'; // Убедитесь, что логотип находится в src/assets

function ReportGenerator({ data, onReportGenerated }) {

  useEffect(() => {
    const generatePDF = () => {
      const doc = new jsPDF();

      // Добавление логотипа
      doc.addImage(logo, 'PNG', 14, 10, 30, 30); // x, y, width, height

      // Заголовок отчёта
      doc.setFontSize(18);
      doc.setTextColor(22, 160, 133); // Цвет заголовка
      doc.text("Observation Report", 50, 20);

      // Основная информация в таблице
      const tableColumn = ["Field", "Details"];
      const tableRows = [];

      tableRows.push(["Date", data.date || ""]);
      tableRows.push(["Task Observed", data.taskObserved || ""]);
      tableRows.push(["Observer Number", data.observerNumber || ""]);
      tableRows.push(["Coach Number", data.coachNumber || ""]);
      tableRows.push(["No. of People Observed", data.peopleObserved || ""]);
      tableRows.push(["Employee Type", data.employeeType || ""]);
      tableRows.push(["Department", data.department || ""]);
      tableRows.push(["Location", data.location || ""]);
      tableRows.push(["Time of Day", data.timeOfDay || ""]);
      tableRows.push(["Weather", data.weather || ""]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'striped',
        styles: { halign: 'left' },
        headStyles: { fillColor: [22, 160, 133], halign: 'center' },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      // Категории
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Categories:", 14, doc.lastAutoTable.finalY + 10);

      // Проверка наличия categories
      if (data.categories) {
        // Таблица для подкатегорий
        const categoriesTableColumn = ["Subcategory", "Safe", "Risk"];
        const categoriesTableRows = [];

        // Добавляем данные подкатегорий с проверкой
        const addCategoryRow = (subcategory, category) => {
          categoriesTableRows.push([
            subcategory,
            category.safe ? "✔" : "",
            category.risk ? "✔" : ""
          ]);
        };

        addCategoryRow("1.1 Line of Fire", data.categories.lineOfFire || {});
        addCategoryRow("1.2 Pinch Points", data.categories.pinchPoints || {});
        addCategoryRow("2.1 Lifting and Lowering", data.categories.liftingAndLowering || {});
        addCategoryRow("2.2 Assistance", data.categories.assistance || {});

        doc.autoTable({
          head: [categoriesTableColumn],
          body: categoriesTableRows,
          startY: doc.lastAutoTable.finalY + 5,
          theme: 'grid',
          styles: { halign: 'center', fontStyle: 'bold' },
          headStyles: { fillColor: [22, 160, 133], halign: 'center' },
          columnStyles: {
            0: { halign: 'left' }
          }
        });
      } else {
        doc.text("No categories provided.", 14, doc.lastAutoTable.finalY + 10);
      }

      // Комментарии
      doc.setFontSize(14);
      doc.text("Comments:", 14, doc.lastAutoTable.finalY + 10);
      doc.setFontSize(12);
      doc.text(`${data.comments || ""}`, 14, doc.lastAutoTable.finalY + 16, { maxWidth: 180 });

      // Генерация номера Observation
      let observationNumber = localStorage.getItem('observerNumber');
      if (!observationNumber) {
        observationNumber = 1;
      } else {
        observationNumber = parseInt(observationNumber) + 1;
      }
      localStorage.setItem('observerNumber', observationNumber);

      // Сохранение PDF с номером Observation
      doc.save(`observation_${observationNumber}_${data.date}.pdf`);

      // Сброс данных формы
      localStorage.removeItem('observationData');

      // Вызов колбэка для сброса формы в родительском компоненте
      if (onReportGenerated) {
        onReportGenerated();
      }
    };

    generatePDF();

  }, [data, onReportGenerated]);

  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center">
        <h2>Report Generated</h2>
        <p>Your PDF report has been generated and saved locally.</p>
        <p>Check your downloads folder for the PDF.</p>
      </div>
    </div>
  );
}

export default ReportGenerator;