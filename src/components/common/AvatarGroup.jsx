import React from 'react';

/**
 * Neo-Brutalist Stacked Avatar Group Component
 * Avatar bertumpuk dengan border hitam tebal dan offset shadow
 */
export default function AvatarGroup({ avatars = [], size = 'w-10 h-10', limit = 5 }) {
  const displayed = avatars.slice(0, limit);

  return (
    <div className="flex items-center -space-x-3 select-none">
      {displayed.map((avatar, idx) => (
        <div
          key={idx}
          title={avatar.name || `Avatar ${idx + 1}`}
          className={`${size} rounded-full border-3 border-black ${avatar.bg || 'bg-neo-yellow'} shadow-[2px_2px_0px_0px_#000000] flex items-center justify-center font-black text-xs text-black transition-transform duration-150 hover:-translate-y-1 hover:z-20 cursor-pointer`}
          style={{ zIndex: 10 - idx }}
        >
          {avatar.image ? (
            <img
              src={avatar.image}
              alt={avatar.name || 'Peer'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{avatar.text || avatar.name?.slice(0, 2).toUpperCase() || 'SOC'}</span>
          )}
        </div>
      ))}
    </div>
  );
}
