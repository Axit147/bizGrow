import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const NewProductForm = ({ setProducts }) => {
  const [fields, setFields] = useState({
    name: "",
    code: "",
    category: "",
    purchasePrice: "",
    sellingPrice: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(fields);
    setProducts((prev) => [...prev, fields]);
    setIsLoading(false);
    setFields({
      name: "",
      code: "",
      category: "",
      purchasePrice: "",
      sellingPrice: "",
    });
    return toast({
      title: "Yay! Success",
      description: "New product added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <Label>Product Name</Label>
          <Input
            required
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            value={fields.name}
          />
        </div>
        <div>
          <Label>Product Code</Label>
          <Input
            required
            onChange={(e) => setFields({ ...fields, code: e.target.value })}
            value={fields.code}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            required
            onChange={(e) => setFields({ ...fields, category: e.target.value })}
            value={fields.category}
          />
        </div>
        <div>
          <Label>Purchase Price</Label>
          <Input
            required
            type="number"
            onChange={(e) =>
              setFields({ ...fields, purchasePrice: e.target.value })
            }
            value={fields.purchasePrice}
          />
        </div>
        <div>
          <Label>Selling Price</Label>
          <Input
            required
            type="number"
            onChange={(e) =>
              setFields({ ...fields, sellingPrice: e.target.value })
            }
            value={fields.sellingPrice}
          />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewProductForm;
