// src/components/Item.jsx

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
import NewProductForm from "./NewProductForm";
import { useToast } from "../hooks/use-toast";

const productsData = [
  {
    id: 1,
    code: "P001",
    name: "Wireless Mouse",
    purchasePrice: 10.99,
    sellingPrice: 15.99,
    description: "A smooth, wireless mouse with a sleek design.",
    category: "Electronics",
  },
  {
    id: 2,
    code: "P002",
    name: "Mechanical Keyboard",
    purchasePrice: 50.0,
    sellingPrice: 75.0,
    description: "A durable mechanical keyboard with RGB lighting.",
    category: "Electronics",
  },
  {
    id: 3,
    code: "P003",
    name: "Running Shoes",
    purchasePrice: 45.0,
    sellingPrice: 60.0,
    description: "Comfortable running shoes with excellent grip.",
    category: "Sportswear",
  },
  {
    id: 4,
    code: "P004",
    name: "Office Chair",
    purchasePrice: 100.0,
    sellingPrice: 150.0,
    description: "Ergonomic office chair with lumbar support.",
    category: "Furniture",
  },
  {
    id: 5,
    code: "P005",
    name: "Smartphone Case",
    purchasePrice: 5.0,
    sellingPrice: 10.0,
    description: "Protective case for smartphones with a sleek design.",
    category: "Accessories",
  },
];

const EditForm = ({ product, setProducts, products }) => {
  const [newData, setNewData] = useState(product);
  const { toast } = useToast();

  const handleSave = () => {
    setProducts(
      products.map((product) => (product.id === newData.id ? newData : product))
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
        <Label>Code:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, code: e.target.value }))
          }
          value={newData.code}
        />
      </div>
      <div>
        <Label>Category:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, category: e.target.value }))
          }
          value={newData.category}
        />
      </div>
      <div>
        <Label>Purchase Price:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, purchasePrice: e.target.value }))
          }
          value={newData.purchasePrice}
        />
      </div>
      <div>
        <Label>Selling Price:</Label>
        <Input
          onChange={(e) =>
            setNewData((prev) => ({ ...prev, sellingPrice: e.target.value }))
          }
          value={newData.sellingPrice}
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

const Item = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [products, setProducts] = useState(productsData); // Original data

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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Select</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Margin</TableHead>
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
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.purchasePrice}</TableCell>
                <TableCell>${product.sellingPrice}</TableCell>
                <TableCell>
                  ${product.sellingPrice - product.purchasePrice}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Dialog>
                    <DialogTrigger>
                      <Edit className="h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent className="bg-muted">
                      <DialogHeader>
                        <DialogTitle>Edit Product Information</DialogTitle>
                        <DialogDescription>
                          Make changes to your product's details here. Click
                          save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <EditForm
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
          ) : (
            <TableRow>
              <TableCell colSpan="8" className="text-center">
                No matching products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>Optional: Add footer if needed</TableFooter> */}
      </Table>
    </div>
  );
};

export default Item;
