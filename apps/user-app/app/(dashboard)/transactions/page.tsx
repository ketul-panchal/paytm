"use client"; // Ensure this is a client component

import { useEffect, useState } from 'react';

interface P2PTransfer {
  id: number;
  amount: number;
  timestamp: string;
  fromUser: {
    name: string | null;
    email: string;
  };
  toUser: {
    name: string | null;
    email: string;
  };
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<P2PTransfer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/transactions'); // Fetching from your API route
        const data = await response.json();

        if (response.ok) {
          setTransactions(data.p2pTransfers); // Make sure to access the data correctly
        } else {
          console.error('Error fetching transactions:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
      setLoading(false);
    }

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (transactions.length === 0) {
    return <div>No transactions found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your P2P Transactions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left border-b">ID</th>
              <th className="py-2 px-4 text-left border-b">Amount</th>
              <th className="py-2 px-4 text-left border-b">From</th>
              <th className="py-2 px-4 text-left border-b">To</th>
              <th className="py-2 px-4 text-left border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transfer) => (
              <tr key={transfer.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{transfer.id}</td>
                <td className="py-2 px-4 border-b">{(transfer.amount / 100).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  {transfer.fromUser.name || 'Unknown'} 
                </td>
                <td className="py-2 px-4 border-b">
                  {transfer.toUser.name || 'Unknown'} 
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(transfer.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
