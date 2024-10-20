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
import { create_cutomer } from "@/api";
import { ScrollArea } from "@/components/ui/scroll-area";
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

// Updated validation schema with improved rules
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]+$/, "Name should contain only letters and spaces"),
    email: z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  phone: z
    .string()
    .min(10, { message: "Phone number must be exactly 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, "Phone number should only contain digits"),
  company_name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  bill_address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]+$/, "City name should contain only letters and spaces"),
  state: z
    .string()
    .min(2, { message: "State must be at least 2 characters" })
    .regex(/^[a-zA-Z\s]+$/, "State name should contain only letters and spaces"),
  pincode: z
    .string()
    .min(6, { message: "Pincode must be exactly 6 digits" })
    .max(6, { message: "Pincode must be exactly 6 digits" })
    .regex(/^\d+$/, "Pincode should only contain digits"),
});

const NewCustomerForm = ({ setCustomers }) => {
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      bill_address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await create_cutomer(values, params.id);
      setCustomers((prev) => [res.data.Customer, ...prev]);
      form.reset();
      toast({
        title: "Customer Added",
        description: "New customer has been added successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error.response?.data?.detail ||
          "An error occurred while adding the customer.",
        variant: "destructive",
      });
    }
  };

  return (
    <ScrollArea className="h-[65vh] pr-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-0.5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bill_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter billing address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pincode" {...field} />
                </FormControl>
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
                Adding Customer...
              </>
            ) : (
              "Add Customer"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default NewCustomerForm;
