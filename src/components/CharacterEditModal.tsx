import React, { useState } from 'react';
import { Star, Upload, Volume2, X } from 'lucide-react';

interface CharacterEditModalProps {
  onClose: () => void;
  character?: {
    id: number;
    name: string;
    description: string;
    avatar: string;
    isFavorite: boolean;
    voice: number | null;
  } | null;
}

export function CharacterEditModal({ onClose, character = null }: CharacterEditModalProps) {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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