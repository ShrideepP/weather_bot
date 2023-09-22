import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string()
    .email(),
  password: z.string()
    .min(6, { 
      message: 'Password should be atleast 6 chars long.' 
    }),
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signin`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });

      if(response.status === 202 && response.data) {
        setCookies("token", response.data.token);
        navigate("/dashboard");
      };
    } catch (error) {
      toast({
        title: 'Incorrect email or password combination.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    };
  };

  return (
    <section className="w-full h-[calc(100vh-10rem)] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 grid place-items-center">
      <div className="w-full md:w-2/4 lg:w-2/5 space-y-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 rounded">
        <h2 className="text-3xl font-semibold">Admin Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email - admin@example.com</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        className="h-12 px-4"
                        placeholder="Email" 
                        {...field} 
                      />
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
                    <FormLabel>Password - admin@123</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        className="h-12 px-4"
                        placeholder="Password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} type="submit" size="lg" className="w-full h-12 flex items-center gap-x-2">
              {loading ? "Please wait" : "Continue"}
              {loading && <Icons.loader className="w-5 h-5 animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
