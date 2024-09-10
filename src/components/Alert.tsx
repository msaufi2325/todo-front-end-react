import { useEffect, useState } from "react";
import { X } from "lucide-react"
import { alertClass } from "../types/todo";

interface AlertMessageProps {
  title: string;
  message: string;
  alertClass: alertClass;
}

const getClassName = (alertClass: string) => {
  if (alertClass === "alert-danger") {
    return "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
  } else if (alertClass === "alert-success") {
    return "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative";
  } else if (alertClass === "alert-info") {
    return "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative";
  }
};

export default function AlertMessage({
  title,
  message,
  alertClass,
}: AlertMessageProps) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alertClass !== "none") {
      setShowAlert(true);
    }
  }, [alertClass]);

  const handleCancel = () => {
    setShowAlert(false);
  }

  return (
    <>
      {showAlert && (
        <div className={getClassName(alertClass)} role="alert">
          <strong className="font-bold">{title}</strong>
          <span className="px-1 pr-2 block sm:inline">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" style={{ cursor: "pointer" }}>
            <X onClick={handleCancel} />
          </span>
        </div>
      )}
    </>
  );
}
