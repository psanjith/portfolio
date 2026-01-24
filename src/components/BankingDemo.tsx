'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Account {
  number: string;
  name: string;
  balance: number;
  type: 'chequing' | 'savings';
  overdraft_limit?: number;
  interest_rate?: number;
}

type MenuOption = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function BankingDemo() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentMenu, setCurrentMenu] = useState<MenuOption>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const callAPI = async (action: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/banking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      setMessage('Failed to connect to server');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const loadAllAccounts = async () => {
    try {
      const response = await fetch('/api/banking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_all_accounts', data: {} })
      });
      const result = await response.json();
      if (result.success) {
        setAccounts([...result.chequing, ...result.savings]);
      }
    } catch (error) {
      console.error('Failed to load accounts');
    }
  };

  // Menu Option 1: Create Account
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const { accountType, cardNumber, name, balance, overdraftOrInterest } = formData;

    if (!cardNumber || !name || !balance || !overdraftOrInterest) {
      setMessage('Please fill in all fields');
      return;
    }

    const action = accountType === 'chequing' ? 'create_chequing' : 'create_savings';
    const data = {
      number: cardNumber,
      name: name,
      balance: balance,
      ...(accountType === 'chequing' && { overdraft_limit: overdraftOrInterest }),
      ...(accountType === 'savings' && { interest_rate: overdraftOrInterest })
    };

    const result = await callAPI(action, data);
    if (result.success) {
      setMessage(`✓ ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created successfully.`);
      await loadAllAccounts();
      setFormData({});
      setCurrentMenu(null);
    } else {
      setMessage(`✗ ${result.error}`);
    }
  };

  // Menu Option 2 & 3: Deposit
  const handleDeposit = async (e: React.FormEvent, type: 'chequing' | 'savings') => {
    e.preventDefault();
    const { cardNumber, amount } = formData;

    if (!cardNumber || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    const result = await callAPI(`deposit_${type}`, { number: cardNumber, amount });
    if (result.success) {
      setMessage(`✓ You have deposited $${amount}`);
      await loadAllAccounts();
      setFormData({});
      setCurrentMenu(null);
    } else {
      setMessage(`✗ Account not found.`);
    }
  };

  // Menu Option 4 & 5: Withdraw
  const handleWithdraw = async (e: React.FormEvent, type: 'chequing' | 'savings') => {
    e.preventDefault();
    const { cardNumber, amount } = formData;

    if (!cardNumber || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    const result = await callAPI(`withdraw_${type}`, { number: cardNumber, amount });
    if (result.success) {
      if (type === 'chequing') {
        setMessage('✓ Withdrawal successful');
      } else {
        setMessage('✓ Withdrawal successful.');
      }
      await loadAllAccounts();
      setFormData({});
      setCurrentMenu(null);
    } else {
      if (type === 'chequing') {
        setMessage('✗ Overdraft limit exceeded');
      } else {
        setMessage('✗ Insufficient funds.');
      }
    }
  };

  // Menu Option 6: Display Bank Info
  const handleDisplayInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cardNumber } = formData;

    if (!cardNumber) {
      setMessage('Please enter account number');
      return;
    }

    const account = accounts.find(a => a.number === cardNumber);
    if (!account) {
      setMessage('✗ Account does not exist.');
      return;
    }

    let info = `Account Information: ${account.number} \n Name: ${account.name} \n Balance: $${account.balance.toFixed(2)}`;
    if (account.type === 'chequing') {
      info += ` \n Overdraft Limit: $${account.overdraft_limit?.toFixed(2)}`;
    } else {
      info += ` \n Interest Rate: ${(account.interest_rate! * 100).toFixed(2)}%`;
    }
    setMessage(info);
    setFormData({});
  };

  // Menu Option 7: Close Account
  const handleCloseAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cardNumber } = formData;

    if (!cardNumber) {
      setMessage('Please enter account number');
      return;
    }

    const result = await callAPI('close_account', { number: cardNumber });
    if (result.success) {
      const account = accounts.find(a => a.number === cardNumber);
      const type = account?.type === 'chequing' ? 'Chequing' : 'Savings';
      setMessage(`✓ ${type} account ${cardNumber} has been closed and can no longer be accessed.`);
      await loadAllAccounts();
      setFormData({});
      setCurrentMenu(null);
    } else {
      setMessage('✗ Account does not exist.');
    }
  };

  const menuItems = [
    "1. Set up a new account",
    "2. Deposit into chequing",
    "3. Deposit into savings",
    "4. Withdraw from chequing",
    "5. Withdraw from savings",
    "6. Display bank info",
    "7. Close an account",
    "8. EXIT"
  ];

  return (
    <div className="space-y-4">
      {/* Professional Demo Header */}
      <div className="flex items-center gap-3 rounded-t-lg border-b border-slate-300 bg-slate-100 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-slate-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-slate-400"></div>
        </div>
        <span className="font-mono text-sm font-medium text-slate-700">Banking System Demo</span>
      </div>
      
      <div className="rounded-b-lg border border-slate-300 bg-slate-50 p-6 font-mono shadow-lg">
      {/* Main Menu */}
      {currentMenu === null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="mb-4 whitespace-pre-wrap text-sm text-slate-700">
            {menuItems.join('\n')}{'\n '}
            <span className="font-bold text-slate-900">WHAT WOULD YOU LIKE TO DO?</span>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7].map((option) => (
              <button
                key={option}
                onClick={() => setCurrentMenu(option as MenuOption)}
                className="rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-600 hover:bg-slate-100"
              >
                Option {option}
              </button>
            ))}
            <button
              onClick={() => setCurrentMenu(8)}
              className="rounded-lg bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              EXIT
            </button>
          </div>
        </motion.div>
      )}

      {/* Option 1: Create Account */}
      {currentMenu === 1 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreateAccount}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">SET UP A NEW ACCOUNT</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Type:</label>
            <select
              value={formData.accountType || 'chequing'}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
              className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="chequing">chequing</option>
              <option value="savings">savings</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Full Name:</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Current Balance:</label>
            <input
              type="number"
              step="0.01"
              value={formData.balance || ''}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Card Number ({formData.accountType === 'savings' ? 'savings' : 'chequing'}):
            </label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              {formData.accountType === 'savings' ? 'Interest Rate:' : 'Overdraft Limit:'}
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.overdraftOrInterest || ''}
              onChange={(e) => setFormData({ ...formData, overdraftOrInterest: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              Create Account
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 2: Deposit Chequing */}
      {currentMenu === 2 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => handleDeposit(e, 'chequing')}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">DEPOSIT INTO CHEQUING</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Amount to Deposit:</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              Deposit
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 3: Deposit Savings */}
      {currentMenu === 3 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => handleDeposit(e, 'savings')}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">DEPOSIT INTO SAVINGS</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Amount to Deposit:</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              Deposit
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 4: Withdraw Chequing */}
      {currentMenu === 4 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => handleWithdraw(e, 'chequing')}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">WITHDRAW FROM CHEQUING</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Amount to Withdraw:</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              Withdraw
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 5: Withdraw Savings */}
      {currentMenu === 5 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => handleWithdraw(e, 'savings')}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">WITHDRAW FROM SAVINGS</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Amount to Withdraw:</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
              Withdraw
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 6: Display Info */}
      {currentMenu === 6 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleDisplayInfo}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">DISPLAY BANK INFO</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Display Info
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Option 7: Close Account */}
      {currentMenu === 7 && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCloseAccount}
          className="space-y-4 rounded-lg border border-slate-300 bg-white shadow-sm p-6"
        >
          <p className="font-bold text-slate-800">CLOSE AN ACCOUNT</p>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Account Number:</label>
            <input
              type="text"
              value={formData.cardNumber || ''}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="mt-1 w-full rounded border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50">
              Close Account
            </button>
            <button type="button" onClick={() => { setCurrentMenu(null); setFormData({}); }} className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-500">
              Back
            </button>
          </div>
        </motion.form>
      )}

      {/* Exit */}
      {currentMenu === 8 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-slate-300 bg-white shadow-sm p-6 text-center"
        >
          <p className="mb-4 font-bold text-slate-800">Thank you for using the Banking System!</p>
          <button
            onClick={() => {
              setCurrentMenu(null);
              setFormData({});
              setMessage('');
            }}
            className="rounded bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Return to Menu
          </button>
        </motion.div>
      )}

      {/* Message Display */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`whitespace-pre-wrap rounded-lg border p-4 text-sm ${
            message.includes('✗')
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-emerald-300 bg-emerald-50 text-emerald-700'
          }`}
        >
          {message}
        </motion.div>
      )}
      </div>

      {/* Accounts List */}
      {accounts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-lg border border-slate-300 bg-slate-100 p-4 shadow-sm"
        >
          <p className="mb-3 font-mono font-bold text-slate-800">Active Accounts ({accounts.length})</p>
          <div className="space-y-2 font-mono text-xs text-slate-700">
            {accounts.map((acc) => (
              <p key={acc.number}>
                {acc.type === 'chequing' ? 'CHQ' : 'SAV'} | {acc.name.padEnd(20)} | #{acc.number.padEnd(12)} | Balance: ${acc.balance.toFixed(2).padStart(10)}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

