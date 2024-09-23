import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "./ui/table";
import jsPDF from "jspdf";
import "jspdf-autotable";

type Transaction = {
  id: number;
  date: string;
  time: string;
  total_price: number;
};

type Product = {
  product_id: number;
  name: string;
  amount: number;
  cost_price: number;
  selling_price: number;
  quantity: number;
};

type DetailDialogPrintProps = Transaction;

export function DetailDialogPrint({
  id,
  date,
  time,
  total_price,
}: DetailDialogPrintProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/commandes/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [id]);

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 297], // Small printer-friendly format
    });

    // Placeholder shop information
    const shopName = "Gelato Bak";
    const shopAddressLine1 = "Address Line 1";
    const shopAddressLine2 = "Address Line 2";
    const shopPhone = "Phone Number";

    // Shop Header Section (center aligned)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(shopName, 40, 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(shopAddressLine1, 40, 14, { align: "center" });
    doc.text(shopAddressLine2, 40, 18, { align: "center" });
    doc.text(`Ph: ${shopPhone}`, 40, 22, { align: "center" });

    // Divider line
    doc.line(5, 26, 75, 26);

    // Transaction Information Section (reduced space between lines)
    doc.setFontSize(8);
    doc.text(`Transaction ID: ${id}`, 40, 30, { align: "center" });
    doc.text(`Date: ${date}`, 40, 34, { align: "center" });
    doc.text(`Time: ${time}`, 40, 38, { align: "center" });

    // Divider line
    doc.line(5, 42, 75, 42);

    // Product Table Headers and Rows
    const tableColumn = ["Product Name", "Quantity", "Price", "Total"];
    const tableRows: any[] = [];

    products.forEach((product) => {
      const productData = [
        product.name,
        product.quantity,
        `${product.selling_price.toFixed(2)} DA`,
        `${(product.selling_price * product.quantity).toFixed(2)} DA`,
      ];
      tableRows.push(productData);
    });

    // Ensure the table is centered and reduce row padding
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 46,
      theme: "grid",
      styles: {
        fontSize: 7,
        cellPadding: 0.5,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 25, halign: "center" },
        1: { cellWidth: 15, halign: "center" },
        2: { cellWidth: 15, halign: "center" },
        3: { cellWidth: 15, halign: "center" },
      },
      margin: { left: 5, right: 5 },
      tableWidth: "wrap", // Ensure the table fits within the page
      didDrawCell: (data: any) => {
        // Center the table within the page
        const pageWidth = doc.internal.pageSize.getWidth();
        const tableWidth = data.table.width;
        const marginLeft = (pageWidth - tableWidth) / 2;
        data.cell.x = marginLeft + data.cell.x;
      },
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Total Price Section (reduced line space)
    const totalAmountY = finalY + 4;
    doc.setFontSize(8);
    doc.text(`Total Price: ${total_price.toFixed(2)} DA`, 10, totalAmountY);

    // Footer Section (center aligned and reduced space)
    const footerY = totalAmountY + 8;
    doc.setFontSize(8);
    doc.text("Thank you for your purchase!", 40, footerY, { align: "center" });
    doc.text("Have a Nice Day!", 40, footerY + 4, { align: "center" });

    // Create a Blob from the PDF data
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new window and trigger the print dialog
    const printWindow = window.open(pdfUrl);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
        URL.revokeObjectURL(pdfUrl); // Clean up the URL object
      };
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Details for transaction ID: {id}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto max-h-[400px]">
            {products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.selling_price}DA</TableCell>
                      <TableCell>
                        {product.selling_price * product.quantity} DA
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No products found for this transaction.</p>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <div>
              <Button variant="default" onClick={handlePrint}>
                Print
              </Button>
              <DialogClose>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}