import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  HandHeart,
  Stethoscope,
  Siren,
  Phone,
  Clock3,
  Check,
  ExternalLink,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useCreateRequest } from "../queries/requests";
import { TrainingNews } from "../components/training-news";

const missions = [
  {
    icon: ShieldCheck,
    title: "Premiers secours",
    description:
      "Promouvoir les gestes qui sauvent et une réponse de proximité face aux situations d’urgence.",
    detail:
      "Les premiers secours sont au cœur de l’engagement des Sociétés nationales. Pour connaître les possibilités de sensibilisation et de formation dans le Menabe, prenez contact avec notre branche.",
  },
  {
    icon: Stethoscope,
    title: "Santé communautaire",
    description:
      "Sensibiliser, prévenir et contribuer à protéger la santé au sein des communautés.",
    detail:
      "La santé communautaire place les personnes au centre de la prévention. Les Sociétés nationales contribuent à la sensibilisation et à l’amélioration des pratiques de santé. Contactez la branche pour connaître les activités locales.",
  },
  {
    icon: Siren,
    title: "Risques & catastrophes",
    description: "Renforcer la préparation et accompagner les communautés face aux aléas.",
    detail:
      "La préparation, la réduction des risques et l’aide en situation de catastrophe font partie des missions de la Croix-Rouge Malagasy. Les actions s’appuient sur la proximité avec les communautés et la coordination humanitaire.",
  },
  {
    icon: HandHeart,
    title: "Aide & solidarité",
    description: "Préserver la dignité et accompagner les personnes en situation de vulnérabilité.",
    detail:
      "L’aide sociale et la solidarité répondent à une même exigence : soulager les souffrances sans discrimination et respecter la personne humaine. Pour une demande d’information ou un partenariat local, contactez notre équipe.",
  },
];
const principles = [
  "Humanité",
  "Impartialité",
  "Neutralité",
  "Indépendance",
  "Volontariat",
  "Unité",
  "Universalité",
];
type Modal = "support" | "privacy" | "principles" | number | null;

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#accueil"
      aria-label="Croix-Rouge Malagasy, branche Menabe — accueil"
    >
      <img
        className="brand-logo"
        src="/images/logo-croix-rouge-malagasy.png"
        alt="Logo de la Croix-Rouge Malagasy"
        width={249}
        height={244}
      />
      <span className="brand-type">
        CROIX-ROUGE MALAGASY<span>BRANCHE MENABE</span>
      </span>
    </a>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [subject, setSubject] = useState("Autre demande");
  const dialog = useRef<HTMLDialogElement>(null);
  const mutation = useCreateRequest();
  useEffect(() => {
    if (modal !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  const contact = (reason: string) => {
    setSubject(reason);
    setModal(null);
    setMenu(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    mutation.mutate({
      name: String(data.get("name")),
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      subject: subject as "Bénévolat" | "Soutien et dons" | "Partenariat" | "Autre demande",
      message: String(data.get("message")),
      consent: true,
      website: String(data.get("website") ?? ""),
    });
  };
  return (
    <>
      <a className="skip" href="#mission">
        Aller au contenu
      </a>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Aux côtés des communautés, au cœur du Menabe.</span>
          <span>
            <MapPin size={12} /> Morondava, Madagascar <i /> Français
          </span>
        </div>
      </div>
      <header>
        <div className="container nav">
          <Brand />
          <nav aria-label="Navigation principale" className={menu ? "nav-links open" : "nav-links"}>
            {[
              ["Notre mission", "mission"],
              ["Nos actions", "actions"],
              ["Devenir bénévole", "benevolat"],
              ["Contact", "contact"],
            ].map(([name, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))}
          </nav>
          <button className="button button-red nav-donate" onClick={() => setModal("support")}>
            <Heart size={16} /> Nous soutenir
          </button>
          <button
            className="menu-button"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero container" id="accueil">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> CROIX-ROUGE MALAGASY · MENABE
            </div>
            <h1>
              Plus proches.
              <br />
              Plus solidaires.
              <br />
              <em>Plus humains.</em>
            </h1>
            <p>
              Prévenir et alléger les souffrances.
              <br className="desktop-break" /> Protéger la vie, la santé et la dignité de chacun.
              <br className="desktop-break" /> Ensemble, dans le Menabe.
            </p>
            <div className="hero-buttons">
              <a className="button button-red" href="#benevolat">
                Devenir bénévole <ArrowRight size={17} />
              </a>
              <a className="button button-outline" href="#mission">
                Découvrir notre mission <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="note-line" />
              <span>
                Une présence locale.
                <br />
                <strong>Un engagement universel.</strong>
              </span>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/bureau-menabe.jpg"
              alt="Le bureau de la Croix-Rouge Malagasy, branche Menabe, bâtiment blanc et rouge à Morondava"
              fetchPriority="high"
            />
            <div className="photo-label">
              <MapPin size={17} />
              <span>
                Notre bureau à Morondava<small>Branche régionale Menabe</small>
              </span>
            </div>
            <div className="photo-corner" aria-hidden="true">
              <Plus size={30} strokeWidth={3} />
            </div>
          </div>
        </section>
        <div className="principles-strip">
          <div className="container principles-inner">
            <span className="principles-title">
              7 principes fondamentaux.
              <br />
              <strong>Une même humanité.</strong>
            </span>
            <div className="principles-list">
              {principles.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
            <button
              aria-label="Découvrir les sept principes"
              onClick={() => setModal("principles")}
            >
              <ArrowUpRight size={22} />
            </button>
          </div>
        </div>
        <section className="container section mission-section" id="mission">
          <div className="section-heading">
            <div>
              <div className="eyebrow">NOTRE RAISON D’ÊTRE</div>
              <h2>
                L’humanité, au cœur
                <br />
                de notre engagement.
              </h2>
            </div>
            <div className="mission-intro">
              <p>
                Prévenir et alléger en toutes circonstances les souffrances humaines, protéger la
                vie et la santé, et faire respecter la personne humaine.
              </p>
              <span>
                La mission du Mouvement international de la Croix-Rouge
                <br />
                et du Croissant-Rouge.
              </span>
            </div>
          </div>
          <div className="mission-bottom">
            <span className="small-cross" aria-hidden="true">
              +
            </span>
            <p>
              En tant que Société nationale, la Croix-Rouge Malagasy agit comme auxiliaire des
              pouvoirs publics dans le domaine humanitaire. Notre branche Menabe inscrit cet
              engagement au niveau local, au plus près des communautés.
            </p>
            <a
              href="https://www.ifrc.org/national-societies-directory/malagasy-red-cross-society"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Le Mouvement international <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="actions-section" id="actions">
          <div className="container section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">AGIR AU PLUS PRÈS</div>
                <h2>
                  Une mission.
                  <br />
                  Plusieurs façons d’agir.
                </h2>
              </div>
              <p className="section-description">
                Les grands domaines d’intervention de la Croix-Rouge Malagasy, au service des
                personnes et des communautés.
              </p>
            </div>
            <div className="mission-grid">
              {missions.map((m, i) => (
                <button className="mission-card" key={m.title} onClick={() => setModal(i)}>
                  <div className="card-top">
                    <m.icon size={29} strokeWidth={1.5} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                  <span className="card-link">
                    En savoir plus <ArrowUpRight size={19} />
                  </span>
                </button>
              ))}
            </div>
            <div className="action-footnote">
              <ShieldCheck size={15} />
              <span>Des actions guidées par les besoins, sans discrimination.</span>
            </div>
          </div>
        </section>
        <TrainingNews />
        <section className="volunteer-section" id="benevolat">
          <div className="container volunteer-inner">
            <div>
              <div className="eyebrow">LA SOLIDARITÉ COMMENCE AVEC VOUS</div>
              <h2>
                Votre temps peut
                <br />
                faire la différence.
              </h2>
              <p>
                Une envie d’aider, un peu de votre temps, un engagement sincère.
                <br />
                Prenez contact pour découvrir le bénévolat dans le Menabe.
              </p>
              <button className="button button-white" onClick={() => contact("Bénévolat")}>
                Je souhaite devenir bénévole <ArrowRight size={18} />
              </button>
            </div>
            <div className="volunteer-symbol" aria-hidden="true">
              <Heart size={135} strokeWidth={0.8} />
              <span>
                Au service des autres.
                <br />
                Avec vous.
              </span>
            </div>
          </div>
        </section>
        <section className="container support-section">
          <div className="support-icon">
            <HandHeart size={35} strokeWidth={1.5} />
          </div>
          <div>
            <h3>La solidarité prend aussi la forme d’un soutien.</h3>
            <p>Un don, du matériel ou un partenariat : échangeons sur la manière de contribuer.</p>
          </div>
          <button className="text-link" onClick={() => setModal("support")}>
            Comment nous soutenir <ArrowUpRight size={20} />
          </button>
        </section>
        <section className="contact-section" id="contact">
          <div className="container section contact-grid">
            <div>
              <div className="eyebrow">PARLONS SOLIDARITÉ</div>
              <h2>
                Nous sommes
                <br />à votre écoute.
              </h2>
              <p className="contact-intro">
                Une question, une envie de vous engager ou un projet à partager ? Écrivez-nous.
              </p>
              <div className="contact-detail">
                <MapPin />
                <div>
                  <strong>Bureau de la branche Menabe</strong>
                  <span>
                    Morondava centre, région Menabe
                    <br />
                    Madagascar
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Croix+Rouge+Morondava+Madagascar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rechercher sur la carte <ArrowUpRight size={14} />
                  </a>
                  <small>Localisation précise à confirmer auprès de la branche.</small>
                </div>
              </div>
              <div className="contact-detail">
                <Phone />
                <div>
                  <strong>+261 34 106 98 38</strong>
                  <small>Numéro indiqué sur la capture fournie · à confirmer.</small>
                </div>
              </div>
              <div className="contact-detail">
                <Clock3 />
                <div>
                  <strong>Lundi — vendredi · 09 h — 18 h</strong>
                  <small>Horaires indiqués sur la capture · à confirmer.</small>
                </div>
              </div>
            </div>
            <div className="form-card">
              {mutation.isSuccess ? (
                <div className="form-success" aria-live="polite">
                  <span>
                    <Check size={30} />
                  </span>
                  <h3>Votre demande est enregistrée.</h3>
                  <p>
                    Référence : <strong>{mutation.data.reference}</strong>
                  </p>
                  <p>
                    Elle est conservée dans la base du site. Aucun email automatique n’est envoyé et
                    aucun délai de réponse n’est garanti.
                  </p>
                  <button className="button button-outline" onClick={() => mutation.reset()}>
                    Écrire un autre message <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3>Envoyez-nous un message</h3>
                  <p className="form-caption">Les champs marqués d’un * sont obligatoires.</p>
                  <div className="form-row">
                    <label>
                      Votre nom *
                      <input
                        aria-label="Votre nom"
                        name="name"
                        autoComplete="name"
                        placeholder="Nom et prénom"
                        minLength={2}
                        maxLength={100}
                        required
                      />
                    </label>
                    <label>
                      Votre email *
                      <input
                        aria-label="Votre email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.com"
                        maxLength={200}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Téléphone <span>(facultatif)</span>
                      <input
                        aria-label="Téléphone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+261 …"
                        maxLength={40}
                      />
                    </label>
                    <label>
                      Votre demande *
                      <div className="select-wrap">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          name="subject"
                        >
                          {["Autre demande", "Bénévolat", "Soutien et dons", "Partenariat"].map(
                            (s) => (
                              <option key={s}>{s}</option>
                            ),
                          )}
                        </select>
                        <ChevronDown size={15} />
                      </div>
                    </label>
                  </div>
                  <label>
                    Votre message *
                    <textarea
                      aria-label="Votre message"
                      name="message"
                      placeholder="Dites-nous comment nous pouvons vous aider…"
                      minLength={10}
                      maxLength={3000}
                      rows={4}
                      required
                    />
                  </label>
                  <div className="honeypot" aria-hidden="true">
                    <label>
                      Site web
                      <input
                        aria-label="Site web"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <label className="consent">
                    <input
                      aria-label="Consentement à la conservation des informations"
                      type="checkbox"
                      required
                    />
                    <span>
                      J’accepte que mes informations soient conservées pour le traitement de ma
                      demande.{" "}
                      <button type="button" onClick={() => setModal("privacy")}>
                        Confidentialité
                      </button>
                    </span>
                  </label>
                  {mutation.isError && (
                    <p className="form-error" role="alert">
                      {mutation.error.message || "L’enregistrement a échoué. Veuillez réessayer."}
                    </p>
                  )}
                  <button
                    className="button button-red form-submit"
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Enregistrement en cours…" : "Envoyer mon message"}
                    <ArrowRight size={17} />
                  </button>
                  <p className="storage-note">
                    Demande enregistrée sur ce site · pas d’envoi automatique par email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-main">
          <div>
            <Brand light />
            <p>
              Prévenir les souffrances.
              <br />
              Protéger la dignité. Agir ensemble.
            </p>
          </div>
          <div>
            <span className="footer-title">NOTRE BRANCHE</span>
            <a href="#mission">Notre mission</a>
            <a href="#actions">Nos actions</a>
            <a href="#contact">Nous contacter</a>
          </div>
          <div>
            <span className="footer-title">S’ENGAGER</span>
            <a href="#benevolat">Devenir bénévole</a>
            <button onClick={() => setModal("support")}>Nous soutenir</button>
            <button onClick={() => contact("Partenariat")}>Construire un partenariat</button>
          </div>
          <div className="footer-location">
            <MapPin size={21} />
            <strong>
              Ancrés dans le Menabe.
              <br />
              Unis par l’humanité.
            </strong>
            <span>Morondava · Madagascar</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Croix-Rouge Malagasy · Branche Menabe</span>
          <button onClick={() => setModal("privacy")}>Confidentialité</button>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>
      <dialog ref={dialog} className="modal" onCancel={() => setModal(null)}>
        <button className="modal-close" aria-label="Fermer" onClick={() => setModal(null)}>
          <X size={23} />
        </button>
        {modal === "support" ? (
          <>
            <HandHeart className="modal-icon" size={42} />
            <div className="eyebrow">SOUTENIR LA BRANCHE MENABE</div>
            <h2>Chaque geste compte.</h2>
            <p>
              Vous souhaitez proposer un don, du matériel ou un partenariat ? Contactez la branche
              pour connaître les besoins et convenir des modalités de soutien.
            </p>
            <div className="modal-notice">
              Aucun paiement n’est collecté sur ce site. Aucun numéro de compte ou de paiement
              mobile n’est publié sans validation officielle.
            </div>
            <button className="button button-red" onClick={() => contact("Soutien et dons")}>
              Discuter de mon soutien <ArrowRight size={17} />
            </button>
          </>
        ) : modal === "privacy" ? (
          <>
            <div className="eyebrow">VOS INFORMATIONS</div>
            <h2>Confidentialité</h2>
            <p>
              Le formulaire collecte votre nom, votre email, votre téléphone facultatif, l’objet et
              le contenu de votre message. Ces informations sont enregistrées dans la base du site
              pour permettre le traitement de votre demande.
            </p>
            <p>
              Aucun email automatique n’est envoyé. Évitez d’inclure des données de santé, des
              pièces d’identité ou des informations sensibles. Vous pouvez demander la suppression
              de votre demande en indiquant sa référence dans un nouveau message.
            </p>
            <p className="modal-notice">
              Ce formulaire n’est pas un service d’urgence. Les modalités et la durée de
              conservation devront être validées par la branche avant une ouverture officielle au
              public.
            </p>
          </>
        ) : modal === "principles" ? (
          <>
            <div className="eyebrow">NOTRE BOUSSOLE</div>
            <h2>Les 7 principes fondamentaux</h2>
            <p>L’action de la Croix-Rouge repose sur sept valeurs éthiques :</p>
            <ol className="principle-modal-list" aria-label="Les sept valeurs éthiques">
              {principles.map((p, i) => (
                <li key={p}>
                  <small aria-hidden="true">{i + 1}.</small>
                  {p === "Neutralité"
                    ? "La neutralité"
                    : p === "Volontariat"
                      ? "Le volontariat"
                      : `L’${p.toLowerCase()}`}
                </li>
              ))}
            </ol>
            <a
              href="https://www.ifrc.org/fr/nos-principes-fondamentaux"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Découvrir les principes sur le site de la FICR <ExternalLink size={16} />
            </a>
          </>
        ) : typeof modal === "number" ? (
          <>
            <div className="eyebrow">NOS DOMAINES D’ACTION</div>
            <h2>{missions[modal].title}</h2>
            <p>{missions[modal].detail}</p>
            <p className="modal-notice">
              Présentation générale des missions. Les activités et disponibilités locales sont à
              confirmer avec la branche Menabe.
            </p>
            <button className="button button-red" onClick={() => contact("Autre demande")}>
              En parler avec la branche <ArrowRight size={17} />
            </button>
          </>
        ) : null}
      </dialog>
    </>
  );
}
