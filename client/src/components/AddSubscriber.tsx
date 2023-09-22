import { useState } from "react";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useToast } from "./ui/use-toast";

import axios, { AxiosError } from "axios";

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
  chatId: z.string()
    .min(6)
    .max(6),
  name: z.string(),
  location: z.string(),
});

export default function AddSubscriber() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [cookies, _] = useCookies(["token"]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/subscriptions/subscribe`, JSON.stringify(data), {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies?.token}`,
        },
      });
      if(response.status === 201 && response.data) {
        toast({
          title: response.data
        });
        queryClient.refetchQueries('users');
      };
      console.log(response);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if(axiosError.response?.status === 409) {
          toast({
            title: 'Already subscribed!',
            description: `User with Chat ID ${data.chatId} has already subscribed.`
          });
        };
      } else {
        toast({
          title: 'Oops! something went wrong.',
          description: 'If this error persists please contact the website owner.',
        });
      };
    } finally {
      setIsLoading(false);
      form.setValue('chatId', '');
      form.setValue('name', '');
      form.setValue('location', '');
    };
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        className="h-12 px-4"
                        placeholder="eg: John Doe" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chatId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chat ID</FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        className="h-12 px-4"
                        placeholder="eg: 123456" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      className="h-12 px-4"
                      placeholder="eg: New York" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} size="lg" className="flex items-center gap-x-2">
            {isLoading && <Icons.loader className="w-4 h-4 animate-spin" />}
            {isLoading ? "Please wait" : "Subscribe"}
          </Button>
        </form>
      </Form>
    </section>
  );
};
