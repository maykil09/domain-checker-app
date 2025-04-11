import { DomainInfo } from "@/lib/type";

export const domainTableHeaders: { key: keyof DomainInfo; label: string }[] = [
    { key: "domainName", label: "Domain Name" },
    { key: "registrarName", label: "Registrar Name" },
    { key: "registrationDate", label: "Registration Date" },
    { key: "expirationDate", label: "Expiration Date" },
    { key: "estimatedDomainAge", label: "Estimated Domain Age" },
    { key: "hostnames", label: "Hostnames" },
];
