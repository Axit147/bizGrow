// src/components/Invoice.jsx

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import NewInvoiceForm from "./NewInvoiceForm";

// Mock Data for Invoices
const invoicesData = [
  {
    id: 1,
    invoiceNumber: "INV001",
    client: "John Doe",
    amount: 300.5,
    dueDate: "2024-09-30",
    status: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV002",
    client: "Jane Smith",
    amount: 500.0,
    dueDate: "2024-10-15",
    status: "Unpaid",
  },
  {
    id: 3,
    invoiceNumber: "INV003",
    client: "Acme Corp",
    amount: 1200.75,
    dueDate: "2024-10-01",
    status: "Paid",
  },
];

// EditForm for Invoice
const EditInvoiceForm = ({ invoice, setInvoices, invoices }) => {
  const [newData, setNewData] = useState(invoice);
  const { toast } = useToast();

  const handleSave = () => {
    setInvoices(invoices.map((inv) => (inv.id === newData.id ? newData : inv)));
    toast({
      title: "Invoice details updated successfully",
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <Label>Invoice ID:</Label>
        <Input value={newData.id} readOnly disabled />
      </div>
      <div>
        <Label>Invoice Number:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, invoiceNumber: e.target.value }))
          }
          value={newData.invoiceNumber}
        />
      </div>
      <div>
        <Label>Client:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, client: e.target.value }))
          }
          value={newData.client}
        />
      </div>
      <div>
        <Label>Amount:</Label>
        <Input
          type="number"
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, amount: e.target.value }))
          }
          value={newData.amount}
        />
      </div>
      <div>
        <Label>Due Date:</Label>
        <Input
          type="date"
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          value={newData.dueDate}
        />
      </div>
      <div>
        <Label>Status:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, status: e.target.value }))
          }
          value={newData.status}
        />
      </div>
      <div className="text-right mt-2">
        <Button className="mt-2" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

const Invoice = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState(invoicesData);

  const handleRowClick = (id) => {
    if (selectedRowIds.find((sid) => sid === id)) {
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const handleBulkDelete = () => {
    selectedRowIds.map((id) =>
      setInvoices((prev) => prev.filter((inv) => inv.id !== id))
    );
  };

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white mx-20 my-14 rounded-lg p-3 border shadow">
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by client, invoice number, or status"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-5 w-5" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new invoice</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new invoice. Ensure all fields
                are complete before submitting.
              </DialogDescription>
              <NewInvoiceForm setInvoices={setInvoices} />
            </DialogHeader>
            {/* You can create and import a NewInvoiceForm similar to NewProductForm */}
            {/* <NewInvoiceForm setInvoices={setInvoices} /> */}
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={!selectedRowIds.length}>
              <Trash2 className="h-5 w-5" />
              Delete Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                selected invoices.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBulkDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, i) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    id={invoice.id}
                    onCheckedChange={() => handleRowClick(invoice.id)}
                    checked={selectedRowIds.includes(invoice.id)}
                  />
                </TableCell>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Dialog>
                    <DialogTrigger>
                      <Edit className="h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Invoice Details</DialogTitle>
                        <DialogDescription>
                          Make changes to your invoice's details here. Click
                          save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditInvoiceForm
                        invoice={invoice}
                        setInvoices={setInvoices}
                        invoices={invoices}
                      />
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your selected invoice.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(invoice.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="8" className="text-center">
                No matching invoices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Invoice;
