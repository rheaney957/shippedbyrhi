import { useParams, Link } from 'react-router-dom';

function DriverProfile() {
  const { driverNumber } = useParams<{ driverNumber: string }>();

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold">Driver Profile</h1>
      <p className="mt-2 text-gray-600">
        Driver #{driverNumber} - Biographical information, season statistics, and race results will be displayed here
      </p>
    </div>
  );
}

export default DriverProfile;
