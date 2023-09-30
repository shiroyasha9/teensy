"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Teensy } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(5, "Enter a valid password"),
});

type FormValues = z.infer<typeof formSchema>;

type PasswordFormProps = {
  teensy: Teensy;
};

const PasswordForm = ({ teensy }: PasswordFormProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitHandler: SubmitHandler<FormValues> = ({ password }) => {
    if (teensy.password === password) {
      router.push(teensy.url);
    } else {
      setError("password", {
        type: "manual",
        message: "Incorrect password",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(submitHandler)(e);
      }}
      className="flex flex-col gap-y-3"
    >
      <div>
        <Input
          label="🔑 Password"
          type="password"
          autoComplete="off"
          autoFocus
          invalid={!!errors.password}
          {...register("password", { required: true })}
        />
        <p className="mt-2 text-center text-sm font-medium text-red-450">
          {errors.password?.message ?? <>&nbsp;</>}
        </p>
      </div>
      <Button
        className="mt-6 w-full"
        disabled={!isValid}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default PasswordForm;
