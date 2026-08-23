import { useState } from 'react';
import { Copy, Check, Eye, Mouse, MousePointer, Footprints, Compass } from 'lucide-react';
import type { HeaderUIProps } from '../types/model.types';

export function HeaderUI({
  cameraCoords,
  controlMode,
  navigationMode,
  onToggleControlMode,
  onToggleNavigationMode,
}: HeaderUIProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const formattedPos = `[${cameraCoords.position.join(', ')}]`;
  const formattedTarget = `[${cameraCoords.target.join(', ')}]`;
  const fullText = `Position: ${formattedPos} | Target: ${formattedTarget}`;

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isTour = navigationMode === 'tour';
  const isOrbitMode = controlMode === 'orbit';
  const leftActionText = isOrbitMode ? 'Orbit / Rotate' : 'Pan / Slide';
  const rightActionText = isOrbitMode ? 'Pan / Slide' : 'Orbit / Rotate';

  return (
    <header className="ui-overlay">
      <div
        className="glass-card interactive"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1150px',
          margin: '0 auto',
          width: '100%',
          gap: '0.8rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Eye size={20} color="var(--primary)" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Camera: <span style={{ color: '#00f2fe' }}>{formattedPos}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Target: <span style={{ color: '#a78bfa' }}>{formattedTarget}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
          }}
        >
          {isTour ? (
            <>
              <Footprints size={14} color="#00f2fe" />
              <span>
                <b>Scroll Walkthrough Mode:</b> Scroll or click step dots below
              </span>
            </>
          ) : (
            <>
              <Mouse size={14} color="#00f2fe" />
              <span>
                <b>LMB:</b> {leftActionText} | <b>RMB:</b> {rightActionText} | <b>Double-Click:</b> Pivot
              </span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={onToggleNavigationMode}
            title="Switch between Guided Scroll Tour and Free Roam"
            style={{
              background: isTour ? 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' : 'rgba(255, 255, 255, 0.08)',
              border: isTour ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
              color: isTour ? '#000' : 'var(--text-main)',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {isTour ? <Compass size={14} color="#000" /> : <Footprints size={14} color="#00f2fe" />}
            <span>{isTour ? 'Guided Tour' : 'Free Roam'}</span>
          </button>

          {!isTour && (
            <button
              onClick={onToggleControlMode}
              title="Toggle Left/Right mouse button behaviors"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--text-main)',
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <MousePointer size={14} color={isOrbitMode ? '#00f2fe' : '#a78bfa'} />
              <span>{isOrbitMode ? 'Orbit Mode' : 'Pan Mode'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'var(--text-main)',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{isCopied ? 'Copied!' : 'Copy Coords'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
