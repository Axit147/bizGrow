import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { create_cutomer } from "../api";
import { useParams } from "react-router-dom";

const NewCustomerForm = ({ setCustomers }) => {
  const [fields, setFields] = useState({
    name: undefined,
    email: undefined,
    phone: undefined,
    company_name: undefined,
    bill_address: undefined,
    city: undefined,
    state: undefined,
    pincode: undefined,
  });

  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      console.log(fields);
      const res = await create_cutomer(fields, params.id);
      console.log(res.data.Customer);
      setCustomers((prev) => [res.data.Customer, ...prev]);
      setIsLoading(false);
      setFields({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        bill_address: "",
        city: "",
        state: "",
        pincode: "",
      });
      return toast({
        title: "Yay! Success",
        description: "New customer added successfully",
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
    <ScrollArea className="max-h-[65vh] p-0">
      <form onSubmit={handleSubmit} className="mx-4">
        <div className="space-y-2">
          <div>
            <Label>Name</Label>
            <Input
              required
              onChange={(e) => setFields({ ...fields, name: e.target.value })}
              value={fields.name}
            />
          </div>
          <div>
            <Label>Company Name</Label>
            <Input
              required
              onChange={(e) =>
                setFields({ ...fields, company_name: e.target.value })
              }
              value={fields.companyName}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              required
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
              value={fields.email}
            />
          </div>
          <div>
            <Label>Phone No.</Label>
            <Input
              required
              onChange={(e) => setFields({ ...fields, phone: e.target.value })}
              value={fields.phone_no}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              required
              onChange={(e) =>
                setFields({ ...fields, bill_address: e.target.value })
              }
              value={fields.address}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              required
              onChange={(e) => setFields({ ...fields, city: e.target.value })}
              value={fields.address}
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              required
              onChange={(e) => setFields({ ...fields, state: e.target.value })}
              value={fields.address}
            />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input
              required
              onChange={(e) =>
                setFields({ ...fields, pincode: e.target.value })
              }
              value={fields.address}
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              // onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              Add
            </Button>
          </div>
        </div>
      </form>
    </ScrollArea>
  );
};

export default NewCustomerForm;
