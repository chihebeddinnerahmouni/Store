import { handleAxiosError } from "../helper/axios_error";
import { FallbackProps } from "react-error-boundary";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    handleAxiosError(error);
  }, [error]);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      resetErrorBoundary();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, resetErrorBoundary]);

  return <div className="w-full h-screen"></div>;
};

export default ErrorFallback;
