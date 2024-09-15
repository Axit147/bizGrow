import React from "react";
import useNewOrgModal from "../hooks/useNewOrgModal";
import { BookMarked, Building2, Factory, Globe, Globe2, MapPinHouse, UserRound } from "lucide-react";

const NewOrgModal = () => {

    const {isOpen,onClose} = useNewOrgModal()

    const onChange = (open) => {
        if (!open) {
          onClose();
        }
        return;
      };

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

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogTitle>
          <p className="font-bold text-2xl text-center mb-2 text-slate-700">
           Create a new Organization
          </p>
        </DialogTitle>
        <div>
          <Label>Name</Label>
          <CustomInput
            name={"Name"}
            onChange={(v) => {
              setFields({ ...fields, name: v });
            }}
            value={fields.name}
          >
            <div>
              <Building2 className="h-5 w-5 text-slate-600" />
            </div>
          </CustomInput>
        </div>

        <div>
          <Label>Industry :</Label>
          <CustomInput
            name={"Industry"}
            onChange={(v) => {
              setFields({ ...fields, industry: v });
            }}
            value={fields.industry}
            type=""
          >
            <div>
              <Factory className="h-5 w-5 text-slate-600" />
            </div>
          </CustomInput>
        </div>
        <div>
          <Label>Country :</Label>
          <Select
            onValueChange={(v) => {
              setFields({ ...fields, country: v });
            }}
            defaultValue={'India'}
            value={fields.country}
          >
            <SelectTrigger className="w-full justify-start p-2 gap-2">
              <Globe2 className="h-5 w-5 text-slate-600" />
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key={s} value={s}>
                India
                </SelectItem>
            </SelectContent>
          </Select>
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
        <div>
          <Label>Address :</Label>
          <CustomInput
            name={"Address"}
            onChange={(v) => {
              setFields({ ...fields, address: v });
            }}
            value={fields.address}
            type="text-area"
          >
            <div>
              <MapPinHouse className="h-5 w-5 text-slate-600" />
            </div>
          </CustomInput>
        </div>
        <div>
          <Label>GST No. :</Label>
          <CustomInput
            name={"GST no."}
            onChange={(v) => {
              setFields({ ...fields, gst: v });
            }}
            value={fields.gst}
            type=""
          >
            <div>
              <BookMarked className="h-5 w-5 text-slate-600" />
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
          Log In
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrgModal;
