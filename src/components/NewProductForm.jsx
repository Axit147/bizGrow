import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { create_item } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name must be less than 50 characters"),
  
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  
  purchase_price: z.number()
    .positive("Purchase price must be positive")
    .max(10000000, "Purchase price must not exceed 100,000,00"),

  sell_price: z.number()
    .positive("Selling price must be positive")
    .min(1, "Selling price must be at least 1")
    .max(10000000, "Selling price must not exceed 100,000,00")
    .refine((value, ctx) => value > ctx.parent.purchase_price, {
      message: "Selling price must be greater than purchase price",
    }),
});


const NewProductForm = ({ setProducts }) => {
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      purchase_price: "",
      sell_price: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await create_item(values, params.id);
      setProducts((prev) => [res.data.Item, ...prev]);
      form.reset();
      toast({
        title: "Product Added",
        description: "New product has been added successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error.response?.data?.detail ||
          "An error occurred while adding the product.",
        variant: "destructive",
      });
    }
  };

  return (
    // <Card className="w-full max-w-2xl mx-auto">
    //   <CardHeader>
    //     <CardTitle>Add New Product</CardTitle>
    //     <CardDescription>
    //       Enter the details of the new product below.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-0.5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchase_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the price you paid for this product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sell_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the price you'll sell this product for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Product...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
    //   </CardContent>
    // </Card>
  );
};

export default NewProductForm;
