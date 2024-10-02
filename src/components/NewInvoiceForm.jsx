import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const NewInvoiceForm = ({ setInvoices }) => {
  // Initial state for form fields
  const [fields, setFields] = useState({
    invoiceNumber: "",
    client: "",
    amount: "",
    dueDate: "",
    status: "",
  });

  // Loading state to show a spinner when the form is being submitted
  const [isLoading, setIsLoading] = useState(false);

  // Toast hook to show notifications
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Show loading spinner

    console.log(fields); // For debugging, logs the current field values

    // Update the invoice list with the new invoice
    setInvoices((prev) => [...prev, fields]);

    setIsLoading(false); // Hide loading spinner

    // Clear form fields after submission
    setFields({
      invoiceNumber: "",
      client: "",
      amount: "",
      dueDate: "",
      status: "",
    });

    // Show success message
    return toast({
      title: "Invoice Added",
      description: "A new invoice has been added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <Label>Invoice Number</Label>
          <Input
            required
            onChange={(e) =>
              setFields({ ...fields, invoiceNumber: e.target.value })
            }
            value={fields.invoiceNumber}
          />
        </div>
        <div>
          <Label>Client Name</Label>
          <Input
            required
            onChange={(e) => setFields({ ...fields, client: e.target.value })}
            value={fields.client}
          />
        </div>
        <div>
          <Label>Amount</Label>
          <Input
            required
            type="number"
            onChange={(e) => setFields({ ...fields, amount: e.target.value })}
            value={fields.amount}
          />
        </div>
        <div>
          <Label>Due Date</Label>
          <Input
            required
            type="date"
            onChange={(e) => setFields({ ...fields, dueDate: e.target.value })}
            value={fields.dueDate}
          />
        </div>
        <div>
          <Label>Status</Label>
          <Input
            required
            onChange={(e) => setFields({ ...fields, status: e.target.value })}
            value={fields.status}
            placeholder="e.g. Paid, Unpaid"
          />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            Add Invoice
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewInvoiceForm;
