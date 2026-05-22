/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  UserSquare2, 
  CreditCard, 
  Calendar, 
  Search, 
  Plus, 
  RefreshCw,
  Edit,
  Trash2,
  Dumbbell
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Member {
  id: string;
  name: string;
  type: "Premium" | "New";
  joinDate: string;
}

interface Payment {
  id: string;
  memberId: string;
  amount: number;
  type: "Card" | "Cash";
  discount: number;
  status: "Paid" | "Pending";
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Payments");
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: "success" | "error"} | null>(null);

  // Form State
  const [newPayment, setNewPayment] = useState({
    memberId: "",
    baseAmount: 0,
    type: "Card" as "Card" | "Cash",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      setMembers(data.members || []);
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
      showToast("Failed to sync with server", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment)
      });
      if (response.ok) {
        await fetchData();
        setShowAddModal(false);
        setNewPayment({ memberId: "", baseAmount: 0, type: "Card", cardNumber: "", expiry: "", cvv: "" });
        showToast("Payment processed successfully!");
      }
    } catch (error) {
      console.error("Error adding payment", error);
      showToast("Payment failed", "error");
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const response = await fetch(`/api/payments/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchData();
        showToast("Record deleted");
      }
    } catch (error) {
      showToast("Delete failed", "error");
    }
  };

  const handleToggleStatus = async (payment: Payment) => {
    try {
      const newStatus = payment.status === "Paid" ? "Pending" : "Paid";
      const response = await fetch(`/api/payments/${payment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        await fetchData();
        showToast(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      showToast("Update failed", "error");
    }
  };

  const filteredPayments = (payments || []).filter(p => {
    const member = members.find(m => m.id === p.memberId);
    return (member?.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 overflow-hidden font-sans relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-bold border ${
              notification.type === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${notification.type === "success" ? "bg-emerald-500" : "bg-rose-500"} animate-pulse`} />
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Dumbbell className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-yellow-500 line-clamp-1 uppercase">FITCORE</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Management System</p>
          </div>
        </div>

        <nav className="mt-8 flex-1 px-4 space-y-1">
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Dashboard" 
            active={activeTab === "Dashboard"} 
            onClick={() => setActiveTab("Dashboard")} 
          />
          <div className="pt-6 pb-2 px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Modules</div>
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Members" 
            active={activeTab === "Members"} 
            onClick={() => setActiveTab("Members")} 
          />
          <SidebarItem 
            icon={<UserSquare2 size={20} />} 
            label="Trainers" 
            active={activeTab === "Trainers"} 
            onClick={() => setActiveTab("Trainers")} 
          />
          <SidebarItem 
            icon={<CreditCard size={20} />} 
            label="Payments" 
            active={activeTab === "Payments"} 
            onClick={() => setActiveTab("Payments")} 
          />
          <SidebarItem 
            icon={<Calendar size={20} />} 
            label="Attendance" 
            active={activeTab === "Attendance"} 
            onClick={() => setActiveTab("Attendance")} 
          />
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <p className="text-[10px] font-semibold text-slate-500 uppercase mb-1">Group 21 - SE1020</p>
            <p className="text-xs text-slate-400 font-bold">OOP Project - 2026</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Payment & Discount</h2>
            <nav className="text-xs text-slate-400 flex items-center gap-2 mt-1 font-medium">
              <span className="hover:text-yellow-500 cursor-pointer transition-colors">FitCore</span>
              <span>/</span>
              <span className="text-yellow-500">Payment & Discount Management</span>
            </nav>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm flex items-center gap-2 transition-all border border-slate-700 cursor-pointer active:scale-95"
            >
              <RefreshCw size={16} className={loading ? "animate-spin text-yellow-500" : ""} />
              Sync
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg text-sm font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20 cursor-pointer active:scale-95"
            >
              <Plus size={18} />
              Process Payment
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-6 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search payments by member name or invoice ID..."
            className="w-full bg-[#1e293b] border border-slate-700 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all shadow-lg shadow-black/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/80">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoice</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Discount</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount (LKR)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, idx) => {
                  const member = members.find(m => m.id === payment.memberId);
                  return (
                    <motion.tr 
                      key={payment.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="px-6 py-5 text-yellow-500 font-mono text-sm font-bold">{payment.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-100">{member?.name || "Deleted Member"}</span>
                          <span className="text-[10px] text-slate-500 font-bold font-mono tracking-tight">{payment.memberId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`text-[11px] font-black px-2 py-1 rounded border ${
                          payment.discount > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/20" : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                        }`}>
                          {payment.discount}% OFF
                        </span>
                      </td>
                      <td className="px-6 py-5 font-black text-white text-lg tracking-tighter">
                        {payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${payment.type === "Card" ? "bg-blue-400" : "bg-orange-400"}`} />
                          {payment.type || "Cash"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button 
                          onClick={() => handleToggleStatus(payment)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                            payment.status === "Paid" 
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20"
                          }`}
                        >
                          {payment.status}
                        </button>
                      </td>
                      <td className="px-6 py-5 text-right space-x-2">
                        <button 
                          onClick={() => handleToggleStatus(payment)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-yellow-500 rounded-lg transition-all cursor-pointer border border-slate-700"
                          title="Toggle Status"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeletePayment(payment.id)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-all cursor-pointer border border-rose-500/20"
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredPayments.length === 0 && !loading && (
            <div className="py-24 text-center">
              <Search className="mx-auto w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No payment records found</p>
              <p className="text-slate-600 text-xs mt-1">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Payment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-lg bg-[#1e293b] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 pb-0 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">New Transaction</h3>
                  <p className="text-slate-400 text-xs font-medium">Configure payment details and process receipt.</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                  <CreditCard className="text-yellow-500 w-6 h-6" />
                </div>
              </div>

              <form onSubmit={handleAddPayment} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Select Member</label>
                    <select 
                      required
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-yellow-500/50 outline-none appearance-none transition-all"
                      value={newPayment.memberId}
                      onChange={(e) => setNewPayment({...newPayment, memberId: e.target.value})}
                    >
                      <option value="">Member ID...</option>
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.id})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Monthly Fee (LKR)</label>
                    <input 
                      type="number"
                      required
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-slate-700"
                      placeholder="5000.00"
                      value={newPayment.baseAmount || ""}
                      onChange={(e) => setNewPayment({...newPayment, baseAmount: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>

                {newPayment.memberId && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-black">%</div>
                    <div>
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">Automatic Reward Calculation</p>
                      <p className="text-xs text-slate-300 font-medium">
                        {members.find(m => m.id === newPayment.memberId)?.type === "Premium" 
                          ? "Premium Status: 10% Loyalty discount will be subtracted from final total." 
                          : "New Membership: Standard rate applies for the first 3 months."}
                      </p>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1 text-center">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setNewPayment({...newPayment, type: "Card"})}
                      className={`py-4 rounded-2xl border-2 text-sm font-black transition-all flex items-center justify-center gap-2 ${newPayment.type === "Card" ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "border-slate-800 text-slate-500 hover:border-slate-600"}`}
                    >
                      <CreditCard size={18} />
                      DEBIT CARD
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewPayment({...newPayment, type: "Cash"})}
                      className={`py-4 rounded-2xl border-2 text-sm font-black transition-all flex items-center justify-center gap-2 ${newPayment.type === "Cash" ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "border-slate-800 text-slate-500 hover:border-slate-600"}`}
                    >
                      <Users size={18} />
                      CASH HANDOVER
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {newPayment.type === "Card" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-4 pt-2"
                    >
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Card Number</label>
                        <input 
                          type="text"
                          required
                          className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-yellow-500/50 outline-none font-mono tracking-widest"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={newPayment.cardNumber}
                          onChange={(e) => setNewPayment({...newPayment, cardNumber: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Expiry</label>
                          <input 
                            type="text"
                            required
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-yellow-500/50 outline-none"
                            placeholder="MM/YY"
                            value={newPayment.expiry}
                            onChange={(e) => setNewPayment({...newPayment, expiry: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">CVV</label>
                          <input 
                            type="password"
                            required
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-yellow-500/50 outline-none"
                            placeholder="XXX"
                            maxLength={3}
                            value={newPayment.cvv}
                            onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-slate-700"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-yellow-500/30 cursor-pointer scale-100 hover:scale-[1.02] active:scale-95"
                  >
                    Process Receipt
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group cursor-pointer border ${
        active 
          ? "bg-yellow-500 text-slate-900 shadow-xl shadow-yellow-500/30 border-yellow-400" 
          : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border-transparent"
      }`}
    >
      <span className={`${active ? "text-slate-900" : "text-slate-500 group-hover:text-yellow-500"} transition-colors`}>{icon}</span>
      {label}
      {active && <motion.div layoutId="active-nav" className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-800" />}
    </button>
  );
}

