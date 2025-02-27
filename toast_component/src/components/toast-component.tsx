import React, { useState } from "react";
import { IconProps, StyleProps, ToastProps } from "../types/toast-types";
import {
  Ban,
  CircleAlert,
  CircleCheck,
  CircleX,
  InfoIcon,
  OctagonAlert,
} from "lucide-react";

const ToastComponent = ({
  message,
  onClose,
  className,
  type,
}: ToastProps): React.ReactNode => {
  const [showToast, setShowToast] = useState<boolean>(true);
  const variants: Record<string, StyleProps> = {
    info: {
      backgroundColor: "#2196f3",
      color: "#fff",
    },
    success: {
      backgroundColor: "#4caf50",
      color: "#fff",
    },
    danger: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
    warning: {
      backgroundColor: "#ff9800",
      color: "#fff",
    },
  };
  const icons: IconProps = {
    info: <InfoIcon className="" />,
    success: <CircleCheck className="" />,
    error: <Ban className="" />,
    warning: <CircleAlert className="" />,
    danger: <OctagonAlert />,
  };

  const handleClose = () => {
    setShowToast(false);
    if (onClose) {
      onClose();
    }
  };
  if(!showToast) return '';
  return (
    <div className="toast-component">
      <div className={`toast ${className}`} style={variants[type]}>
        <span className="toast-icon">{icons[type]}</span>
        {message}
        <CircleX onClick={handleClose} className="close-icon" />
      </div>
    </div>
  );
};

export default ToastComponent;
