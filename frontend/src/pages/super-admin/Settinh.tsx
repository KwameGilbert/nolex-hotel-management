// src/pages/super-admin/SettingsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface SettingsData {
  companyName: string;
  supportEmail: string;
  defaultCurrency: string;
  language: string;
  timezone: string;
  autoBackup: boolean;
  twoFactorAuth: boolean;
  notifyOnBooking: boolean;
}

export default function SettingsPage() {
  const [formData, setFormData] = useState<SettingsData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get("../../../public/data/super-admin/settings.json")
      .then((res) => setFormData(res.data))
      .catch(() => alert("Failed to load settings"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Fake delay to simulate saving
    setTimeout(() => {
      setSaving(false);
      alert("Settings updated successfully!");
    }, 1000);
  };

  if (!formData) {
    return <p className="p-6 text-gray-500">Loading settings...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">System Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* System Information */}
        <div className="bg-white rounded shadow p-4 space-y-4">
          <h3 className="text-lg font-semibold">System Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded shadow p-4 space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Currency</label>
              <select
                name="defaultCurrency"
                value={formData.defaultCurrency}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-4 py-2"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-4 py-2"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-4 py-2"
              >
                <option value="Africa/Accra">Africa/Accra</option>
                <option value="America/New_York">New York</option>
                <option value="Europe/London">London</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded shadow p-4 space-y-4">
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="autoBackup"
                checked={formData.autoBackup}
                onChange={handleChange}
              />
              <label className="text-sm">Enable Auto Backup</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleChange}
              />
              <label className="text-sm">Enable Two-Factor Authentication</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="notifyOnBooking"
                checked={formData.notifyOnBooking}
                onChange={handleChange}
              />
              <label className="text-sm">Email Notification on Booking</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
