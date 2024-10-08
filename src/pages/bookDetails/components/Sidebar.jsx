import React, { useState } from 'react';
import { Book, FolderPlus, FilePlus, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('library');

  const navItems = [
    { id: 'library', label: 'My Library', icon: Book },
    { id: 'collection', label: 'Add Collection', icon: FolderPlus },
    { id: 'items', label: 'Add Items', icon: FilePlus },
  ];

  return (
    <nav className="bg-gradient-to-b from-orange-500 to-orange-600 h-screen w-16 hover:w-64 fixed left-0 top-0 flex flex-col items-start shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="w-full flex items-center px-4 py-6">
        <BookOpen className="w-8 h-8 text-white" />
        <span className="text-white font-bold text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">ShelfLife</span>
      </div>

      <div className="w-full mt-6">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`w-full py-3 px-4 flex items-center text-gray-200 hover:bg-orange-300 transition-all duration-200 ${
              activeItem === item.id ? 'bg-orange-400 border-r-4 border-white' : ''
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon size={20} className="transition-all duration-300 min-w-[20px]" />
            <span className="ml-4 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-auto w-full px-4 pb-6">
        <div className="bg-orange-400 rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Need Help?</h3>
          <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Check our FAQ or contact support for assistance.</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;