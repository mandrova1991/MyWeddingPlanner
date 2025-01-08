import React from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import {UseFormReturn} from "react-hook-form";

interface Props {
    name: string
    placeholder?: string
    label: string
    className?: string
    form: UseFormReturn
    type?: "password" | "email" | "text"
    autoComplete?: string
}
function FormInputField({ name, placeholder, label, className, form, type, autoComplete}: Props): JSX.Element {
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