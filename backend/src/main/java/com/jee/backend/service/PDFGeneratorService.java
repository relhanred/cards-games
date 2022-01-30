package com.jee.backend.service;

import com.jee.backend.model.User;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service
public class PDFGeneratorService {



    public void export(HttpServletResponse response, List<User> users) throws IOException {
        response.setContentType("application/pdf");
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users.pdf";
        response.setHeader(headerKey, headerValue);
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        float width = document.getPageSize().getWidth();
        float height = document.getPageSize().getHeight();
        // step 3
        document.open();

        // step 4
        float[] columnDefinitionSize = { 33.33F, 33.33F, 33.33F };

        PdfPTable table = null;
        PdfPCell cell = null;
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        table = new PdfPTable(columnDefinitionSize);
        table.getDefaultCell().setBorder(1);
        table.getDefaultCell().setBorderWidth(1);
        table.setHorizontalAlignment(0);
        table.setTotalWidth(width - 72);
        table.setLockedWidth(true);
        Paragraph paragraph = new Paragraph("Liste des utilisateurs", fontTitle);
        paragraph.setSpacingAfter(4);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontCell = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(12);
        cell = new PdfPCell(new Phrase("Email",fontCell));

        table.addCell(cell);
        cell = new PdfPCell(new Phrase("Pseudo",fontCell));
        table.addCell(cell);
        cell = new PdfPCell(new Phrase("Role",fontCell));
        table.addCell(cell);
        for(User user: users) {
            cell = new PdfPCell(new Phrase(user.getEmail()));
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(user.getPseudo()));
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(user.getRole().toString()));
            table.addCell(cell);
        }

        document.add(paragraph);
        document.add(table);
        document.close();
    }
}