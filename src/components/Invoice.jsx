// src/components/Invoice.jsx

import React, { useEffect, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import NewInvoiceForm from "./NewInvoiceForm";
import {
  Drawer,
  DrawerPortal,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { delete_invoice, get_all_invoice, update_status } from "../api";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";
import { format } from "date-fns";

// EditForm for Invoice
// const EditInvoiceForm = ({ invoice, setInvoices, invoices }) => {
//   const [newData, setNewData] = useState(invoice);
//   const { toast } = useToast();

//   const handleSave = () => {
//     setInvoices(invoices.map((inv) => (inv.id === newData.id ? newData : inv)));
//     toast({
//       title: "Invoice details updated successfully",
//     });
//   };

//   return (
//     <div className="space-y-2">
//       <div>
//         <Label>Invoice ID:</Label>
//         <Input value={newData.id} readOnly disabled />
//       </div>
//       <div>
//         <Label>Invoice Number:</Label>
//         <Input
//           onChange={(e) =>
//             setNewData((prev) => ({ ...prev, invoiceNumber: e.target.value }))
//           }
//           value={newData.invoiceNumber}
//         />
//       </div>
//       <div>
//         <Label>Client:</Label>
//         <Input
//           onChange={(e) =>
//             setNewData((prev) => ({ ...prev, client: e.target.value }))
//           }
//           value={newData.client}
//         />
//       </div>
//       <div>
//         <Label>Amount:</Label>
//         <Input
//           type="number"
//           onChange={(e) =>
//             setNewData((prev) => ({ ...prev, amount: e.target.value }))
//           }
//           value={newData.amount}
//         />
//       </div>
//       <div>
//         <Label>Due Date:</Label>
//         <Input
//           type="date"
//           onChange={(e) =>
//             setNewData((prev) => ({ ...prev, dueDate: e.target.value }))
//           }
//           value={newData.dueDate}
//         />
//       </div>
//       <div>
//         <Label>Status:</Label>
//         <Input
//           onChange={(e) =>
//             setNewData((prev) => ({ ...prev, status: e.target.value }))
//           }
//           value={newData.status}
//         />
//       </div>
//       <div className="text-right mt-2">
//         <Button className="mt-2" onClick={handleSave}>
//           Save
//         </Button>
//       </div>
//     </div>
//   );
// };

const Invoice = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  const params = useParams();

  const handleRowClick = (id) => {
    if (selectedRowIds.find((sid) => sid === id)) {
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = async (id) => {
    const res = await delete_invoice(id, params.id);
    console.log(res.data);
    setInvoices((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: res.data.Message,
    });
  };

  const handleBulkDelete = () => {
    selectedRowIds.map(async (id) => {
      const res = await delete_invoice(id, params.id);
      setInvoices((prev) => prev.filter((c) => c.id !== id));
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
      toast({
        title: res.data.Message,
      });
    });
  };

  const fetchInvoices = async () => {
    setIsFetching(true);
    try {
      const res = await get_all_invoice(params.id);
      console.log(res.data.Invoices);
      setInvoices(res.data.Invoices);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  useEffect(() => {
    setFilteredInvoices(() =>
      invoices.filter(
        (invoice) =>
          invoice.customer_id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.customer_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.status.toLowerCase() === searchTerm.toLowerCase() ||
          invoice.id.toString().includes(searchTerm)
      )
    );
  }, [searchTerm]);

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
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              <Plus />
              New Invoice
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4">
            <DrawerHeader>
              <DrawerTitle>Create Invoice</DrawerTitle>
              {/* <DrawerDescription>
                This action cannot be undone.
                </DrawerDescription> */}
            </DrawerHeader>
            <NewInvoiceForm setInvoices={setInvoices} />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

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
      <ScrollArea className="h-[65vh]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delete</TableHead>
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
                  <TableCell>INV-{invoice.id.split("-", 1)}</TableCell>
                  <TableCell>{invoice.customer_name}</TableCell>
                  <TableCell>₹{invoice.total_amount}</TableCell>
                  <TableCell>
                    {format(new Date(invoice.overdue_date), "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={async () => {
                        await update_status(
                          invoice.id,
                          invoice.status === "paid"
                            ? { status: "unpaid" }
                            : { status: "paid" },
                          params.id
                        );
                        setFilteredInvoices((prevInvoices) =>
                          prevInvoices.map((i) => {
                            if (i.id === invoice.id) {
                              return {
                                ...i,
                                status: i.status === "paid" ? "unpaid" : "paid",
                              };
                            }
                            return i; // Ensure you return the unmodified item if the ID doesn't match
                          })
                        );
                      }}
                      checked={invoice.status === "paid" ? true : false}
                    />
                  </TableCell>
                  <TableCell className="flex gap-2 items-center">
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
            ) : isFetching ? (
              <div className="fixed z-10 top-1/2 left-1/2 flex items-center">
                <Lottie
                  className="h-32 w-32 mx-auto"
                  animationData={Animation}
                />
                {/* <Loader2 className=" mx-auto animate-spin h-10 w-10" /> */}
              </div>
            ) : (
              <TableRow>
                <TableCell colSpan="7" className="text-center">
                  No matching items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default Invoice;
