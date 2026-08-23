import type { Loader } from 'three';

export const KNOWN_MODEL_SIZE_BYTES = 17025092;

type ProgressCallback = (progress: number, isComplete: boolean) => void;

class ModelProgressStore {
  private listeners: Set<ProgressCallback> = new Set();
  private currentProgress: number = 0;
  private isComplete: boolean = false;

  public subscribe(callback: ProgressCallback): () => void {
    this.listeners.add(callback);
    callback(this.currentProgress, this.isComplete);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public updateBytes(loadedBytes: number, totalBytes: number): void {
    const total = totalBytes > 0 ? totalBytes : KNOWN_MODEL_SIZE_BYTES;
    const calculatedPct = Math.min(99, Math.max(0, Math.round((loadedBytes / total) * 100)));

    if (calculatedPct > this.currentProgress) {
      this.currentProgress = calculatedPct;
      this.notify();
    }
  }

  public setComplete(): void {
    this.currentProgress = 100;
    this.isComplete = true;
    this.notify();
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public getIsComplete(): boolean {
    return this.isComplete;
  }

  private notify(): void {
    this.listeners.forEach((callback) => {
      callback(this.currentProgress, this.isComplete);
    });
  }
}

export const modelProgressStore = new ModelProgressStore();

export const configureGLTFLoaderProgress = (loader: Loader): void => {
  const originalLoad = loader.load.bind(loader);

  loader.load = (
    url: string,
    onLoad: (data: unknown) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: unknown) => void
  ) => {
    const handleProgress = (event: ProgressEvent) => {
      if (event.lengthComputable && event.total > 0) {
        modelProgressStore.updateBytes(event.loaded, event.total);
      } else {
        modelProgressStore.updateBytes(event.loaded, KNOWN_MODEL_SIZE_BYTES);
      }

      if (onProgress) {
        onProgress(event);
      }
    };

    const handleLoad = (data: unknown) => {
      modelProgressStore.setComplete();
      if (onLoad) {
        onLoad(data);
      }
    };

    return originalLoad(url, handleLoad, handleProgress, onError);
  };
};
