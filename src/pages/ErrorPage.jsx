import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Get error details
  console.error(error); // Log the error

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
