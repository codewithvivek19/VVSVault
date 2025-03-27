"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { getUserAccounts } from "@/actions/dashboard";

function TransactionPageContent() {
  const searchParams = useSearchParams();
  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const editId = searchParams.get("edit");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch accounts
        const accountsData = await getUserAccounts();
        setAccounts(accountsData);
        
        // If edit mode, fetch transaction data
        if (editId) {
          const transaction = await getTransaction(editId);
          setInitialData(transaction);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [editId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-10 flex justify-center">
        <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}

export default function AddTransactionPage() {
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-5 py-10 flex justify-center">
        <div className="animate-pulse h-4 w-32 bg-gray-200 rounded"></div>
      </div>
    }>
      <TransactionPageContent />
    </Suspense>
  );
}
