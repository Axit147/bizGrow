// src/components/Item.jsx

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
import NewProductForm from "./NewProductForm";
import { useToast } from "../hooks/use-toast";
import { useParams } from "react-router-dom";
import { get_all_items, update_item } from "../api";
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";
import EditProductForm from "./EditProductForm";

const Item = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [products, setProducts] = useState([]); // Original data

  const [isFetching, setIsFetching] = useState(false);
  const params = useParams();

  const handleRowClick = (id) => {
    if (selectedRowIds.find((sid) => sid === id)) {
      setSelectedRowIds((prev) => prev.filter((sid) => sid !== id));
    } else {
      setSelectedRowIds((prev) => [...prev, id]);
    }
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleBulkDelete = () => {
    selectedRowIds.map((id) =>
      setProducts((prev) => prev.filter((c) => c.id !== id))
    );
  };

  const fetchCustomers = async () => {
    try {
      setIsFetching(true);
      const res = await get_all_items(params.id);
      console.log(res.data);
      setProducts(res.data.Data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
  );

  return (
    // <TableContainer>
    <div className="bg-white mx-20 my-14 rounded-lg p-3 border shadow">
      {/* Search Bar */}
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, category, code, or ID"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-5 w-5" />
              New Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product. Ensure all fields are
                complete before submitting.
              </DialogDescription>
            </DialogHeader>
            <NewProductForm setProducts={setProducts} />
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
                selected products and remove them from our servers.
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
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead>Selling Price</TableHead>
              <TableHead>Profit Margin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      id={product.id}
                      onCheckedChange={() => handleRowClick(product.id)}
                      checked={
                        selectedRowIds.find((id) => id === product.id)
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                  <TableCell>ITM-{product.id.split("-", 1)}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>₹{product.purchase_price}</TableCell>
                  <TableCell>₹{product.sell_price}</TableCell>
                  <TableCell>
                    ₹
                    {product.profit ||
                      product.sell_price - product.purchase_price}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center">
                    <Dialog>
                      <DialogTrigger>
                        <Edit className="h-5 w-5" />
                      </DialogTrigger>
                      <DialogContent className="p-0">
                        <EditProductForm
                          product={product}
                          setProducts={setProducts}
                          products={products}
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
                            delete your selected product and remove it from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id)}
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

export default Item;
