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
import { update_customer } from "@/api";
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

const formSchema = z.object({
  id: z.string(),
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

const EditCustomerForm = ({ customer, setCustomers, customers }) => {
  console.log(customer);
  const { toast } = useToast();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: String(customer.phone),
      company_name: customer.company_name,
      bill_address: customer.bill_address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await update_customer(
        {
          ...values,
          //   phone: JSON.stringify(values.phone),
          pincode: JSON.stringify(values.pincode),
        },
        params.id
      );
      if (res) {
        setCustomers(customers.map((c) => (c.id === values.id ? values : c)));
        toast({
          title: "Changes have been saved successfully",
        });
      }
    } catch (error) {
      console.error(error);
      form.reset(customer);
      toast({
        title: "Something went wrong!",
        description:
          error.response?.data?.detail[0]?.msg || error.response?.data?.detail,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Customer</CardTitle>
        <CardDescription>
          Update the customer's information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-0.5"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} type="email" />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
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
                      <Input {...field} />
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
                    <FormLabel>Bill Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
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
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EditCustomerForm;
