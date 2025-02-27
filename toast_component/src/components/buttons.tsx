import { useToastContext } from "../context/toast-context";
import {
  NotificationProps,
  ToastPosition,
  ToastTypes,
} from "../types/toast-types";

const Buttons = () => {
  const { triggerToast } = useToastContext();



  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    position: ToastPosition,
    type: ToastTypes
  ) => {
    const notificationProp: NotificationProps = {
      message: `This is a Testing Message From ${type}`,
      delay: 120000,
      type: type,
      position: position,
      onClose: () => console.log("Closed"),
    };
    triggerToast(notificationProp);
  };

  return (
    <div className="buttons-container">
      <button
        type="button"
        className="button top-left"
        onClick={(e) =>
          handleClick(e, ToastPosition.topleft, ToastTypes.info)
        }
      >
        Top-Left
      </button>
      <button
        type="button"
        className="button  top-right"
        onClick={(e) =>
          handleClick(e, ToastPosition.topright, ToastTypes.success)
        }
      >
        Top-Right
      </button>
      <button
        type="button"
        className="button  bottom-left"
        onClick={(e) =>
          handleClick(e, ToastPosition.bottomleft, ToastTypes.warning)
        }
      >
        Bottom-Left
      </button>
      <button
        type="button"
        className="button  bottom-right"
        onClick={(e) =>
          handleClick(e, ToastPosition.bottomright, ToastTypes.danger)
        }
      >
        Bottom-Right
      </button>
    </div>
  );
};

export default Buttons;
