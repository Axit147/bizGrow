import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import useLoginModal from "../hooks/useLoginModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserInfo } from "../App";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose } = useLoginModal();
  const [fields, setFields] = useState({
    email: undefined,
    password: undefined,
  });

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
    return;
  };

  const [formError, setFormError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setFormError(undefined);
    setIsLoading(true);

    try {
      Object.entries(fields).forEach(([key, value]) => {
        if (!value || value === undefined) {
          setFormError(
            `${
              key === "email" ? "Email" : key === "password" ? "Password" : key
            } is required`
          );
          throw new Error();
        }
      });

      // console.log(fields);

      const response = await axios.post("http://127.0.0.1:8000/login", fields);
      // console.log(response);
      localStorage.setItem("token", response.data.token);

      toast({
        title: "Yay!",
        description: "You have successfully registered.",
      });
      // return location.reload();
      // return navigate("/dashboard");
      getUserInfo();
      onClose();
    } catch (error) {
      console.log(error);
      setFormError(error.response.data.detail);
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: error.response.data.detail,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogTitle>
          <p className="font-bold text-2xl text-center mb-2 text-slate-700">
            Welcome back to{" "}
            <span className="text-primary font-extrabold">Biz</span>
            <span className="font-extrabold">Grow</span>
          </p>
        </DialogTitle>
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
        <Button onClick={handleSubmit} className="mt-3" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Log In
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
