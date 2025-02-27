// import React, { createContext, useContext, useState } from "react";
// import { NotificationProps, ToastPosition } from "../types/toast-types";
// import useToast from "../hooks/use-toast";

// type ContextProps = {
//   children: React.ReactElement;
//   position: ToastPosition;
// };

// const initialState = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   triggerToast: (notificationProps: NotificationProps) => {},
// };
// const ToastContext = createContext(initialState);
// export const ToastConsumer = () => useContext(ToastContext);

// const ToastContextProvider = ({ children, position }: ContextProps) => {
//   const [toastPosition, setToastPosition] = useState<ToastPosition>(position);

//   const { triggerToast, ShowToast } = useToast();

//   const value = {
//     triggerToast: (notificationProps: NotificationProps) => {
//       triggerToast(notificationProps.position || ToastPosition.topright, notificationProps);
//     },
//   };
  
//   return (
//     <ToastContext.Provider value={value}>
//       {children}
//       {ShowToast}
//     </ToastContext.Provider>
//   );
// };

// export default ToastContextProvider;


import React, { createContext, useContext } from "react";
import { NotificationProps } from "../types/toast-types";
import useToast from "../hooks/use-toast";

type ContextProps = {
  children: React.ReactNode;
};

type ToastContextType = {
  triggerToast: (notificationProps: NotificationProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastContextProvider");
  }
  return context;
};

const ToastContextProvider = ({ children }: ContextProps) => {
  const { triggerToast, ShowToast } = useToast(); // Use the hook

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      {ShowToast}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;

