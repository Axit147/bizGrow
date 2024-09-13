import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Building,
  Building2,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    companyName: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    state: undefined,
  });

  const [formError, setFormError] = useState(undefined);

  const statesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const handleSubmit = () => {
    setFormError(undefined);

    try {
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value === undefined) {
          setFormError(
            `${
              key === "companyName"
                ? "Company Name"
                : key === "email"
                ? "Email"
                : key === "password"
                ? "Password"
                : key === "state"
                ? "State"
                : key === "phone"
                ? "Phone"
                : key
            } is required`
          );
          throw new Error();
        }
      });

      console.log(fields);

      setFields({
        companyName: "",
        email: "",
        phone: "",
        password: "",
        state: "",
      });

      toast({
        title: "Yay!",
        description: "You have successfully registered.",
      });

      return navigate("/dashboard");
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "All the fields are required.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Comapny Name :</Label>
        <CustomInput
          name={"Comapny Name"}
          onChange={(v) => {
            setFields({ ...fields, companyName: v });
          }}
          value={fields.companyName}
        >
          <div>
            <Building2 className="h-5 w-5 text-slate-600" />
          </div>
        </CustomInput>
      </div>
      <div>
        <Label>Email :</Label>
        <CustomInput
          name={"Email"}
          onChange={(v) => {
            setFields({ ...fields, email: v });
          }}
          value={fields.email}
        >
          <div>
            <Mail className="h-5 w-5 text-slate-600" />
          </div>
        </CustomInput>
      </div>
      <div>
        <Label>Phone :</Label>
        <CustomInput
          name={"Phone"}
          onChange={(v) => {
            setFields({ ...fields, phone: v });
          }}
          value={fields.phone}
        >
          <div>
            <Phone className="h-5 w-5 text-slate-600" />
          </div>
        </CustomInput>
      </div>
      <div>
        <Label>Password :</Label>
        <CustomInput
          name={"Password"}
          onChange={(v) => {
            setFields({ ...fields, password: v });
          }}
          value={fields.password}
          type="password"
        >
          <div>
            <KeyRound className="h-5 w-5 text-slate-600" />
          </div>
        </CustomInput>
      </div>
      <div>
        <Label>State :</Label>
        <Select
          onValueChange={(v) => {
            setFields({ ...fields, state: v });
          }}
          defaultValue={fields.state}
          value={fields.state}
        >
          <SelectTrigger className="w-full justify-start p-2 gap-2">
            <MapPin className="h-5 w-5 text-slate-600" />
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {statesAndUTs.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {formError && (
        <div className="p-4 text-center border-2 border-red-500 bg-red-500/30 rounded-lg text-red-500 font-semibold">
          {formError}
        </div>
      )}
      <Button onClick={handleSubmit} className="mt-3">
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
