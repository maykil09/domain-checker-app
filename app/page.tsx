import DisplayTable from "@/components/display-table";

const Home = async () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
                Domain Checker
            </h2>
            <DisplayTable />
        </div>
    );
};

export default Home;
