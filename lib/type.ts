export type TableType = "domain" | "contact";

export type DomainInfo = {
    domainName: string;
    registrarName: string;
    registrationDate: string;
    expirationDate: string;
    estimatedDomainAge: string;
    hostnames: string;
};

export type ContactInfo = {
    registrantName: string;
    technicalContactName: string;
    administrativeContactName: string;
    contactEmail: string;
};

export type WhoisResponse = DomainInfo | ContactInfo;
