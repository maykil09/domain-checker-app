import { WhoisResponse, DomainInfo, ContactInfo, TableType } from "@/lib/type";

export const formatWhoisResponse = (
    rawData: any,
    type: TableType
): WhoisResponse => {
    // Check if the current type is 'domain'
    if (type === "domain") {
        // Format DomainInfo
        const domainInfo: DomainInfo = {
            domainName: rawData.WhoisRecord?.domainName,
            registrarName: rawData.WhoisRecord?.registrarName ?? "",
            registrationDate: rawData.WhoisRecord?.createdDate
                ? formatDate(rawData.WhoisRecord?.createdDate)
                : "",
            expirationDate: rawData.WhoisRecord?.expiresDate
                ? formatDate(rawData.WhoisRecord?.expiresDate)
                : "",
            estimatedDomainAge: `${
                rawData.WhoisRecord?.estimatedDomainAge ?? 0
            } days`,
            hostnames: formatHostname(
                rawData.WhoisRecord?.nameServers?.hostNames ?? []
            ),
        };
        return domainInfo;
    }

    // Check if the current type is 'contact'
    if (type === "contact") {
        // Format ContactInfo
        const contactInfo: ContactInfo = {
            registrantName: rawData.WhoisRecord?.registrant?.organization ?? "",
            technicalContactName:
                rawData.WhoisRecord?.technicalContact?.organization ?? "",
            administrativeContactName:
                rawData.WhoisRecord?.administrativeContact?.organization ?? "",
            contactEmail: rawData.WhoisRecord?.contactEmail ?? "",
        };
        return contactInfo;
    }

    throw new Error("Invalid type");
};

const formatHostname = (hostnames: string[]): string => {
    // Join hostnames with commas
    const joined = hostnames.join(", ");

    // truncate the result if it's longer than 25 characters
    return joined.length > 25 ? `${joined.slice(0, 25)}...` : joined;
};

const formatDate = (rawDate: string): string => {
    // Convert the raw date string to a Date object
    const date = new Date(rawDate);

    // Format it as 'Month Day, Year' (e.g., January 1, 2025)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
