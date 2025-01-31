import React, { useState } from 'react';
import { Plus, Star, Edit2 } from 'lucide-react';
import { CharacterEditModal } from './CharacterEditModal';

export function CharacterCreation() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleEditCharacter = (character: any) => {
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