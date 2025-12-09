# 🚀 OptiShip360

**OptiShip360** est une plateforme complète de digitalisation pour les activités d'import–export, logistique et gestion financière. L'objectif est de centraliser toutes les opérations au sein d'un système moderne, automatisé et traçable de bout en bout.

---

## 🌍 Vision du projet
Créer une application robuste, évolutive et intuitive permettant de gérer efficacement :
- Les clients
- Les commandes, colis et expéditions
- La logistique entrepôt & transport (Air / Mer / Route)
- La facturation automatique & la caisse
- La comptabilité simplifiée
- Un espace client complet
- L’audit et la traçabilité des actions

OptiShip360 vise à être la solution tout‑en‑un pour les entreprises d'import–export souhaitant digitaliser leurs opérations.

---

## 🧱 Architecture générale

- **Backend :** Node.js (Express ou NestJS), MongoDB, JWT/Refresh Tokens, RBAC
- **Frontend :** React / Next.js
- **Base de données :** MongoDB
- **Services :** Email, génération PDF, notifications

---

## 📦 Modules principaux

### 1. Gestion des Clients
- Création, modification, archivage
- Documents liés (RCCM, passeport, etc.)
- Historique complet des interactions

### 2. Commandes, Colis & Expéditions
- Création d’une commande
- Association de colis avec poids, dimensions, valeur
- Modes transport : **Route / Air / Mer**
- Système de tracking avancé

### 3. Gestion Entrepôt & Logistique
- Entrée/sortie colis
- Scan QR-code
- Planification logistique
- Assignation chauffeur/camion

### 4. Facturation Automatisée + Caisse
- Génération automatique de factures (PDF)
- Gestion des paiements (cash, mobile money, virement)
- Suivi des impayés

### 5. Comptabilité de Base + Rapports
- Journal comptable simplifié
- Bilan, charges & revenus
- Rapports exportables (Excel/PDF)

### 6. Espace Client
- Suivi des commandes
- Paiement en ligne (optionnel)
- Téléchargement des factures
- Notifications

### 7. Audit & Traçabilité
- Historique des actions par utilisateur
- Système de validation (workflow)
- Logs consultables pour chaque opération

---

## 🗂️ Modèles de Données (exemples)

- **Client** : informations personnelles + documents
- **Commande** : mode transport, statut, factures
- **Colis** : poids/dimensions/valeur + photos + tracking
- **Expédition** : camion/vol/conteneur + timestamps
- **Facture** : proforma/finale + paiements
- **Caisse** : entrées/sorties + méthodes de paiement
- **AuditLog** : action, user, avant/après, timestamp

---

## 🛠️ Installation

```bash
git clone https://github.com/votre-repo/optiship360.git
cd optiship360
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Roadmap

### Phase 1 — Base
- Authentification (JWT + refresh tokens)
- Module Clients
- Module Commandes/Colis

### Phase 2 — Logistique
- Entrepôt
- Expéditions
- Tracking temps réel

### Phase 3 — Finance
- Facturation automatique
- Caisse
- Comptabilité

### Phase 4 — Espace Client
- Dashboard client
- Paiement
- Notifications

### Phase 5 — Audit & Rapports
- Logs
- Tableaux de bord
- Export PDF/Excel

---

## 🤝 Contribution
Les contributions sont les bienvenues ! Ouvrez une issue ou un pull request pour proposer des améliorations.

---

## 📜 Licence
Projet sous licence MIT.

---

## 🧑‍💻 Auteur
**OptiShip360** — Plateforme de digitalisation import/export
