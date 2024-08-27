import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/contextapi';

const Transaction = () => {
    const [view, setView] = useState('other'); // Default view is 'other'
    const { getUserTransactions, transactions } = useAuth(); // Get transactions from auth context

    useEffect(() => {
        getUserTransactions(); // Fetch transactions when component mounts
    }, []);

    const handleViewChange = (view) => {
        setView(view);
    };

    const renderTransactions = (type) => {
        let filteredTransactions = [];
        
        if (type === 'other') {
            // Combine both recharge and withdrawal transactions when "other" is selected
            filteredTransactions = transactions.filter(tx => tx.type === 'recharge' || tx.type === 'withdrawal');
        } else {
            // Filter based on the selected type (recharge or withdrawal)
            filteredTransactions = transactions.filter(tx => tx.type === type);
        }

        if (filteredTransactions.length === 0) {
            return <p className="text-gray-500">No data found</p>;
        }

        return filteredTransactions.map(tx => (
            <div key={tx._id} className="border p-4 mb-2">
                <p><strong>Amount:</strong> ${tx.amount}</p>
                <p><strong>Order ID:</strong> {tx.orderId}</p>
                <p><strong>Date:</strong> {new Date(tx.createdAt).toDateString()}</p>
                <p><strong> type</strong> {tx.type}</p>
            </div>
        ));
    };

    return (
        <div className="p-4 m-5 items-center md:w-[100vh] w-auto">
            <div className="mb-4 flex justify-center space-x-4">
                <button
                    onClick={() => handleViewChange('other')}
                    className={`px-4 py-2 rounded-lg ${view === 'other' ? 'bg-yellow-200 text-black' : 'bg-gray-200 text-black'}`}
                >
                    Other
                </button>
                <button
                    onClick={() => handleViewChange('recharge')}
                    className={`px-4 py-2 rounded-lg ${view === 'recharge' ? 'bg-green-900 text-white' : 'bg-gray-200 text-black'}`}
                >
                    Recharge
                </button>
                <button
                    onClick={() => handleViewChange('withdraw')}
                    className={`px-4 py-2 rounded-lg ${view === 'withdraw' ? 'bg-green-900 text-white' : 'bg-gray-200 text-black'}`}
                >
                    Withdraw
                </button>
            </div>

            <div>
                {view === 'recharge' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Recharge Transactions</h2>
                        {renderTransactions('recharge')}
                    </div>
                )}

                {view === 'withdraw' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Withdrawal Transactions</h2>
                        {renderTransactions('withdrawal')}
                    </div>
                )}

                {view === 'other' && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Other Transactions</h2>
                        {renderTransactions('other')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transaction;
