"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const WhatsAppForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const sanitizedPhoneNumber = phoneNumber
          .replaceAll("-", "")
          .replaceAll(" ", "")
          .replaceAll("+", "")
          .replace(/\D/g, "");
        console.log(sanitizedPhoneNumber);
        void router.push(`/wa/${sanitizedPhoneNumber}`);
      }}
      className="flex flex-col gap-3"
    >
      <Input
        label="    Enter their number here:"
        inlineLabel
        required
        type="number"
        placeholder="+1 999 999 9999"
        minLength={7}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button
        type="submit"
        title="WhatsApp them!"
        className="mx-0"
        disabled={phoneNumber.length < 8}
      />
    </form>
  );
};

export default WhatsAppForm;
