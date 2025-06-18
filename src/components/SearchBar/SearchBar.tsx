import styles from './SearchBar.module.css'
export interface SearchBarProps {
onSubmit: (formData:FormData) => void
}

const SearchBar = ({onSubmit}: SearchBarProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                   Filmix
                </a>
                <form className={styles.form} action={onSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>

    );
};

export default SearchBar;