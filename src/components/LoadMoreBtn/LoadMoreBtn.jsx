import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.btnDiv}>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
