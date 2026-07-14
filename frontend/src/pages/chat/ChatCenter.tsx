import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getChatRooms, createChatRoom, getRoomMessages, postRoomMessage } from '../../services/chat';

export default function ChatCenter() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Room Creation field
  const [newRoomName, setNewRoomName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Message field
  const [typedMessage, setTypedMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load Rooms list on mount
  useEffect(() => {
    getChatRooms()
      .then((data) => {
        setRooms(data);
        if (data.length > 0) {
          setActiveRoom(data[0]);
        }
        setLoadingRooms(false);
      })
      .catch(() => {
        setLoadingRooms(false);
      });
  }, []);

  // Fetch and poll messages inside the active room
  useEffect(() => {
    if (!activeRoom) return;

    setLoadingMessages(true);
    // Initial fetch
    getRoomMessages(activeRoom.id)
      .then((data) => {
        setMessages(data);
        setLoadingMessages(false);
        scrollToBottom();
      })
      .catch(() => {
        setLoadingMessages(false);
      });

    // Real-time synchronization loop (polls every 2 seconds for perfect out-of-the-box local reliability)
    const intervalId = setInterval(() => {
      getRoomMessages(activeRoom.id)
        .then((data) => {
          setMessages(data);
        })
        .catch((err) => {
          console.error("Polling sync error", err);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [activeRoom]);

  // Scroll to latest message
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;

    try {
      const response = await createChatRoom(newRoomName);
      setRooms([...rooms, response].sort((a: any, b: any) => a.name.localeCompare(b.name)));
      setActiveRoom(response);
      setNewRoomName('');
      setShowCreateForm(false);
    } catch (err) {
      console.error("Failed to create room channel", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeRoom) return;

    const content = typedMessage;
    setTypedMessage('');
    setSending(true);

    try {
      const response = await postRoomMessage(activeRoom.id, content);
      setMessages((prev) => [...prev, response]);
      scrollToBottom();
    } catch (err) {
      console.error("Failed to post chat message", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Split chat screen */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-[calc(100vh-80px)]">
        
        {/* LEFT COLUMN: Channels sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col justify-between p-6" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}>
          <div className="space-y-6">
            
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  Chat Channels
                </h2>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {rooms.length} Active Channels
                </p>
              </div>
              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs hover:bg-violet-500/5 transition-all"
                style={{ borderColor: 'var(--border-soft)' }}
              >
                +
              </button>
            </div>

            {/* Form to add channels */}
            {showCreateForm && (
              <form onSubmit={handleCreateRoom} className="p-3 border rounded-xl space-y-2" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}>
                <input
                  type="text"
                  placeholder="e.g. general-talk"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-xs font-semibold focus:outline-none"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md"
                >
                  Create Channel
                </button>
              </form>
            )}

            {/* Channels listing */}
            {loadingRooms ? (
              <div className="flex justify-center py-6">
                <div className="w-6 h-6 rounded-full border-2 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
              </div>
            ) : (
              <div className="space-y-1 overflow-y-auto max-h-[400px] no-scrollbar">
                {rooms.map((room: any) => {
                  const isActive = activeRoom?.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setActiveRoom(room)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 font-semibold text-xs border ${isActive ? 'border-violet-500/10' : 'border-transparent'}`}
                      style={{ 
                        background: isActive ? 'var(--bg-surface)' : 'transparent',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      <span>💬</span>
                      <span className="line-clamp-1">{room.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* User badge */}
          <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: 'var(--border-soft)' }}>
            <span className="w-7 h-7 rounded-full bg-violet-500 text-white font-bold text-xs flex items-center justify-center uppercase">
              {user?.full_name?.charAt(0) || 'U'}
            </span>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold">{user?.full_name || 'Active User'}</h4>
              <p className="text-[9px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>{user?.role}</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Active Chat Messages list & input */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* Active room header */}
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
            <span className="text-lg">💬</span>
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold">{activeRoom?.name || 'Select a Channel'}</h3>
              <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                ● Live sync active
              </p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-4" style={{ background: 'var(--bg-base)' }}>
            {loadingMessages ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <span className="text-3xl">👋</span>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Welcome to the channel. Say hello!</p>
              </div>
            ) : (
              messages.map((msg: any) => {
                const isSelf = msg.sender_email === user?.email;
                return (
                  <div key={msg.id} className={`flex flex-col max-w-[70%] space-y-1 ${isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                      <span>{msg.sender_name || 'Member'}</span>
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div 
                      className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${isSelf ? 'rounded-tr-none text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md' : 'rounded-tl-none border'}`}
                      style={{ 
                        background: isSelf ? '' : 'var(--bg-card)', 
                        borderColor: isSelf ? 'transparent' : 'var(--border-soft)',
                        color: isSelf ? '#fff' : 'var(--text-primary)'
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input form */}
          <div className="p-6 border-t" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
            <form onSubmit={handleSendMessage} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                disabled={sending}
                className="flex-1 px-4 py-3 rounded-xl border text-xs font-semibold focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
              <button
                type="submit"
                disabled={sending || !typedMessage.trim()}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                Send ➔
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
