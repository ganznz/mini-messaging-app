import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { formSchema } from "@/components/schemas/schemas";
import { useSubmitMessage } from "@/hooks/useSubmitMessage";

interface IMessageForm {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MessageForm = ({ setFormOpen }: IMessageForm) => {
    const { submitMessage, loading: submitLoading } = useSubmitMessage();

    // define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            msg: "",
        },
    });

    // submit handler
    const onSubmit = (data: z.infer<typeof formSchema>) => submitMessage(data);

    return (
        // form backdrop that takes up entire screen
        <div className="absolute inset-0 bg-[black]/30 flex justify-center items-center p-4 sm:p-0">
            {/* form container */}
            <div className="absolute bg-white rounded-lg p-4 sm:p-8 shadow-lg w-[calc(100%-3rem)] sm:w-full sm:max-w-md animate-slide-up">
                <Button
                    className="absolute top-2 right-2"
                    variant="destructive"
                    size="icon"
                    onClick={() => setFormOpen(false)}
                >
                    <X size={24} strokeWidth={3} />
                </Button>
                <Form {...form}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                        Send a Message
                    </h2>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* username field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <span className="flex gap-4 items-center">
                                        <FormLabel>Username</FormLabel>
                                        <FormDescription>
                                            Your display name 🥵
                                        </FormDescription>
                                    </span>
                                    <FormControl>
                                        <Input
                                            placeholder="Your name here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* message field */}
                        <FormField
                            control={form.control}
                            name="msg"
                            render={({ field }) => (
                                <FormItem>
                                    <span className="flex gap-4 items-center">
                                        <FormLabel>Message</FormLabel>
                                        <FormDescription>
                                            Send a message 🤩
                                        </FormDescription>
                                    </span>
                                    <FormControl>
                                        <Input
                                            placeholder="Your message here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {(!submitLoading && (
                            <Button
                                type="submit"
                                className="w-full font-bold bg-[hsl(var(--green))] text-[hsl(var(--green-overlay))] hover:bg-[hsl(var(--light-green))]"
                            >
                                Send
                            </Button>
                        )) || (
                            <Button disabled className="w-full font-bold">
                                <Loader2 className="animate-spin" />
                                Sending...
                            </Button>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
};
