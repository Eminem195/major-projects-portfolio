import { useMemo, useState } from "react";

const initialUsers = [
  {
    id: 101,
    name: "Anjali Sharma",
    email: "anjali.sharma@example.com",
    phone: "+91 98765 43210",
    role: "Customer",
    status: "Active",
    joined: "Apr 12, 2024",
    city: "Mumbai",
    bookings: 5,
    verified: true,
    lastActive: "2 hours ago",
    subscription: "Premium",
    spending: "₹48,500",
  },
  {
    id: 112,
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 91234 56789",
    role: "Owner",
    status: "Active",
    joined: "Jan 28, 2024",
    city: "Delhi",
    bookings: 12,
    verified: true,
    lastActive: "10 min ago",
    subscription: "Premium Plus",
    spending: "₹1,25,000",
  },
  {
    id: 127,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 99887 77665",
    role: "Customer",
    status: "Pending",
    joined: "May 06, 2024",
    city: "Bangalore",
    bookings: 0,
    verified: false,
    lastActive: "1 day ago",
    subscription: "Basic",
    spending: "₹0",
  },
  {
    id: 135,
    name: "Nina Kapoor",
    email: "nina.kapoor@example.com",
    phone: "+91 94563 21478",
    role: "Owner",
    status: "Suspended",
    joined: "Feb 14, 2024",
    city: "Goa",
    bookings: 8,
    verified: true,
    lastActive: "2 weeks ago",
    subscription: "Premium",
    spending: "₹92,000",
  },
  {
    id: 142,
    name: "Arjun Desai",
    email: "arjun.desai@example.com",
    phone: "+91 89765 32145",
    role: "Customer",
    status: "Active",
    joined: "Mar 20, 2024",
    city: "Ahmedabad",
    bookings: 3,
    verified: true,
    lastActive: "5 min ago",
    subscription: "Premium",
    spending: "₹32,000",
  },
  {
    id: 156,
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 97654 32198",
    role: "Owner",
    status: "Active",
    joined: "Dec 10, 2023",
    city: "Kochi",
    bookings: 15,
    verified: true,
    lastActive: "30 sec ago",
    subscription: "Premium Plus",
    spending: "₹1,84,500",
  },
  {
    id: 163,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 88765 43210",
    role: "Customer",
    status: "Active",
    joined: "Feb 28, 2024",
    city: "Pune",
    bookings: 7,
    verified: true,
    lastActive: "3 hours ago",
    subscription: "Standard",
    spending: "₹64,000",
  },
  {
    id: 174,
    name: "Divya Gupta",
    email: "divya.gupta@example.com",
    phone: "+91 95432 12876",
    role: "Customer",
    status: "Active",
    joined: "Jan 15, 2024",
    city: "Hyderabad",
    bookings: 4,
    verified: true,
    lastActive: "1 hour ago",
    subscription: "Premium",
    spending: "₹40,500",
  },
  {
    id: 185,
    name: "Ravi Patel",
    email: "ravi.patel@example.com",
    phone: "+91 92187 65432",
    role: "Owner",
    status: "Active",
    joined: "Nov 05, 2023",
    city: "Surat",
    bookings: 18,
    verified: true,
    lastActive: "15 min ago",
    subscription: "Premium Plus",
    spending: "₹2,15,000",
  },
  {
    id: 196,
    name: "Neha Rajpoot",
    email: "neha.rajpoot@example.com",
    phone: "+91 98543 21098",
    role: "Customer",
    status: "Pending",
    joined: "May 01, 2024",
    city: "Jaipur",
    bookings: 1,
    verified: false,
    lastActive: "4 days ago",
    subscription: "Basic",
    spending: "₹8,500",
  },
  {
    id: 207,
    name: "Amar Kumar",
    email: "amar.kumar@example.com",
    phone: "+91 91234 56789",
    role: "Customer",
    status: "Active",
    joined: "Mar 10, 2024",
    city: "Chennai",
    bookings: 6,
    verified: true,
    lastActive: "20 min ago",
    subscription: "Premium",
    spending: "₹56,000",
  },
  {
    id: 218,
    name: "Sneha Iyer",
    email: "sneha.iyer@example.com",
    phone: "+91 87654 32109",
    role: "Owner",
    status: "Active",
    joined: "Oct 22, 2023",
    city: "Trivandrum",
    bookings: 11,
    verified: true,
    lastActive: "45 sec ago",
    subscription: "Premium",
    spending: "₹1,58,000",
  },
];

