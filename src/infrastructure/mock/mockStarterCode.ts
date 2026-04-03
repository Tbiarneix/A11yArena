import type { StarterCode } from '@/domain/challenge/StarterCode';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';

export const MOCK_STARTER_CODES: StarterCode[] = [
  {
    challengeSlug: 'bouton-sans-label',
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Démo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="toolbar">
    <button class="icon-btn">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </button>
    <button class="icon-btn">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </svg>
    </button>
    <button class="icon-btn">
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    </button>
  </div>
</body>
</html>`,
      },
      {
        name: 'style.css',
        language: 'css',
        content: `.toolbar {
  display: flex;
  gap: 8px;
  padding: 16px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  background: #f0f0f0;
}`,
      },
    ],
  },
  {
    challengeSlug: 'formulaire-sans-labels',
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Formulaire d'inscription</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <form class="form">
    <h1>Inscription</h1>
    <div class="form-group">
      <input type="text" placeholder="Nom complet" class="input">
    </div>
    <div class="form-group">
      <input type="email" placeholder="Email" class="input">
    </div>
    <div class="form-group">
      <input type="password" placeholder="Mot de passe" class="input">
    </div>
    <div class="error-container"></div>
    <button type="submit" class="btn">S'inscrire</button>
  </form>
</body>
</html>`,
      },
      {
        name: 'style.css',
        language: 'css',
        content: `.form {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group { margin-bottom: 16px; }

.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #002045;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}`,
      },
    ],
  },
  {
    challengeSlug: 'menu-navigation-clavier',
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Menu navigation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <ul class="menu">
      <li class="menu__item menu__item--has-sub">
        <a href="#" class="menu__link">Produits</a>
        <ul class="submenu">
          <li><a href="#" class="menu__link">Web</a></li>
          <li><a href="#" class="menu__link">Mobile</a></li>
          <li><a href="#" class="menu__link">API</a></li>
        </ul>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">Tarifs</a>
      </li>
      <li class="menu__item">
        <a href="#" class="menu__link">Contact</a>
      </li>
    </ul>
  </nav>
</body>
</html>`,
      },
      {
        name: 'style.css',
        language: 'css',
        content: `.menu {
  list-style: none;
  display: flex;
  gap: 16px;
  padding: 16px;
  margin: 0;
}

.menu__item { position: relative; }

.menu__link {
  display: block;
  padding: 8px 12px;
  color: #002045;
  text-decoration: none;
  border-radius: 4px;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 0;
  min-width: 140px;
}

.menu__item--has-sub:hover .submenu {
  display: block;
}`,
      },
    ],
  },
  {
    challengeSlug: 'modal-focus-trap',
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Modale</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button id="open-modal" class="btn">Ouvrir la modale</button>

  <div id="modal" class="modal" style="display:none;">
    <div class="modal__backdrop"></div>
    <div class="modal__content">
      <h2>Confirmation</h2>
      <p>Voulez-vous supprimer cet élément&nbsp;?</p>
      <div class="modal__actions">
        <button class="btn btn--danger">Supprimer</button>
        <button id="close-modal" class="btn btn--secondary">Annuler</button>
      </div>
    </div>
  </div>

  <script>
    document.getElementById('open-modal').addEventListener('click', () => {
      document.getElementById('modal').style.display = 'block';
    });
    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('modal').style.display = 'none';
    });
  </script>
</body>
</html>`,
      },
      {
        name: 'style.css',
        language: 'css',
        content: `.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
}

.modal__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 300px;
}

.modal__actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
}`,
      },
    ],
  },
];

export const MOCK_TESTS: ChallengeTest[] = [
  // bouton-sans-label
  {
    id: 'btn-1',
    challengeSlug: 'bouton-sans-label',
    order: 1,
    type: 'axe',
    description: 'Les boutons ont un nom accessible',
    wcagCriterion: '4.1.2',
    ruleKey: 'button-name',
  },
  {
    id: 'btn-2',
    challengeSlug: 'bouton-sans-label',
    order: 2,
    type: 'keyboard',
    description: 'Les boutons sont accessibles au clavier (Tab + Entrée)',
    wcagCriterion: '2.1.1',
    ruleKey: 'keyboard-focusable',
  },
  {
    id: 'btn-3',
    challengeSlug: 'bouton-sans-label',
    order: 3,
    type: 'axe',
    description: "Les icônes SVG ont aria-hidden='true'",
    wcagCriterion: '1.1.1',
    ruleKey: 'image-alt',
  },
  // formulaire-sans-labels
  {
    id: 'form-1',
    challengeSlug: 'formulaire-sans-labels',
    order: 1,
    type: 'axe',
    description: 'Chaque champ a un label associé',
    wcagCriterion: '1.3.1',
    ruleKey: 'label',
  },
  {
    id: 'form-2',
    challengeSlug: 'formulaire-sans-labels',
    order: 2,
    type: 'axe',
    description: "Le conteneur d'erreur utilise aria-live",
    wcagCriterion: '4.1.3',
    ruleKey: 'aria-live-region',
  },
  {
    id: 'form-3',
    challengeSlug: 'formulaire-sans-labels',
    order: 3,
    type: 'axe',
    description: 'Les champs ont des id uniques',
    wcagCriterion: '4.1.1',
    ruleKey: 'duplicate-id',
  },
  // modal-focus-trap
  {
    id: 'modal-1',
    challengeSlug: 'modal-focus-trap',
    order: 1,
    type: 'axe',
    description: 'La modale a le rôle dialog',
    wcagCriterion: '4.1.2',
    ruleKey: 'dialog-name',
  },
  {
    id: 'modal-2',
    challengeSlug: 'modal-focus-trap',
    order: 2,
    type: 'keyboard',
    description: 'Le focus est piégé dans la modale',
    wcagCriterion: '2.1.2',
    ruleKey: 'focus-trap',
  },
  {
    id: 'modal-3',
    challengeSlug: 'modal-focus-trap',
    order: 3,
    type: 'keyboard',
    description: 'Échap ferme la modale',
    wcagCriterion: '2.1.1',
    ruleKey: 'modal-escape',
  },
  {
    id: 'modal-4',
    challengeSlug: 'modal-focus-trap',
    order: 4,
    type: 'axe',
    description: 'aria-modal est présent',
    wcagCriterion: '4.1.2',
    ruleKey: 'aria-modal',
  },
];
