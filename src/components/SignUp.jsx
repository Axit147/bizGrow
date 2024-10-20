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
  Loader2,
  Mail,
  MapPin,
  MapPinHouse,
  Phone,
  UserRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSignUptModal from "../hooks/useSignUpModal";
import { signup } from "../api";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose } = useSignUptModal();
  const [fields, setFields] = useState({
    name: undefined,
    email: undefined,
    phone_no: undefined,
    password: undefined,
    address: undefined,
  });

  const [formError, setFormError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
    return;
  };

  // Regex for validations
  const nameRegex = /^[a-zA-Z\s]{3,}$/; // Only letters and spaces, minimum length of 3
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Simple email format
  const phoneRegex = /^[0-9]{10}$/; // 10-digit phone number
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; // At least one upper case, one lower case, one number, and minimum 8 characters

  const handleSubmit = async () => {
    setFormError(undefined);
    setIsLoading(false);

    try {
      // Validate fields
      if (!fields.name || !nameRegex.test(fields.name)) {
        setFormError("Please enter a valid name (minimum 3 letters).");
        throw new Error();
      }

      if (!fields.email || !emailRegex.test(fields.email)) {
        setFormError("Please enter a valid email address.");
        throw new Error();
      }

      if (!fields.phone_no || !phoneRegex.test(fields.phone_no)) {
        setFormError("Please enter a valid 10-digit phone number.");
        throw new Error();
      }

      if (!fields.password || !passwordRegex.test(fields.password)) {
        setFormError(
          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number."
        );
        throw new Error();
      }

      // Submit the form if validations pass
      const response = await signup(fields);
      console.log(response);

      toast({
        title: "Yay!",
        description: "You have successfully registered.",
      });
      onClose();

      // return navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.detail) {
        setFormError(error.response.data.detail);
        return toast({
          variant: "destructive",
          title: "Uh oh!",
          description: error.response.data.detail,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogTitle>
          <p className="font-bold text-2xl text-center mb-2 text-slate-700">
            Register to <span className="text-primary font-extrabold">Biz</span>
            <span className="font-extrabold">Grow</span>
          </p>
        </DialogTitle>

        <div>
          <Label>Name :</Label>
          <CustomInput
            name={"Name"}
            onChange={(v) => {
              setFields({ ...fields, name: v });
            }}
            value={fields.name}
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
            value={fields.phone_no}
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

        {formError && (
          <div className="p-4 text-center border-2 border-red-500 bg-red-500/30 rounded-lg text-red-500 font-semibold">
            {formError}
          </div>
        )}
        <Button onClick={handleSubmit} className="mt-3" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Sign Up
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
