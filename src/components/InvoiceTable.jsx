import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const InvoiceTable = ({ purchasedProducts, setPurchasedProducts }) => {
  let grandTotal = 0;
  return (
    <ScrollArea className="h-[50vh] max-w-6xl mx-auto mt-6 border rounded-xl p-2">
      <Table className="grow">
        <TableCaption>A list of purchased products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sr.</TableHead>
            <TableHead>Product name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Total amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchasedProducts.map((product, i) => {
            grandTotal = grandTotal + product.quantity * product.sell_price;
            return (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>₹{product.sell_price}</TableCell>
                <TableCell className="text-right">
                  ₹{product.quantity * product.sell_price}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Grand Total :</TableCell>
            <TableCell className="text-right font-semibold mt-2">
              ₹{grandTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Add IGST{"(12%)"} :</TableCell>
            <TableCell className="text-right font-semibold">
              ₹{(grandTotal * 12) / 100}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Payable :</TableCell>
            <TableCell className="text-right font-bold text-lg">
              ₹{(grandTotal * 12) / 100 + grandTotal}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default InvoiceTable;
