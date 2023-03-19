import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error & { data?: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.data || JSON.stringify(error)}</i>
      </p>
      <button onClick={() => (window.location.href = "/")}>
        Click here to reload the app
      </button>
    </div>
  );
}
