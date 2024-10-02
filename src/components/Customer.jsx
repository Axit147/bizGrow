// src/components/CustomerTable.jsx

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
import NewCustomerForm from "./NewCustomerForm";
import { useToast } from "../hooks/use-toast";

const customersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone_no: "123-456-7890",
    totalReceivable: "200.00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_no: "987-654-3210",
    totalReceivable: "150.00",
  },
  // Add more customer data here
];

const EditForm = ({ customer, setCustomers, customers }) => {
  const [newData, setNewData] = useState(customer);
  const { toast } = useToast();

  const handleSave = () => {
    setCustomers(
      customers.map((customer) =>
        customer.id === newData.id ? newData : customer
      )
    );
    toast({
      title: "Changes have been saved successfully",
    });
  };

  return (
    <div className="space-y-2">
      <div>
        <Label>Id:</Label>
        <Input value={newData.id} readOnly disabled />
      </div>
      <div>
        <Label>Name:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={newData.name}
        />
      </div>
      <div>
        <Label>Email:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, email: e.target.value }))
          }
          value={newData.email}
        />
      </div>
      <div>
        <Label>Phone:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, phone_no: e.target.value }))
          }
          value={newData.phone_no}
        />
      </div>
      <div>
        <Label>Total Recievable:</Label>
        <Input value={newData.totalReceivable} readOnly disabled />
      </div>
      <div className="text-right mt-2">
        <Button className="mt-2" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

const CustomerTable = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [customers, setCustomers] = useState(customersData); // Original data

  const handleRowClick = (id) => {
    if (selectedRowIds.find((sid) => sid === id)) {
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleBulkDelete = () => {
    selectedRowIds.map((id) =>
      setCustomers((prev) => prev.filter((c) => c.id !== id))
    );
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white mx-20 my-14 rounded-lg p-3 border shadow">
      {/* Search Bar */}
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or ID"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-5 w-5" />
              New Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new customer</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new customer. Ensure all fields are
                complete before submitting.
              </DialogDescription>
            </DialogHeader>
            <NewCustomerForm setCustomers={setCustomers} />
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
                selected customers and remove them from our servers.
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
            <TableHead>Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Receivable</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, i) => (
              <TableRow
                key={customer.id}
                // onClick={() => handleRowClick(customer.id)}
              >
                <TableCell>
                  <Checkbox
                    id={customer.id}
                    onCheckedChange={() => handleRowClick(customer.id)}
                    checked={
                      selectedRowIds.find((id) => id === customer.id)
                        ? true
                        : false
                    }
                  />
                </TableCell>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone_no}</TableCell>
                <TableCell>${customer.totalReceivable}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Dialog>
                    <DialogTrigger>
                      <Edit className="h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent className="bg-muted">
                      <DialogHeader>
                        <DialogTitle>Edit Customer Information</DialogTitle>
                        <DialogDescription>
                          Make changes to your customer's profile here. Click
                          save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditForm
                        customer={customer}
                        setCustomers={setCustomers}
                        customers={customers}
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
                          delete your selected customers and remove them from
                          our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(customer.id)}
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
              <TableCell colSpan="7" className="text-center">
                No matching customers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
