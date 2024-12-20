import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui/table";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ConfirmationDialog from "../../ConfirmationDialog";
import { information } from "../../lib/infomations";

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

type DetailDialogProps = Transaction & {
  handleDelete: (id: number) => void;
};

export function DetailDialog({
  id,
  date,
  time,
  total_price,
  handleDelete,
}: DetailDialogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/commandes/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        console.log(data);
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
    const shopName = information.shop_name;
    const shopAddressLine1 = information.shop_address_line1;
    const shopAddressLine2 = information.shop_address_line2;
    const shopPhone = information.phone_number;

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
    doc.text(information.thanks_message, 40, footerY, { align: "center" });

    // Create a Blob from the PDF data
    const pdfBlob = doc.output("blob");
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

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsConfirmationOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(id);
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TableRow key={id}>
            <TableCell className="font-medium">{time}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{total_price}DA</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={handleDeleteClick}
                className="ml-2"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
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

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmationOpen(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </>
  );
}
