import Navigation from "@/components/Navigation";
import FinancialStatements from "@/components/FinancialStatements";

const Statements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FinancialStatements />
      </main>
    </div>
  );
};

export default Statements;