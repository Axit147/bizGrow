import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useParams } from "react-router-dom";
import { create_item } from "../api";

const NewProductForm = ({ setProducts }) => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
    purchase_price: "",
    sell_price: "",
  });

  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      console.log(fields);
      const res = await create_item(fields, params.id);
      console.log(res.data.Item);
      setProducts((prev) => [res.data.Item, ...prev]);
      setIsLoading(false);
      setFields({
        name: "",
        description: "",
        purchase_price: "",
        sell_price: "",
      });
      return toast({
        title: "Yay! Success",
        description: "New product added successfully",
      });
    } catch (error) {
      console.log(error);
      return toast({
        title: "Something went wrong!",
        variant: "destructive",
        description:
          error.response.data.detail[0].msg || error.response.data.detail,
      });
    } finally {
      setIsLoading(false);
    }
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
          <Label>Description</Label>
          <Input
            required
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
            value={fields.description}
          />
        </div>
        <div>
          <Label>Purchase Price</Label>
          <Input
            required
            type="number"
            onChange={(e) =>
              setFields({ ...fields, purchase_price: e.target.value })
            }
            value={fields.purchase_price}
          />
        </div>
        <div>
          <Label>Selling Price</Label>
          <Input
            required
            type="number"
            onChange={(e) =>
              setFields({ ...fields, sell_price: e.target.value })
            }
            value={fields.sell_price}
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
