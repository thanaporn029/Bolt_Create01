import React, { useState } from 'react';
import { Languages, ExternalLink, Edit2, Check, X, Mic } from 'lucide-react';

interface Message {
  id: number;
  character: string;
  content: string;
  avatar: string;
  isEditing: boolean;
}

export function Editor() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, character: 'MiCael', content: 'ฉันมองไปได้รอบนิดหน่อยๆ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false },
    { id: 2, character: 'MiCael', content: 'เขียนนิยายของคุณ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false },
    { id: 3, character: 'MiCael', content: 'เขียนนิยายของคุณ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [wordCount] = useState(0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        character: 'MiCael',
        content: newMessage,
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop',
        isEditing: false
      }]);
      setNewMessage('');
    }
  };

  const startEditing = (message: Message) => {
    const updatedMessages = messages.map(msg => ({
      ...msg,
      isEditing: msg.id === message.id
    }));
    setMessages(updatedMessages);
    setEditingContent(message.content);
  };

  const saveEdit = (messageId: number) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId
        ? { ...msg, content: editingContent, isEditing: false }
        : msg
    );
    setMessages(updatedMessages);
  };

  const cancelEdit = (messageId: number) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isEditing: false } : msg
    );
    setMessages(updatedMessages);
    setEditingContent('');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-900 text-xl">Chapter 1 : The Beginning</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{wordCount} words</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Languages className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Export
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3 group">
            <img src={message.avatar} alt={message.character} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-gray-900 font-medium">{message.character}</span>
                <div className="flex items-center space-x-1">
                  <button className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">L</button>
                  <button className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs">R</button>
                </div>
                {!message.isEditing && (
                  <button 
                    onClick={() => startEditing(message)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {message.isEditing ? (
                <div className="flex flex-col space-y-2">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="bg-white text-gray-900 p-3 rounded-lg max-w-3xl w-full min-h-[100px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveEdit(message.id)}
                      className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 flex items-center space-x-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>บันทึก</span>
                    </button>
                    <button
                      onClick={() => cancelEdit(message.id)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>ยกเลิก</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white text-gray-900 p-3 rounded-lg max-w-3xl border border-gray-200">
                  {message.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="เขียนนิยายของคุณ..."
              className="w-full bg-gray-50 text-gray-900 rounded-lg p-3 min-h-[100px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}