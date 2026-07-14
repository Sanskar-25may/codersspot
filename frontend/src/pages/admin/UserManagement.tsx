import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminUsers, updateUserRole } from '../../services/courses';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const loadUsers = () => {
    getAdminUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setMessage(null);
    try {
      const response = await updateUserRole(userId, newRole as any);
      setMessage(response.message);
      loadUsers();
    } catch {
      setMessage("Failed to update user role.");
    }
  };

  const filteredUsers = users.filter((u: any) => 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    (u.full_name && u.full_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight heading-font">User Accounts Directory</h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Search registered accounts, modify profiles, and switch authorization roles.</p>
        </div>
        <Link to="/admin" className="text-xs font-bold text-violet-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      {message && (
        <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
          ✓ {message}
        </div>
      )}

      {/* Filter and Search */}
      <div className="max-w-md">
        <input 
          type="text" 
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition-all"
          style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Users table */}
      <div className="p-8 rounded-3xl border glass flex-1">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            No registered users match your search query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-semibold">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-tertiary)' }}>
                  <th className="py-3 px-4 uppercase tracking-wider">Account Details</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Joined Date</th>
                  <th className="py-3 px-4 uppercase tracking-wider">Onboarding</th>
                  <th className="py-3 px-4 uppercase tracking-wider text-right">Access Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u: any) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-all" style={{ borderColor: 'var(--border-soft)' }}>
                    <td className="py-4 px-4">
                      <div className="font-bold">{u.full_name || 'No Name'}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{u.email}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {new Date(u.date_joined).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${u.isOnboarded ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                        {u.isOnboarded ? "COMPLETED" : "PENDING"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border text-xs font-bold focus:outline-none"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                      >
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
