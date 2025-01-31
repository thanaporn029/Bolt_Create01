import React, { useState } from 'react';
import { Home, BookOpen, Plus, Mic, Settings, ExternalLink, Save, Languages, Edit2, Check, X, Sparkles, Image as ImageIcon, Star, Upload, Volume2 } from 'lucide-react';

function CharacterEditModal({ onClose, character = null }) {
  const [name, setName] = useState(character?.name || '');
  const [description, setDescription] = useState(character?.description || '');
  const [avatar, setAvatar] = useState(character?.avatar || '');
  const [isFavorite, setIsFavorite] = useState(character?.isFavorite || false);
  const [selectedVoice, setSelectedVoice] = useState(character?.voice || null);

  const voices = [
    { id: 1, name: 'เสียงที่ 1', preview: 'https://example.com/voice1.mp3' },
    { id: 2, name: 'เสียงที่ 2', preview: 'https://example.com/voice2.mp3' },
    { id: 3, name: 'เสียงที่ 3', preview: 'https://example.com/voice3.mp3' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black border border-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">สร้างเสียงตัวละคร</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Character" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-4xl">ชื่อ</div>
                )}
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-0 left-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center -translate-x-2 -translate-y-2"
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
              </button>
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                <Upload className="w-4 h-4 text-white" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">ชื่อตัวละคร</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 text-white rounded-md p-2 border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="ระบุชื่อตัวละคร"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">บทบาทตัวละคร</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 text-white rounded-md p-2 border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="บทบาท"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">เลือกเสียงตัวละคร</label>
            <div className="grid grid-cols-2 gap-3">
              {voices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                    selectedVoice === voice.id
                      ? 'border-blue-500 bg-blue-500 bg-opacity-10 text-blue-500'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{voice.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">คำอธิบายเพิ่มเติม</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 text-white rounded-md p-2 border border-gray-700 focus:outline-none focus:border-blue-500 min-h-[100px]"
              placeholder="NO NAME"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              ยกเลิก
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CharacterCreation() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleEditCharacter = (character) => {
    setSelectedCharacter(character);
    setShowEditModal(true);
  };

  const handleAddCharacter = () => {
    setSelectedCharacter(null);
    setShowEditModal(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="bg-black border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl">ตัวละครทั้งหมด</h1>
          <button className="bg-black text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-900">
            เพิ่มเสียงตัวละคร
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-black border border-gray-800 rounded-lg p-4 relative">
              <div className="absolute top-2 right-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-4xl">ชื่อ</div>
              </div>
              <div className="text-center">
                <p className="text-gray-300 mb-2">สถานะ</p>
                <button 
                  onClick={() => handleEditCharacter({ id: i, name: 'Character ' + i })}
                  className="flex justify-center w-full"
                >
                  <Edit2 className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={handleAddCharacter}
            className="bg-black border border-gray-800 rounded-lg p-4 hover:bg-gray-900 flex flex-col items-center justify-center min-h-[240px]"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full mb-4 flex items-center justify-center">
              <Plus className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-400">เพิ่มตัวละคร</p>
          </button>
        </div>
      </div>

      {showEditModal && (
        <CharacterEditModal
          character={selectedCharacter}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

function ProjectInfo({ onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">นิยาย</h1>
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            SAVE
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Cover Image */}
          <div className="col-span-1">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Book cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
              <ImageIcon className="w-5 h-5 mr-2" />
              <span>อัพโหลดรูปภาพ</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-gray-500 text-sm mt-2 text-center">
              รองรับไฟล์ JPG, PNG และ GIF ขนาดไม่เกิน 2MB
            </p>
          </div>

          {/* Form Fields */}
          <div className="col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อเรื่อง
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ใส่ชื่อเรื่องของคุณ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                คำอธิบาย
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="คำอธิบายนิยาย"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่นิยาย
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="romance">โรแมนติก</option>
                <option value="fantasy">แฟนตาซี</option>
                <option value="action">แอคชั่น</option>
                <option value="horror">สยองขวัญ</option>
                <option value="comedy">ตลก</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ตัวละครทั้งหมด
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop"
                        alt={`Character ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-600 text-sm">ตัวละครที่ {i}</p>
                  </div>
                ))}
                <button className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <Plus className="w-6 h-6 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { id: 1, character: 'MiCael', content: 'ฉันมองไปได้รอบนิดหน่อยๆ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false },
    { id: 2, character: 'MiCael', content: 'เขียนนิยายของคุณ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false },
    { id: 3, character: 'MiCael', content: 'เขียนนิยายของคุณ', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop', isEditing: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [editingContent, setEditingContent] = useState('');
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

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

  const startEditing = (message) => {
    const updatedMessages = messages.map(msg => ({
      ...msg,
      isEditing: msg.id === message.id
    }));
    setMessages(updatedMessages);
    setEditingContent(message.content);
  };

  const saveEdit = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId
        ? { ...msg, content: editingContent, isEditing: false }
        : msg
    );
    setMessages(updatedMessages);
  };

  const cancelEdit = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isEditing: false } : msg
    );
    setMessages(updatedMessages);
    setEditingContent('');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span className="text-white text-xl font-semibold">WriteWhisper</span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg">
              <Home className="w-5 h-5 mr-3" />
              <span>หน้าหลัก</span>
            </a>
            <button 
              onClick={() => {
                setShowProjectInfo(true);
                setShowCharacterCreation(false);
              }}
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg w-full"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              <span>ข้อมูลProjects</span>
            </button>
            <button 
              onClick={() => {
                setShowCharacterCreation(true);
                setShowProjectInfo(false);
              }}
              className="flex items-center px-4 py-2 text-emerald-500 hover:bg-gray-800 rounded-lg w-full"
            >
              <Mic className="w-5 h-5 mr-3" />
              <span>สร้างเสียงตัวละคร</span>
            </button>
            <button className="flex items-center px-4 py-2 text-emerald-500 hover:bg-gray-800 rounded-lg w-full">
              <Sparkles className="w-5 h-5 mr-3" />
              <span>AI สร้างนิยาย</span>
            </button>

            <div className="py-4">
              <div className="px-4 text-sm font-medium text-gray-400 mb-2">ตอนนิยายทั้งหมด</div>
              <button className="flex items-center px-4 py-2 text-white bg-gray-800 rounded-lg w-full mb-2">
                <span>ตอนที่ 1 ยังไม่มีชื่อ</span>
              </button>
              <button className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg w-full mb-2">
                <span>ตอนที่ 2 ยังไม่มีชื่อ</span>
              </button>
              <button className="flex items-center px-4 py-2 text-emerald-500 hover:bg-gray-800 rounded-lg w-full">
                <Plus className="w-4 h-4 mr-2" />
                <span>เพิ่มตอนใหม่</span>
              </button>
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 bg-black border-t border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
              <div>
                <div className="text-gray-300 text-sm">นามปากกา : marisa</div>
                <div className="text-gray-400 text-xs">Point : 2000 pt</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-300">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {showProjectInfo ? (
        <ProjectInfo onClose={() => setShowProjectInfo(false)} />
      ) : showCharacterCreation ? (
        <CharacterCreation />
      ) : (
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
      )}
    </div>
  );
}

export default App;