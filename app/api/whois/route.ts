import { formatWhoisResponse } from "@/lib/formatWhoisResponse";

export const POST = async (request: Request) => {
    const { domainName, tableType } = await request.json();

    const apiKey = process.env.WHOIS_API_KEY;
    const url = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domainName}&outputFormat=json`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch from Whois API");

        const rawData = await response.json();

        // format raw data base on type
        const formattedResponse = formatWhoisResponse(rawData, tableType);

        return new Response(JSON.stringify([formattedResponse]), {
            status: 200,
        });
    } catch (error) {
        console.error("API Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
            }
        );
    }
};
