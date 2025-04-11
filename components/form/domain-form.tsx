"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactInfo, DomainInfo, TableType } from "@/lib/type";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

// Regex to validate a standard domain name (e.g., example.com)
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const formSchema = z.object({
    domainName: z
        .string()
        .max(50) // optional, you can set a reasonable limit
        .regex(domainRegex, { message: "Invalid domain format" }),
    tableType: z.enum(["domain", "contact"]),
});

const DomainForm = ({
    isOpen,
    setIsOpen,
    setData,
    setTableType,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<DomainInfo[] | ContactInfo[]>>;
    setTableType: React.Dispatch<React.SetStateAction<"" | TableType>>;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            domainName: "",
            tableType: "domain",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // set loading state to true and prevent resubmission
        setIsLoading(true);

        // Define api url
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/whois`;

        try {
            // Post request to backend
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            //Throw error if response is NOT ok
            if (!res.ok) {
                throw new Error(`Server responded with status ${res.status}`);
            }

            // Parse response
            const data = await res.json();

            // Set data to be shown in table
            setData(data);

            // set tableType value to display exact table needed
            setTableType(values.tableType);

            // Set false to close modal
            setIsOpen(false);

            // set false to
            setIsLoading(false);
        } catch (error) {
            // Set false to close modal
            setIsOpen(false);

            // set false to
            setIsLoading(false);
            console.error("Error fetching WHOIS data:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Domain</DialogTitle>
                    <DialogDescription>
                        Check your domain here.
                    </DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="domainName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Domain Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Domain Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tableType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>
                                            Select what information you want
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="domain" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Domain Information
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="contact" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Contact Information
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid gap-2 grid-cols-1">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer"
                                >
                                    {isLoading ? (
                                        <LoaderCircle className="animate-spin" />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DomainForm;
