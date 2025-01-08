import React from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import FormInputField from "@/Components/Fields/FormInputField";
import {Button} from "@/Components/ui/button";
import axios from "axios";

const formSchema = z.object({
    name: z.string().min(1, "Fullname is required"),
    email: z.string().email("Please use a valid emailaddress").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Password is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
    });

function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            password: "",
            password_confirmation: "",
        }
    });

    const [message, setMessage] = React.useState("");

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post(route('api.auth.register'), values, {
            headers: {Accept: "application/json"},
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data);
                setMessage(error.response.data.message);
            })
    }

    return (
        <div className="registration-form w-[800px]">
            <h2>Register</h2>

            {message && (
                <div className="message p-4 bg-slate-300 border-slate-500 text-slate-500">
                    {message}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInputField name="name" label="Fullname" form={form} type="text"/>
                    <FormInputField name="email" label="Email" form={form} type="email"/>
                    <FormInputField name="password" label="Password" form={form} type="password"/>
                    <FormInputField name="password_confirmation" label="Confirm Password" form={form} type="password"/>
                    <Button className="mt-4" type="submit">Register</Button>
                </form>
            </Form>
        </div>
    );
}

export default Register;