import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDiscoverPeers } from '../api/user.api';

export default function Discover() {
  const [peers, setPeers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscoverPeers()
      .then((data) => setPeers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Discover Peers</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Connect with developers and collaborators based on skills and goals.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Loading peers...</div>
      ) : peers.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          No peers found yet. Complete your profile to get recommended!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {peers.map((peer, idx) => (
            <motion.div
              key={peer._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {peer.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{peer.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {peer.academic?.degree || 'Developer'}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                  {peer.bio || 'Looking to collaborate on projects and competitive programming.'}
                </p>

                {peer.skills?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {peer.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Connect
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}