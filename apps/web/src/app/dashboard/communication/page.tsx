'use client';

import React, { useState, useEffect } from 'react';
import { Channel, Message } from '@nexus/types';
import { fetchChannels, fetchMessages } from '@/lib/api';
import { MessageSquare, Hash, Megaphone, Send, Lock } from 'lucide-react';

export default function CommunicationPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    fetchChannels().then((chList) => {
      setChannels(chList);
      if (chList.length > 0) {
        setSelectedChannel(chList[0]);
        fetchMessages(chList[0].id).then(setMessages);
      }
    });
  }, []);

  const handleSelectChannel = (ch: Channel) => {
    setSelectedChannel(ch);
    fetchMessages(ch.id).then(setMessages);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !selectedChannel) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      channelId: selectedChannel.id,
      sender: {
        id: 'u-1',
        fullName: 'Alex Rivera',
        email: 'alex@nexustech.io',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        createdAt: '2026-01-01',
      },
      content: inputMsg,
      timestamp: 'Just now',
    };
    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] glass-panel rounded-3xl border border-slate-800 flex overflow-hidden max-w-7xl mx-auto">
      {/* Left Channels Sidebar */}
      <div className="w-64 border-r border-slate-800 bg-slate-950/60 p-4 space-y-6 flex-shrink-0 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="font-extrabold text-white text-sm tracking-wide uppercase px-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Workspace Channels
          </h3>

          <div className="space-y-1">
            {channels.map((ch) => {
              const isSelected = selectedChannel?.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChannel(ch)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {ch.type === 'announcement' ? (
                      <Megaphone className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Hash className="w-4 h-4 text-slate-500" />
                    )}
                    <span>{ch.name}</span>
                  </div>
                  {ch.unreadCount && ch.unreadCount > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[10px] font-mono">
                      {ch.unreadCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>Encrypted NestJS REST Communication Layer</span>
        </div>
      </div>

      {/* Right Active Chat Feed */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900/30">
        {/* Active Channel Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Hash className="w-4 h-4 text-indigo-400" />
              {selectedChannel?.name}
            </h3>
            <p className="text-xs text-slate-400">{selectedChannel?.description}</p>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              <img src={m.sender.avatarUrl} alt={m.sender.fullName} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-white text-xs">{m.sender.fullName}</span>
                  <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                </div>
                <div className="mt-1 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 inline-block max-w-xl">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-3">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder={`Message #${selectedChannel?.name || 'channel'}...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
