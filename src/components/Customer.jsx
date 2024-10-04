// src/components/CustomerTable.jsx

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Loader2, Plus, Trash, Trash2 } from "lucide-react";
import NewCustomerForm from "./NewCustomerForm";
import { toast, useToast } from "../hooks/use-toast";
import { delete_customer, get_all_customers, update_customer } from "../api";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";

const EditForm = ({ customer, setCustomers, customers }) => {
  const [newData, setNewData] = useState(customer);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const params = useParams();

  const handleSave = async () => {
    console.log(newData);
    setIsLoading(true);
    try {
      const res = await update_customer(
        {
          id: newData.id,
          name: newData.name,
          email: newData.email,
          phone: JSON.stringify(newData.phone),
          company_name: newData.company_name,
          state: newData.state,
          city: newData.city,
          pincode: JSON.stringify(newData.pincode),
          bill_address: newData.bill_address,
        },
        params.id
      );
      res &&
        setCustomers(
          customers.map((customer) =>
            customer.id === newData.id ? newData : customer
          )
        );
      toast({
        title: "Changes have been saved successfully",
      });
    } catch (error) {
      console.log(error);
      setNewData(customer);
      toast({
        title: "Something went wrong!",
        description:
          error.response.data.detail[0].msg || error.response.data.detail,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollArea className="max-h-[70vh]">
      <div className="space-y-2 px-2">
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
              setNewData((prev) => ({ ...prev, phone: e.target.value }))
            }
            value={newData.phone}
          />
        </div>
        <div>
          <Label>Company Name:</Label>
          <Input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, company_name: e.target.value }))
            }
            value={newData.company_name}
          />
        </div>
        <div>
          <Label>Bill Address:</Label>
          <Input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, bill_address: e.target.value }))
            }
            value={newData.bill_address}
          />
        </div>
        <div>
          <Label>State:</Label>
          <Input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, state: e.target.value }))
            }
            value={newData.state}
          />
        </div>
        <div>
          <Label>City:</Label>
          <Input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, city: e.target.value }))
            }
            value={newData.city}
          />
        </div>
        <div>
          <Label>Pincode:</Label>
          <Input
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, pincode: e.target.value }))
            }
            value={newData.pincode}
          />
        </div>
        <div className="text-right mt-2">
          <Button className="mt-2" onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

const CustomerTable = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const params = useParams();

  const handleRowClick = (id) => {
    if (selectedRowIds.find((sid) => sid === id)) {
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = async (id) => {
    const res = await delete_customer(id, params.id);
    console.log(res.data);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: res.data.Message,
    });
  };

  const handleBulkDelete = () => {
    selectedRowIds.map(async (id) => {
      const res = await delete_customer(id, params.id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
      toast({
        title: res.data.Message,
      });
    });
  };

  const fetchCustomers = async () => {
    try {
      setIsFetching(true);
      const res = await get_all_customers(params.id);
      console.log(res.data);
      setCustomers(res.data.Data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  // if (isFetching) {
  //   return (
  //     <div className="h-full flex items-center">
  //       <Lottie className="h-32 w-32 mx-auto" animationData={Animation} />
  //       {/* <Loader2 className=" mx-auto animate-spin h-10 w-10" /> */}
  //     </div>
  //   );
  // }

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
      <ScrollArea className="h-[65vh]">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
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
                  <TableCell>CUS-{customer?.id.split("-", 1)}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.company_name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
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
                  No matching customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default CustomerTable;
