# Évaluation diagnostique informatique 2AC

Application statique bilingue français–arabe compatible avec GitHub Pages.

- `/` : questionnaire et évaluation des élèves.
- `/enseignant/` : tableau de bord protégé par Supabase Auth.
- Supabase : stockage durable, authentification et règles RLS.

## GitHub Pages

Dans **Settings → Pages**, choisir **GitHub Actions** comme source. Le workflow inclus publie automatiquement le contenu du dossier `dist`.

## Premier accès enseignant

Ouvrir `/enseignant/`, saisir l'adresse enseignant autorisée dans Supabase, choisir un mot de passe d'au moins 8 caractères puis cliquer sur **Première connexion : créer mon accès**. Confirmer l'adresse si Supabase envoie un courriel, puis se connecter.

La clé publique Supabase présente dans `dist/assets/config.js` est conçue pour être publiée. La sécurité des données repose sur les politiques RLS. Ne jamais ajouter de clé `service_role` au dépôt.
