import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import {UseFormReturn} from "react-hook-form";

type FormValues = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface Props {
    name: keyof FormValues
    placeholder?: string
    label: string
    className?: string
    form: UseFormReturn<FormValues>
    type?: "password" | "email" | "text"
    autoComplete?: string
}
function FormInputField({ name, placeholder, label, className, form, type, autoComplete}: Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="mt-4">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input autoComplete={autoComplete} type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
    );
}

export default FormInputField;