import React, { useState } from 'react';
import { ImageIcon, Plus } from 'lucide-react';

interface ProjectInfoProps {
  onClose: () => void;
}

export function ProjectInfo({ onClose }: ProjectInfoProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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