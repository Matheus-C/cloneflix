import "./css/VideoModal.css";

export default function VideoModal({ isOpen, onClose, embedUrl, title }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal__overlay" onClick={onClose}>
      <div
        className="video-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="video-modal__close" onClick={onClose}>
          ✕
        </button>
        <h2 className="video-modal__title">{title}</h2>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="video-modal__iframe"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            title={title}
          />
        ) : (
          <p style={{ padding: 24, color: "#ccc" }}>
            Vídeo indisponível para este título.
          </p>
        )}
      </div>
    </div>
  );
}
