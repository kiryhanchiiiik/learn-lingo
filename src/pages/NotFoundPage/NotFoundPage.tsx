import css from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <p className={css.notFoundTitle}>404</p>
      <p className={css.notFoundMessage}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        className={css.notFoundButton}
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
