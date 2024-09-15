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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import NewCustomerForm from "./NewCustomerForm";

const customersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    totalReceivable: "$200.00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    totalReceivable: "$150.00",
  },
  // Add more customer data here
];

const EditForm = ({ customer }) => {
  const [newData, setNewData] = useState(customer);

  return (
    <div className="space-y-2">
      <div>
        <Label>Id:</Label>
        <Input value={newData.id} readOnly disabled />
      </div>
      <div>
        <Label>Name:</Label>
        <Input value={newData.name} />
      </div>
      <div>
        <Label>Email:</Label>
        <Input value={newData.email} />
      </div>
      <div>
        <Label>Phone:</Label>
        <Input value={newData.phone} />
      </div>
      <div>
        <Label>Total Recievable:</Label>
        <Input value={newData.totalReceivable} readOnly disabled />
      </div>
      <div className="text-right mt-2">
        <Button className="mt-2">Save</Button>
      </div>
    </div>
  );
};

const CustomerTable = () => {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [customers, setCustomers] = useState(customersData); // Original data

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };

  const handleEdit = (id) => {
    alert(`Edit customer with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete customer with ID: ${id}`);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  return (
    // <TableContainer>
    <div className="bg-white m-20 rounded-lg p-3 border shadow">
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
            <DialogTitle>Add new customer</DialogTitle>
            <NewCustomerForm />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-5 w-5" />
              Delete Selected
            </Button>
          </DialogTrigger>
        </Dialog>
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
            filteredCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                onClick={() => handleRowClick(customer.id)}
              >
                <TableCell>
                  <Checkbox id={customer.id} />
                </TableCell>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.totalReceivable}</TableCell>
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
                      <EditForm customer={customer} />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Trash2 className="h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent className="bg-muted">
                      <DialogHeader>
                        <DialogTitle>Delete Customer</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this customer?
                        </DialogDescription>
                      </DialogHeader>
                      {/* Additional logic for deletion can go here */}
                    </DialogContent>
                  </Dialog>
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
        {/* <TableFooter>Optional: Add footer if needed</TableFooter> */}
      </Table>
    </div>
  );
};

export default CustomerTable;
