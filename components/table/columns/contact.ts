import { ContactInfo } from "@/lib/type";

export const contactTableHeaders: { key: keyof ContactInfo; label: string }[] =
    [
        { key: "registrantName", label: "Registrant Name" },
        { key: "technicalContactName", label: "Technical Contact Name" },
        {
            key: "administrativeContactName",
            label: "Administrative Contact Name",
        },
        { key: "contactEmail", label: "Contact Email" },
    ];
