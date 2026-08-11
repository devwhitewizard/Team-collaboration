'use client';

import React, { useState, useEffect } from 'react';
import { DocumentCard } from '@/components/ChallengeCard';
import { Document, DocumentCategory } from '@nexus/types';
import { fetchDocuments } from '@/lib/api';
import { FolderDown, Upload, Filter } from 'lucide-react';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  const filtered = selectedCategory === 'ALL'
    ? documents
    : documents.filter((d) => d.category === selectedCategory);

  const categories: (DocumentCategory | 'ALL')[] = [
    'ALL',
    'PDF',
    'Project Doc',
    'Report',
    'Policy',
    'Meeting Notes',
    'Contract',
    'Tutorial',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderDown className="w-6 h-6 text-indigo-400" />
            Document & Contract Repository
          </h1>
          <p className="text-xs text-slate-400">Centralized storage for policies, retrospectives, PDFs, and meeting notes.</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2 self-start">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <Filter className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat === 'ALL' ? 'All Documents' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
