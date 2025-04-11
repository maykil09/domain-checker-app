import { ContactInfo, DomainInfo } from "@/lib/type";

export const domainData: DomainInfo[] = [
    {
        domainName: "example1.com",
        registrarName: "GoDaddy",
        registrationDate: "2015-06-01",
        expirationDate: "2025-06-01",
        estimatedDomainAge: "10 years",
        hostnames: "ns1.example1.com, ns2.example1.com",
    },
];

export const contactData: ContactInfo[] = [
    {
        registrantName: "John Doe",
        technicalContactName: "Jane Smith",
        administrativeContactName: "Mary Johnson",
        contactEmail: "john.doe@example.com",
    },
];
