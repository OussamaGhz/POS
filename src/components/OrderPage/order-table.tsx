/* eslint-disable import/no-unresolved */
import React from "react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { TrashIcon } from "lucide-react";

const OrderTable = () => {
  return (
    <div className="h-[80%] border-b-2  overflow-scroll">
        <Table className="">
      <TableHeader className="font-bold">
        <TableRow>
          <TableHead className="w-[80px] hidden md:table-cell">Item</TableHead>
          <TableHead className="max-w-[150px]">Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>   
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
         <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="hidden md:table-cell">
            ddd
          </TableCell>
          <TableCell className="font-medium">2.99$</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$30.00</TableCell>
          <TableCell className="hidden md:table-cell">
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </div>
  );
};

export default OrderTable;
