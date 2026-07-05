import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppShell } from "@/components/agrolens/AppShell";
import { getCurrentUser, logout, deleteAccount } from "@/lib/auth";

function UserPage() {
  const navigate = useNavigate();
  const [user] = useState(getCurrentUser());

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleDelete() {
    const ok = window.confirm(
      "This will permanently delete your account. Continue?"
    );

    if (!ok) return;

    deleteAccount();
    navigate("/signup");
  }

  if (!user) {
    return (
      <AppShell>
        <div className="p-10 text-center">
          <h1 className="text-xl font-bold">Not logged in</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 rounded-lg bg-ag-green px-5 py-2 text-black"
          >
            Go to Login
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
        {/* Header */}
        <div className="surface-elevated rounded-xl p-6">
          <h1 className="text-2xl font-bold">👤 User Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your AGROLENS account
          </p>
        </div>

        {/* Profile */}
        <div className="surface-card rounded-xl p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground">
                First Name
              </label>
              <p className="font-semibold">{user.firstName}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Last Name
              </label>
              <p className="font-semibold">{user.lastName}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Username
              </label>
              <p className="font-semibold">{user.username}</p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Email
              </label>
              <p className="font-semibold">{user.email}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">
                Location
              </label>
              <p className="font-semibold">
                {user.location || "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            onClick={handleLogout}
            className="flex-1 rounded-lg bg-ag-amber px-4 py-3 font-semibold"
          >
            Logout
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 rounded-lg bg-red-500 px-4 py-3 font-semibold text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default UserPage;