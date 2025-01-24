import React from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/Components/ui/form";
import FormInputField from "@/Components/Fields/FormInputField";
import {Button} from "@/Components/ui/button";
import axios from "axios";

type FormValues = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

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
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        }
    });

    const [message, setMessage] = React.useState("");

    function onSubmit(values: FormValues) {
        axios.post(route('api.auth.register'), values, {
            headers: {Accept: "application/json"},
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error.response.data);
                setMessage(error.response.data.message);
            })
    }

    // @ts-ignore
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