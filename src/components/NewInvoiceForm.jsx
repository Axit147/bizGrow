import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Loader2,
  Plus,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { create_invoice, get_customer_names, get_item_names } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceTable from "./InvoiceTable";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import DatePicker from "./DatePicker";

const NewInvoiceForm = ({ setInvoices }) => {
  // Initial state for form fields
  const [fields, setFields] = useState({
    client: "",
    amount: "",
    dueDate: "",
    status: "",
  });

  // Loading state to show a spinner when the form is being submitted
  const [isLoading, setIsLoading] = useState(false);

  // Toast hook to show notifications
  const { toast } = useToast();
  const params = useParams();

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

  const fetchCustomers = async () => {
    try {
      const res = await get_customer_names(params.id);
      console.log(res.data);
      setCustomers(res.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await get_item_names(params.id);
      console.log(res.data);
      setProducts(res.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const cusRes = await get_customer_names(params.id);
      console.log(cusRes.data);
      setCustomers(cusRes.data.Data);
      const prodRes = await get_item_names(params.id);
      console.log(prodRes.data);
      setProducts(prodRes.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isCustomerSelectOpen, setisCustomerSelectOpen] = useState(false);
  const [isProductSelectOpen, setisProductSelectOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [billDate, setBillDate] = useState(new Date(Date.now()));
  const [dueDate, setDueDate] = useState(addDays(new Date(Date.now()), 30));
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customerSearch, customers]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [productSearch, products]);

  useEffect(() => {
    setDueDate(addDays(billDate, 30));
  }, [billDate]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    console.log(customer);
    setisCustomerSelectOpen(false);
    setCustomerSearch("");
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    console.log(product);
    setisProductSelectOpen(false);
    setProductSearch("");
  };

  const addProduct = () => {
    if (selectedCustomer && selectedProduct) {
      setPurchasedProducts((prev) => [
        ...prev,
        { ...selectedProduct, quantity },
      ]);
      setSelectedProduct(null);
      setQuantity(0);
    } else {
      toast({
        title: "Please select customer and product first...",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const info = {
      invoice_no: "INV-" + JSON.stringify(Math.floor(Math.random() * 10000)),
      customer_id: selectedCustomer.id,
      customer_name: selectedCustomer.name,
      invoice_date: addDays(billDate, 1),
      overdue_date: addDays(dueDate, 1),
      items: purchasedProducts.map((p) => ({
        item_id: p.id,
        quantity: p.quantity,
        unit_price: p.sell_price,
      })),
      status: isPaid ? "paid" : "unpaid",
    };
    try {
      const res = await create_invoice(info, params.id);
      console.log(res);
      setInvoices((prev) => [res.data.Invoice_responce, ...prev]);
      toast({
        title: "Yay! Success.",
        description: res.data.Message,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        variant: "destructive",
        description:
          error.response.data.detail[0].msg ||
          error.response.data.detail ||
          error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-[75vh]">
      <div className="space-y-2">
        {/* select customer */}
        <div className="flex items-center gap-5">
          <div className="relative w-full max-w-[250px]">
            <div
              className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setisCustomerSelectOpen(!isCustomerSelectOpen)}
            >
              <span className="flex-grow truncate">
                {selectedCustomer ? selectedCustomer.name : "Select a customer"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
            {isCustomerSelectOpen && (
              <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <div
                  className="flex items-center border-b px-3"
                  cmdk-input-wrapper=""
                >
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <ul className="max-h-[300px] overflow-auto p-1">
                  {filteredCustomers.map((customer) => (
                    <li
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedCustomer?.id === customer.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {customer.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button
            variant={"secondary"}
            onClick={() => {
              console.log(params.id);
              navigate(`/${params.id}/customers`);
            }}
          >
            <Plus />
            Add new customer
          </Button>
        </div>
        <Separator />
        {/* Select product */}
        <div className="flex items-center gap-5">
          <div className="relative w-full max-w-[250px]">
            <div
              className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setisProductSelectOpen(!isProductSelectOpen)}
            >
              <span className="flex-grow truncate">
                {selectedProduct ? selectedProduct.name : "Select a product"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
            {isProductSelectOpen && (
              <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <div
                  className="flex items-center border-b px-3"
                  cmdk-input-wrapper=""
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <ul className="max-h-[300px] overflow-auto p-1">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          selectedProduct?.id === product.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                      {product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button
            variant={"secondary"}
            onClick={() => {
              console.log(params.id);
              navigate(`/${params.id}/items`);
            }}
          >
            <Plus />
            Add new product
          </Button>
          <div className="flex items-center gap-3">
            <Label className="inline">Quantity</Label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={!selectedCustomer || !selectedProduct}
              className="w-20"
              type="number"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="inline">Total</Label>
            <Input
              value={"₹" + quantity * selectedProduct?.sell_price}
              // onChange={(e) => setQuantity(e.target.value)}
              disabled
              className="w-20"
            />
          </div>
          <div className="grow text-right">
            <Button
              disabled={!selectedCustomer || !selectedProduct}
              onClick={addProduct}
            >
              Add to invoice
            </Button>
          </div>
        </div>
        <div>
          <InvoiceTable
            purchasedProducts={purchasedProducts}
            setPurchasedProducts={setPurchasedProducts}
          />
        </div>
      </div>
      <div className="flex items-center my-4 ml-auto justify-between">
        <div className="flex gap-3">
          <DatePicker
            date={billDate}
            setDate={setBillDate}
            label="Billing Date"
          />
          <DatePicker date={dueDate} setDate={setDueDate} label="Due Date" />
        </div>
        <div className="flex items-center gap-5">
          <span className="items-center flex">
            Unpaid
            <Switch
              disabled={!purchasedProducts.length}
              checked={isPaid}
              onCheckedChange={(state) => {
                setIsPaid(state);
              }}
              className="mx-1"
            />
            Paid
          </span>
          <Button
            disabled={!purchasedProducts.length || isSaving}
            onClick={handleSave}
          >
            {isSaving && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewInvoiceForm;
