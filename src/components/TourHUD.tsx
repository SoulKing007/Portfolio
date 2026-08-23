import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { CHAMBER_WAYPOINTS } from '../constants/walkthrough.constants';
import type { TourHUDProps } from '../types/model.types';

export function TourHUD({
  currentWaypointIndex,
  totalWaypoints,
  onSelectWaypoint,
}: TourHUDProps) {
  const activeWaypoint = CHAMBER_WAYPOINTS[currentWaypointIndex] || CHAMBER_WAYPOINTS[0];
  const isFirst = currentWaypointIndex === 0;
  const isLast = currentWaypointIndex === totalWaypoints - 1;

  const handlePrev = () => {
    if (!isFirst) onSelectWaypoint(currentWaypointIndex - 1);
  };

  const handleNext = () => {
    if (!isLast) onSelectWaypoint(currentWaypointIndex + 1);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: '90%',
        maxWidth: '560px',
        pointerEvents: 'auto',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '1.2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          backdropFilter: 'blur(16px)',
          background: 'rgba(15, 15, 25, 0.82)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={16} color="#00f2fe" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: '#00f2fe' }}>
              STEP {String(currentWaypointIndex + 1).padStart(2, '0')} / {String(totalWaypoints).padStart(2, '0')}
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Scroll wheel or click dots to navigate
          </div>
        </div>

        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
            {activeWaypoint.title}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#a78bfa', marginTop: '0.1rem' }}>
            {activeWaypoint.subtitle}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.4rem', lineHeight: 1.4 }}>
            {activeWaypoint.description}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
          <button
            onClick={handlePrev}
            disabled={isFirst}
            style={{
              background: isFirst ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: isFirst ? 'rgba(255, 255, 255, 0.3)' : '#fff',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {CHAMBER_WAYPOINTS.map((wp, index) => {
              const isActive = index === currentWaypointIndex;
              return (
                <button
                  key={wp.id}
                  onClick={() => onSelectWaypoint(index)}
                  title={wp.title}
                  style={{
                    width: isActive ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: isActive ? '#00f2fe' : 'rgba(255, 255, 255, 0.25)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={isLast}
            style={{
              background: isLast ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: isLast ? 'rgba(255, 255, 255, 0.3)' : '#fff',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              cursor: isLast ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
