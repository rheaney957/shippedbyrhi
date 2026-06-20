import { Layout } from '../components/layout';
import { SessionSelector, ModeIndicator } from '../components/sessions';
import { useSessionStore } from '../stores/sessionStore';

function Dashboard() {
  const { selectedSession, isLiveMode } = useSessionStore();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            OpenF1 Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Real-time and historical Formula 1 data visualization
            {selectedSession && (
              <span className="ml-2 font-medium">
                • {selectedSession.name} at {selectedSession.circuit.name}
                {isLiveMode && (
                  <span className="ml-2 text-red-600 dark:text-red-400">
                    (LIVE)
                  </span>
                )}
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session Selector */}
          <div className="lg:col-span-1">
            <SessionSelector />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Mode Indicator */}
            <ModeIndicator />

            {selectedSession ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Session Details
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Session
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSession.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Circuit
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {selectedSession.circuit.name}
                    </p>
                    <p className="text-sm">{selectedSession.circuit.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Type
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                      {selectedSession.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Status
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {isLiveMode ? (
                        <span className="text-red-600 dark:text-red-400">Live Mode</span>
                      ) : (
                        <span>Historical Mode</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Timing data, track map, and other features will be displayed here in future updates.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Welcome to OpenF1 Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a session from the list to view detailed data.
                  This dashboard provides real-time and historical Formula 1 data visualization.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="text-f1-red">•</span>
                    Live timing and race data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-f1-red">•</span>
                    Driver profiles and statistics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-f1-red">•</span>
                    Animated track maps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-f1-red">•</span>
                    Team radio messages
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
