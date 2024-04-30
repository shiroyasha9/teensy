"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
	phoneNumber: z
		.string()
		.min(7, "Enter a valid number")
		.max(15, "Enter a valid number")
		.regex(/^\+?[0-9]+$/, "Enter a valid number"),
});

type FormValues = z.infer<typeof formSchema>;

const WhatsAppForm = () => {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isValid },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
	});

	const submitHandler: SubmitHandler<FormValues> = ({ phoneNumber }) => {
		const sanitizedPhoneNumber = phoneNumber
			.replaceAll("-", "")
			.replaceAll(" ", "")
			.replaceAll("+", "")
			.replace(/\D/g, "");
		void router.push(`/wa/${sanitizedPhoneNumber}`);
	};

	return (
		<form
			onSubmit={void handleSubmit(submitHandler)}
			className="flex flex-col gap-6"
		>
			<Input
				label="Enter their number:"
				inlineLabel
				type="number"
				placeholder="+19999999999"
				invalid={!!errors.phoneNumber}
				{...register("phoneNumber", { required: true })}
			/>
			<Button
				className="mx-0 text-lg"
				isLoading={isSubmitting}
				disabled={!isValid}
			>
				WhatsApp them!
			</Button>
		</form>
	);
};

export default WhatsAppForm;
