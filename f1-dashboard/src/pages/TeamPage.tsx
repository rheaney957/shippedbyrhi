import { useParams, Link } from 'react-router-dom';

function TeamPage() {
  const { teamName } = useParams<{ teamName: string }>();

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold">Team Page</h1>
      <p className="mt-2 text-gray-600">
        {teamName} - Team information, driver lineup, and performance data will be displayed here
      </p>
    </div>
  );
}

export default TeamPage;
