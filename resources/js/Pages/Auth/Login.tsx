import React, {FormEventHandler} from 'react';


import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/Components/ui/form";
import {Input} from "@/Components/ui/input";
import {Button} from "@/Components/ui/button";
import {Checkbox} from "@/Components/ui/checkbox";
import {Link, router} from "@inertiajs/react";
import axios from "axios";
import api from "@/axios";

const formSchema = z.object({
    email: z.string().email("Please use a valid email address").min(1),
    password: z.string().min(6),
    remember: z.boolean().default(false),
    //TODO add remember checkbox
})
function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    })

    const [message, setMessage] = React.useState("");

    function onSubmit(values: z.infer<typeof formSchema>) {
        api.post(route('api.auth.login'), values, {
            headers: {Accept: "application/json"},
        })
            .then(response => {
                if (response.data.error === null) {
                    setMessage(response.data.message);
                }


                const token = response.data.objectData.token;
                const tokenExpiration = response.data.objectData.token_expired_time;
                const sessionExpire = response.data.objectData.session_expired_time;
                localStorage.setItem("token", token);
                localStorage.setItem("tokenExpiration", tokenExpiration);
                localStorage.setItem("sessionExpiration", sessionExpire);

                router.visit('/dashboard');

            }).catch(error => {
            setMessage(error.response.data.message);
        });
    }

    return (
        <div className="login-wrapper bg-slate-500 w-screen h-screen">
            <div className="login-form-wrapper w-fit bg-stone-300 rounded-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[30px_30px_30px_-0px_rgba(0,0,0,0.3)]">
                <div className="login-form-contents p-3 flex justify-center w-fit">
                    <div className="login-form p-12 w-3/5 relative">
                        <h3 className="text-3xl">MyWeddingPlanner</h3>
                        {/*<h1 className="text-4xl mt-12">Hi There,...</h1>*/}
                        {/*<h3 className="text-2xl italic">Start planning your perfect wedding!</h3>*/}

                        {message && (
                                <div className="message p-4 bg-slate-300 border-slate-500 text-slate-500">
                                    {message}
                                </div>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="my-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="mb-5">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-between items-center mt-4">
                                        <FormField
                                            control={form.control}
                                            name="remember"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center gap-2 ">
                                                    <FormControl>
                                                        <Checkbox checked={field.value}
                                                                  onCheckedChange={(checked) => field.onChange(checked)}/>
                                                    </FormControl>
                                                    <FormLabel>Remember me!</FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Link className={"text-sm font-medium text-right"} href={"/forgot-password"}>Forgot password</Link>
                                    </div>
                                <Button className={"bg-neutral-700 w-full mt-4"} type="submit">Submit</Button>
                            </form>
                        </Form>
                        <p className="text-sm absolute bottom-0 text-gray-600">©MyWeddingPlanner Copywrite</p>
                    </div>
                    <div className="login-form-image w-2/5 flex rounded-2xl overflow-hidden float-right">
                        <img className="object-cover" src="/img/login.jpg"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;