const roles = ["All Roles", "Customer", "Owner"];
const statuses = ["All Status", "Active", "Pending", "Suspended"];
const sortOptions = ["Name", "Joined", "Bookings", "Spending"];

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Name");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    role: "Customer",
    status: "Active",
    subscription: "Basic",
  });

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.phone, user.role, user.city]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "All Roles" || user.role === selectedRole;
      const matchesStatus = selectedStatus === "All Status" || user.status === selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Joined") return new Date(b.joined) - new Date(a.joined);
      if (sortBy === "Bookings") return b.bookings - a.bookings;
      if (sortBy === "Spending") {
        const aVal = parseInt(a.spending.replace(/[^\d]/g, ""));
        const bVal = parseInt(b.spending.replace(/[^\d]/g, ""));
        return bVal - aVal;
      }
      return 0;
    });

    return filtered;
  }, [users, searchTerm, selectedRole, selectedStatus, sortBy]);

  const paginatedUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const summary = useMemo(
    () => ({
      total: users.length,
      customers: users.filter((user) => user.role === "Customer").length,
      owners: users.filter((user) => user.role === "Owner").length,
      active: users.filter((user) => user.status === "Active").length,
      verified: users.filter((user) => user.verified).length,
      totalSpending: users.reduce((sum, u) => sum + parseInt(u.spending.replace(/[^\d]/g, "") || 0), 0),
    }),
    [users]
  );

  const resetForm = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      role: "Customer",
      status: "Active",
      subscription: "Basic",
    });
  };

  const openUserForm = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        role: user.role,
        status: user.status,
        subscription: user.subscription,
      });
      setShowForm(true);
      return;
    }
    resetForm();
    setShowForm(true);
  };

  const closeUserForm = () => {
    resetForm();
    setShowForm(false);
  };

  const handleSaveUser = () => {
    const { name, email, phone, city, role, status, subscription } = formData;
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in Name, Email and Phone before saving.");
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id 
            ? { ...user, name, email, phone, city, role, status, subscription } 
            : user
        )
      );
      closeUserForm();
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      city,
      role,
      status,
      subscription,
      joined: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      bookings: 0,
      verified: false,
      lastActive: "now",
      spending: "₹0",
    };

    setUsers((prev) => [newUser, ...prev]);
    closeUserForm();
  };

  const handleDeleteUser = (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setSelectedUsers((prev) => {
      const updated = new Set(prev);
      updated.delete(userId);
      return updated;
    });
  };

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        const nextStatus = user.status === "Active" ? "Suspended" : "Active";
        return { ...user, status: nextStatus };
      })
    );
  };

  const toggleUserSelect = (userId) => {
    setSelectedUsers((prev) => {
      const updated = new Set(prev);
      if (updated.has(userId)) updated.delete(userId);
      else updated.add(userId);
      return updated;
    });
  };

  const bulkDelete = () => {
    if (selectedUsers.size === 0) {
      alert("Select users to delete");
      return;
    }
    if (!window.confirm(`Delete ${selectedUsers.size} users permanently?`)) return;
    setUsers((prev) => prev.filter((user) => !selectedUsers.has(user.id)));
    setSelectedUsers(new Set());
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-lg ring-1 ring-slate-700 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin panel</p>
              <h1 className="mt-3 text-4xl font-bold">User Management</h1>
              <p className="mt-2 text-slate-300">
                Manage {summary.total} users, roles, subscriptions & verify accounts.
              </p>
            </div>
            <button
              onClick={() => openUserForm()}
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700"
            >
              + Add New User
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Total</p>
              <p className="mt-3 text-3xl font-bold">{summary.total}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Customers</p>
              <p className="mt-3 text-3xl font-bold">{summary.customers}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Owners</p>
              <p className="mt-3 text-3xl font-bold">{summary.owners}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-green-300">Active</p>
              <p className="mt-3 text-3xl font-bold">{summary.active}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Verified</p>
              <p className="mt-3 text-3xl font-bold">{summary.verified}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-purple-300">Total Revenue</p>
              <p className="mt-3 text-2xl font-bold">₹{(summary.totalSpending / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700">Search users</label>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, phone or city"
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex-1">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{paginatedUsers.length}</span> of <span className="font-semibold">{filteredUsers.length}</span> users
              </p>
            </div>
            {selectedUsers.size > 0 && (
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                  {selectedUsers.size} selected
                </span>
                <button
                  onClick={bulkDelete}
                  className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Delete selected
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden">
          <div className="flex flex-col gap-4 p-6 border-b lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Users List</h2>
              <p className="mt-1 text-sm text-slate-500">{filteredUsers.length} users match your filters</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(new Set(paginatedUsers.map(u => u.id)));
                        } else {
                          setSelectedUsers(new Set());
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold">User</th>
                  <th className="px-6 py-4 text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold">Location</th>
                  <th className="px-6 py-4 text-sm font-semibold">Bookings</th>
                  <th className="px-6 py-4 text-sm font-semibold">Spending</th>
                  <th className="px-6 py-4 text-sm font-semibold">Joined</th>
                  <th className="px-6 py-4 text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-slate-500">
                      No users found. Adjust your filters or add a new user.
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.id)}
                          onChange={() => toggleUserSelect(user.id)}
                          className="w-4 h-4 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.role}</div>
                          </div>
                          {user.verified && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">✓ Verified</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{user.city}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                          {user.bookings}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{user.spending}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{user.joined}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : user.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            <span className={`h-2 w-2 rounded-full ${
                              user.status === "Active" ? "bg-emerald-600" : user.status === "Pending" ? "bg-amber-600" : "bg-slate-400"
                            }`}></span>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 space-x-1">
                        <button
                          onClick={() => openUserForm(user)}
                          title="Edit user"
                          className="inline-flex rounded-2xl bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === "Active" ? "Suspend" : "Activate"}
                          className="inline-flex rounded-2xl bg-slate-600 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                        >
                          {user.status === "Active" ? "⊘" : "◉"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                          className="inline-flex rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-600"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredUsers.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                        currentPage === page
                          ? "bg-cyan-600 text-white"
                          : "border border-slate-300 bg-white hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={8}>8 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
              </select>
            </div>
          )}
        </section>

        {showForm && (
          <section className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {editingUser ? "Edit user" : "Add new user"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {editingUser
                    ? "Update user details and account status."
                    : "Create a new account for a customer or owner."}
                </p>
              </div>
              <button
                onClick={closeUserForm}
                className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Name</span>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Phone</span>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 12345 67890"
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Role</span>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option value="Customer">Customer</option>
                  <option value="Owner">Owner</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Status</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                onClick={closeUserForm}
                className="rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                {editingUser ? "Save changes" : "Create user"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Users;