"use client";

import { Suspense, useEffect, useState } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound, useParams } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default function AccountPage() {
  const params = useParams();
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get id from params
        const id = params.id;
        
        if (!id) {
          setError(true);
          setLoading(false);
          return;
        }
        
        const data = await getAccountWithTransactions(id);
        
        if (!data) {
          setError(true);
          setLoading(false);
          return;
        }
        
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <BarLoader color="#9333ea" width={150} />
      </div>
    );
  }
  
  if (error || !accountData) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold text-red-500">Account not found</h2>
        <p className="text-muted-foreground">The requested account could not be found.</p>
      </div>
    );
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
