import ReactDOM from 'react-dom';
import {type MouseEvent, useEffect} from "react";
import css from './MovieModal.module.css'
import type {Movie} from "../../types/movie.ts";
import {BASE_IMAGE_PATH, SIZE} from "../../constants";

export interface MovieModalProps {
    movie: Movie|null;
    onClose: () => void;
}

const modalRoot = document.getElementById('modal-root')!;
const MovieModal = ({movie,onClose}: MovieModalProps) => {

    useEffect(() => {
        const handleKeyDown = (event:KeyboardEvent) => {
            if (event.code === 'Escape') {
                onClose()
            }
        }
        document.addEventListener('keydown',handleKeyDown);

        return () => {
            document.removeEventListener('keydown',handleKeyDown)
        }
    }, [onClose]);

    return ReactDOM.createPortal(
        <div
            onClick={() => {
                onClose()
            }}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.modal}
            onClick={(event:MouseEvent) => {
                event.stopPropagation()
            }}
            >
                <button
                    onClick={onClose}
                    className={css.closeButton}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <img
                    src={`${BASE_IMAGE_PATH}${SIZE.original}${movie?.poster_path}`}
                    alt="movie_title"
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{movie?.title}</h2>
                    <p>{movie?.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie?.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie?.vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default MovieModal;