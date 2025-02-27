export interface ToastProps {
    message: string;
    type: ToastTypes;
    onClose?: VoidFunction;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    position: ToastPosition;
}

export interface NotificationProps extends ToastProps {
    id?: number;
    delay: number;
}
export enum ToastTypes {
    "info" = "info",
    "success" = "success",
    "warning" = "warning",
    "danger" = "danger",
    "error" = "error",
}

export enum ToastPosition {
    "topleft" = "top-left",
    "topright" = "top-right",
    "bottomleft" = "bottom-left",
    "bottomright" = "bottom-right",
    "topcenter" = "top-center",
    "bottomcenter" = "bottom-center",
}

export type Position = {
    position: ToastPosition;
}
export type StyleProps = {
    [key: string]: string | number;
}

export type IconProps = {
    [key in ToastTypes]: React.ReactNode;
}