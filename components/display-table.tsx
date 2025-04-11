"use client";
import DomainForm from "@/components/form/domain-form";
import { contactTableHeaders } from "@/components/table/columns/contact";
import { domainTableHeaders } from "@/components/table/columns/domain";
import CustomTable from "@/components/table/custom-table";
import { Button } from "@/components/ui/button";
import { ContactInfo, DomainInfo, TableType } from "@/lib/type";
import { useState } from "react";

const DisplayTable = () => {
    const [tableType, setTableType] = useState<TableType | "">("");
    const [data, setData] = useState<DomainInfo[] | ContactInfo[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-2/3 flex flex-col items-center justify-center">
            <Button
                className="cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Check Domain
            </Button>

            {/* Check which table will display */}
            {tableType === "domain" ? (
                <CustomTable
                    columns={domainTableHeaders}
                    data={data as DomainInfo[]}
                />
            ) : tableType === "contact" ? (
                <CustomTable
                    columns={contactTableHeaders}
                    data={data as ContactInfo[]}
                />
            ) : null}

            <DomainForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setData={setData}
                setTableType={setTableType}
            />
        </div>
    );
};

export default DisplayTable;
