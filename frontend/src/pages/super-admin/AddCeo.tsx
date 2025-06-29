import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number too short"),
  hotelName: z.string().min(2, "Hotel name required"),
  location: z.string().min(2, "Location is required"),
  status: z.enum(["active", "inactive"]),
  dateCreated: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default function AddCEOPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    const payload = { ...data, dateCreated: new Date().toISOString() };
    setLoading(true);
    try {
      await axios.post("/api/ceos", payload);
      Swal.fire("Success", "CEO has been added successfully.", "success");
      reset();
      navigate("/superadmin/manage-ceos");
    } catch (error) {
      Swal.fire("Error", "There was an issue adding the CEO.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-md shadow-md mt-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/superadmin/manage-ceos")}>CEOs</span>
        <span className="mx-2">/</span>
        <span>Add CEO</span>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Add New CEO</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <div>
          <label className="block mb-1">Full Name</label>
          <input type="text" {...register("name")} className="w-full border px-4 py-2 rounded-md" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register("email")} className="w-full border px-4 py-2 rounded-md" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input type="text" {...register("phone")} className="w-full border px-4 py-2 rounded-md" />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Assigned Hotel</label>
          <input type="text" {...register("hotelName")} className="w-full border px-4 py-2 rounded-md" />
          {errors.hotelName && <p className="text-red-600 text-sm">{errors.hotelName.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Hotel Location</label>
          <input type="text" {...register("location")} className="w-full border px-4 py-2 rounded-md" />
          {errors.location && <p className="text-red-600 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select {...register("status")} className="w-full border px-4 py-2 rounded-md">
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" {...register("password")} className="w-full border px-4 py-2 rounded-md" />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input type="password" {...register("confirmPassword")} className="w-full border px-4 py-2 rounded-md" />
          {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
        </div>
       </div>

       <div className="flex items-center justify-end">
       <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-sm hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add CEO"}
        </button>
       </div>
      </form>
    </div>
  );
}