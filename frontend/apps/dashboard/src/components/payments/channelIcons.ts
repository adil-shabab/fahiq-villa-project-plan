import { FileEdit, Landmark, QrCode, Smartphone, Undo2, XCircle, type LucideIcon } from "lucide-react";
import type { TxnChannelIcon } from "../../data/payments";

export const channelIcons: Record<TxnChannelIcon, LucideIcon> = {
  upi: Smartphone,
  qr: QrCode,
  bank: Landmark,
  cheque: FileEdit,
  refund: Undo2,
  failed: XCircle,
};
