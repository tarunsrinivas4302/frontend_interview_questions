// import { useCallback, useState } from "react";
// import { NotificationProps, StyleProps } from "../types/toast-types";
// import ToastComponent from "../components/toast-component";

// const useToast = () => {
//   const [notification, setNotification] = useState<NotificationProps[]>([]);
//   const centertop = {
//     position: "fixed",
//     top: "20px",
//     left: "50%",
//     transform: "translateX(-50%)", // Ensures the element is perfectly centered horizontally
//     width: "100%", // Takes up 100% of the viewport width initially
//     maxWidth: "max-content", // Sets a reasonable max width for responsiveness (adjust as needed)
//     padding: "0 16px", // Adds padding for smaller screens to avoid content touching edges
//     boxSizing: "border-box", // Ensures padding is included in the total width
//     transition: "transform 0.3s ease",
//   };

//   const styles: Record<string, StyleProps> = {
//     "top-right": {
//       position: "fixed",
//       top: "20px",
//       right: "20px",
//     },
//     "top-left": {
//       position: "fixed",
//       top: "20px",
//       left: "20px",
//     },
//     "bottom-right": {
//       position: "fixed",
//       bottom: "20px",
//       right: "20px",
//     },
//     "bottom-left": {
//       position: "fixed",
//       bottom: "20px",
//       left: "20px",
//     },
//     "top-center": centertop,
//     "center-top": centertop,
//   };
//   const triggerToast = useCallback((notificationProps: NotificationProps) => {
//     const id = Date.now();
//     const newNotification = { ...notificationProps, id };

//     setNotification((prev) => [...prev, newNotification]);

//     setTimeout(() => {
//       setNotification((prev) => prev.filter((not) => not.id !== id));
//     }, notificationProps.delay || 3000);
//   }, []);

//   const ShowToast = notification.length > 0 && (
//     <>
//       {notification.map((notification: NotificationProps) => {
//         return (
//           <div
//             key={notification.id}
//             style={styles[notification.position] || {}}
//           >
//             <ToastComponent
//               position={notification.position}
//               message={notification.message}
//               icon={notification.icon}
//               onClose={notification?.onClose}
//               className={notification.className}
//               style={notification.style}
//               type={notification.type}
//             />
//           </div>
//         );
//       })}
//     </>
//   );
//   return {
//     triggerToast,
//     ShowToast,
//   };
// };

// export default useToast;


import { useCallback, useState } from "react";
import { NotificationProps, StyleProps, ToastPosition } from "../types/toast-types";
import ToastComponent from "../components/toast-component";

const useToast = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const centertop = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: "max-content",
    padding: "0 16px",
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
  };

  const styles: Record<ToastPosition, StyleProps> = {
    "top-right": { position: "fixed", top: "20px", right: "20px" },
    "top-left": { position: "fixed", top: "20px", left: "20px" },
    "bottom-right": { position: "fixed", bottom: "20px", right: "20px" },
    "bottom-left": { position: "fixed", bottom: "20px", left: "20px" },
    "top-center": centertop,
    "bottom-center" : { position: "fixed", bottom: "20px", left : "0px" , right : "0px"  , margin : "auto"},
  };

  const triggerToast = useCallback((notificationProps: NotificationProps) => {
    const id = Date.now();
    const newNotification = { ...notificationProps, id };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((not) => not.id !== id));
    }, notificationProps.delay || 3000);
  }, []);

  const ShowToast = notifications.length > 0 && (
    <>
      {notifications.map((notification) => (
        <div key={notification.id} style={styles[notification.position] || {}}>
          <ToastComponent {...notification} />
        </div>
      ))}
    </>
  );

  return {
    triggerToast,
    ShowToast,
  };
};

export default useToast;
