<div align="center">
    <img src="./public/Logo.webp" width="200" />
    <h1>O + Offrant (Front-end)</h1>
    <p>Site d'enchère</p>
</div>

## :books: Description

Le projet 6 nommé **O + Offrant** est un site d'enchère destiné aux particuliers majeurs.
Il permet de déposer un article de son choix et ou d'enchérir avec des euros afin de remporter un lot.

## 🌐 Déploiement

Le site est déployé sur railway à l'adresse suivante : [o-plus-offrant](https://o-plus-offrant-front-end-production.up.railway.app/)

## 📦 Installation

### Dépendances 

Pour installer les dépendances du projet :

```bash
yarn
```

### Configuration de l'application

L'application front-end ne peut marcher sans l'application [back-end](https://github.com/O-clock-Starship/projet-06-o-plus-offrant-back) qui lui renvoie et traite toutes les données. Il est donc essentiel de configurer et de pointer l'application front-end sur l'URL du serveur **back-end**.

Si par exemple le serveur back-end tourne en **localhost** dans un **terminal**, il faudra :

   1. Copier la configuration de l'environnement

```bash
# Copier l'exemple de l'environnement.
cp .env.example .env
```

  2. Ouvrir le fichier avec notre IDE préféré (ici nous utilisons nano) :

```bash
# Ouvrir avec l'IDE de votre choix.
nano .env
```

  3. Enfin, si le serveur back-end tourne en localhost sur le port 4000, la configuration de la variable d'environnement du projet sera **http://localhost:4000** .Si le service back-end tourne sur une autre instance que le localhost, il faut alors changer la variable par la nouvelle URL correspondante.

```bash
# Exemple de la configuration de URL d'une l'instance back-end tournant en localhost sur le port 4000.
VITE_AXIOS_SERVER='http://localhost:4000'
``````

## 🪄 Usage (coté Front-end)

Pour lancer l'application coté front-end en [localhost](http://localhost:5173/) :

```bash
yarn dev
```

Pour lancer l'application coté *back-end*, voir les instructions fournies sur le [repository](https://github.com/O-clock-Starship/projet-06-o-plus-offrant-back) dédié.

## ✨ Contributeurs

   * Coté Front-end
      + [Christophe-miranville](https://github.com/Christophe-miranville)
      + [Estelle-Li-Zheng](https://github.com/Estelle-Li-Zheng)
      + [Ld-monkey](https://github.com/Ld-monkey)

   * Coté Back-end
      + [DidierLam](https://github.com/DidierLam)
      + [stephanebidard](https://github.com/stephanebidard)

# Référence

   * [GitHub - projet Back-end](https://github.com/O-clock-Starship/projet-06-o-plus-offrant-back)