import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import Button from '../ui/components/Button';

export default function Profile() {
  const { profile, loading, saveProfile } = useProfile();
  const [activeTab, setActiveTab] = useState('academic');
  const [formData, setFormData] = useState({
    bio: '',
    academic: { institution: '', degree: '', graduationYear: '' },
    skills: [],
    interests: [],
    goals: [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        academic: {
          institution: profile.academic?.institution || '',
          degree: profile.academic?.degree || '',
          graduationYear: profile.academic?.graduationYear || '',
        },
        skills: profile.skills || [],
        interests: profile.interests || [],
        goals: profile.goals || [],
      });
    }
  }, [profile]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    const result = await saveProfile(formData);
    setSaveStatus(result.success ? 'Saved successfully!' : 'Failed to save');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading profile...</div>;
  }

  const completion = profile?.profileCompletion || 0;

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header & Completion Meter */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{profile?.email}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Profile Completion
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{completion}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-2.5 rounded-full bg-blue-600"
          />
        </div>
      </div>

      {/* Modular Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 dark:border-slate-800">
        {['academic', 'skills', 'bio'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
              activeTab === tab
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Forms */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {activeTab === 'academic' && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Institution / University
              </label>
              <input
                type="text"
                value={formData.academic.institution}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    academic: { ...formData.academic, institution: e.target.value },
                  })
                }
                placeholder="e.g. MNNIT Allahabad"
                className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Degree & Branch</label>
              <input
                type="text"
                value={formData.academic.degree}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    academic: { ...formData.academic, degree: e.target.value },
                  })
                }
                placeholder="e.g. Master of Computer Applications"
                className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. C++, React, MongoDB)"
                className="flex-1 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-xs hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bio' && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">About You</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell others what you are building or learning..."
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button type="submit">Save Profile</Button>
          {saveStatus && <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{saveStatus}</span>}
        </div>
      </form>
    </div>
  );
}