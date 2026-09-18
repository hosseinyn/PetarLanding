export interface PlaybackHandle {
  pause: () => void;
}

const handles = new Set<PlaybackHandle>();

export function registerPlayback(handle: PlaybackHandle): () => void {
  handles.add(handle);
  return () => {
    handles.delete(handle);
  };
}

export function notifyPlaying(active: PlaybackHandle): void {
  for (const h of handles) {
    if (h !== active) {
      try {
        h.pause();
      } catch {
        handles.delete(h);
      }
    }
  }
}
