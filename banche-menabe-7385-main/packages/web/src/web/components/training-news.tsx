import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Images, X } from "lucide-react";

const photos = [
  "Participants et équipe d’animation réunis dans la salle de formation",
  "Un intervenant de la Croix-Rouge devant les participants",
  "Présentation projetée et échanges avec les participants",
  "Vue de la séance depuis la table de présentation",
  "Un intervenant présentant la séance devant un tableau papier",
  "Échanges entre une intervenante et les participants",
  "Présentation dans la salle avec des supports projetés et un tableau papier",
];
const photoPath = (index: number) => `/images/formation-2026/photo-${index + 1}.jpg`;

export function TrainingNews() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const open = (index: number, button: HTMLButtonElement) => {
    opener.current = button;
    setSelected(index);
  };
  const close = () => setSelected(null);
  const move = (step: number) =>
    setSelected((current) =>
      current === null ? null : (current + step + photos.length) % photos.length,
    );
  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const galleryDialog = dialog.current;
    const openingButton = opener.current;
    galleryDialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      galleryDialog?.close();
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keyboard);
      openingButton?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <section className="container section training-news" id="actualites">
      <div className="section-heading">
        <div>
          <div className="eyebrow">ACTUALITÉS DE LA BRANCHE</div>
          <h2>
            Se préparer aujourd’hui.
            <br />
            Intervenir demain.
          </h2>
        </div>
        <span className="training-category">FORMATION · 2026</span>
      </div>
      <article className="training-feature">
        <button
          className="training-cover"
          onClick={(event) => open(0, event.currentTarget)}
          aria-label="Ouvrir les photos de la formation Prêt à intervenir 2026"
        >
          <img src={photoPath(0)} alt={photos[0]} width={960} height={720} loading="lazy" />
          <span>
            <Images size={17} /> Voir les 7 photos <ArrowUpRight size={18} />
          </span>
        </button>
        <div className="training-copy">
          <div className="eyebrow">PRÉPARATION AUX CATASTROPHES NATURELLES</div>
          <h3>
            Formation
            <br />« Prêt à intervenir » 2026
          </h3>
          <p>
            Se préparer à intervenir en cas de catastrophe naturelle : c’est l’objectif de la
            formation « Prêt à intervenir » 2026 présentée par la branche Menabe.
          </p>
          <p>
            Retour en images sur cette séance de formation, avec les participants et les
            intervenants de la Croix-Rouge.
          </p>
          <button className="text-link" onClick={(event) => open(0, event.currentTarget)}>
            Découvrir la formation en images <ArrowRight size={18} />
          </button>
        </div>
      </article>
      <div className="training-gallery" aria-label="Galerie de la formation Prêt à intervenir 2026">
        {photos.map((caption, index) => (
          <button
            key={caption}
            className="training-thumbnail"
            onClick={(event) => open(index, event.currentTarget)}
            aria-label={`Agrandir la photo ${index + 1} : ${caption}`}
          >
            <img src={photoPath(index)} alt={caption} loading="lazy" />
            <span aria-hidden="true">
              0{index + 1} <ArrowUpRight size={14} />
            </span>
          </button>
        ))}
      </div>
      <div className="training-news-bottom">
        <p>Formation « Prêt à intervenir » · 2026 · Branche Menabe</p>
        <a
          className="text-link"
          href="https://www.facebook.com/croixrougemalagasy/"
          target="_blank"
          rel="noreferrer"
        >
          Publications nationales <ExternalLink size={15} />
        </a>
      </div>
      <dialog
        ref={dialog}
        className="training-lightbox"
        onCancel={close}
        aria-labelledby="training-gallery-title"
      >
        <div className="lightbox-heading">
          <div>
            <span>BRANCHE MENABE · 2026</span>
            <h3 id="training-gallery-title">Formation « Prêt à intervenir »</h3>
          </div>
          <button onClick={close} aria-label="Fermer la galerie">
            <X size={23} />
          </button>
        </div>
        {selected !== null && (
          <>
            <div className="lightbox-image">
              <img src={photoPath(selected)} alt={photos[selected]} />
            </div>
            <div className="lightbox-controls">
              <button onClick={() => move(-1)} aria-label="Photo précédente">
                <ArrowLeft size={22} />
              </button>
              <div aria-live="polite">
                <strong>
                  {selected + 1} / {photos.length}
                </strong>
                <p>{photos[selected]}</p>
              </div>
              <button onClick={() => move(1)} aria-label="Photo suivante">
                <ArrowRight size={22} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
