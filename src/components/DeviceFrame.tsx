'use client';

import { useState } from 'react';

const DEVICES = {
  desktop: { label: 'Desktop', width: '100%', icon: '🖥️' },
  tablet: { label: 'Tablet', width: '768px', icon: '📱' },
  mobile: { label: 'Celular', width: '390px', icon: '📱' },
} as const;

type DeviceKey = keyof typeof DEVICES;

export function DeviceFrame({ src, title }: { src: string; title: string }) {
  const [device, setDevice] = useState<DeviceKey>('desktop');

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-1.5">
        {(Object.keys(DEVICES) as DeviceKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setDevice(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              device === key ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {DEVICES[key].icon} {DEVICES[key].label}
          </button>
        ))}
      </div>

      <div className="flex justify-center overflow-auto rounded-2xl bg-slate-200 p-3 sm:p-6">
        <div
          className="overflow-hidden rounded-xl bg-white shadow-card transition-[width] duration-150"
          style={{ width: DEVICES[device].width, maxWidth: '100%' }}
        >
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">
              {title}
            </span>
          </div>
          <iframe src={src} title={title} className="h-[70vh] w-full border-0" />
        </div>
      </div>
    </div>
  );
}
