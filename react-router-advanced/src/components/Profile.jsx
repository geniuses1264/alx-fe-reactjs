import { Routes, Route, Link, useParams } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  // For dynamic routing example (user profile based on ID)
  const { userId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Profile Page {userId && `(User ID: ${userId})`}
      </h1>

      <nav className="flex gap-4 mb-6">
        <Link to="details" className="text-blue-500 hover:underline">
          Profile Details
        </Link>
        <Link to="settings" className="text-blue-500 hover:underline">
          Profile Settings
        </Link>
      </nav>

      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
