export type PopupVariant = 'info' | 'success' | 'warning' | 'error' | 'default';
export type PopupSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface PopupConfig {
  title?: string;
  message?: string;
  variant?: PopupVariant;
  size?: PopupSize;
  closable?: boolean;
  closeOnBackdropClick?: boolean;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  data?: unknown;
}

export interface PopupRef<R = unknown> {
  close: (result?: R) => void;
  afterClosed: Promise<R | undefined>;
}
