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
  CloudCog,
  Home,
  KeyRound,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: undefined,
    email: undefined,
    phone_no: undefined,
    password: undefined,
    address: undefined,
  });

  const [formError, setFormError] = useState(undefined);

  // const statesAndUTs = [
  //   "Andhra Pradesh",
  //   "Arunachal Pradesh",
  //   "Assam",
  //   "Bihar",
  //   "Chhattisgarh",
  //   "Goa",
  //   "Gujarat",
  //   "Haryana",
  //   "Himachal Pradesh",
  //   "Jharkhand",
  //   "Karnataka",
  //   "Kerala",
  //   "Madhya Pradesh",
  //   "Maharashtra",
  //   "Manipur",
  //   "Meghalaya",
  //   "Mizoram",
  //   "Nagaland",
  //   "Odisha",
  //   "Punjab",
  //   "Rajasthan",
  //   "Sikkim",
  //   "Tamil Nadu",
  //   "Telangana",
  //   "Tripura",
  //   "Uttar Pradesh",
  //   "Uttarakhand",
  //   "West Bengal",
  //   "Andaman and Nicobar Islands",
  //   "Chandigarh",
  //   "Dadra and Nagar Haveli and Daman and Diu",
  //   "Lakshadweep",
  //   "Delhi",
  //   "Puducherry",
  // ];

  const handleSubmit = async() => {
    setFormError(undefined);

    try {
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value === undefined) {
          setFormError(
            `${
              key === "name"
                ? "Name"
                : key === "email"
                ? "Email"
                : key === "password"
                ? "Password"
                : key === "address"
                ? "Address"
                : key === "phone_no"
                ? "Phone no."
                : key
            } is required`
          );
          throw new Error();
        }
      });

      // console.log(fields);

      const response = await axios.post('http://127.0.0.1:8000/signup',fields)
      console.log(response);

      

      toast({
        title: "Yay!",
        description: "You have successfully registered.",
      });

      // return navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setFormError(error.response.data.detail)
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: error.response.data.detail,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Label>Name :</Label>
        <CustomInput
          name={"Name"}
          onChange={(v) => {
            setFields({ ...fields, name: v });
          }}
          value={fields.companyName}
        >
          <div>
            <UserRound className="h-5 w-5 text-slate-600" />
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
            setFields({ ...fields, phone_no: v });
          }}
          value={fields.phone}
        >
          <div>
            <Phone className="h-5 w-5 text-slate-600" />
          </div>
        </CustomInput>
      </div>
      <div>
        <Label>Address :</Label>
        <CustomInput
          name={"Address"}
          onChange={(v) => {
            setFields({ ...fields, address: v });
          }}
          value={fields.address}
          type="textarea"
        >
          <div>
            <MapPinHouse className="h-5 w-5 text-slate-600" />
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
      {/* <div>
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
      </div> */}
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
