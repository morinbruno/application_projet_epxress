# Pré-requis

- [**NodesJS**](https://nodejs.org/en/download/current)
- [**Git**](https://git-scm.com/)
- [**MySQL**](https://dev.mysql.com/downloads/mysql/)

# Installation

1. Copier la commande pour créer un dossier qui clonera le contenue du dépôt.

```shell
git clone https://github.com/MorinoBelgotaku/application_projet_epxress.git
```

2. Installer la base de données sur MySQL (avec son utilisateur)
   - Base de données : ```projet_expressjs```
   - Utilisateur : ```'user_expressjs'@'localhost'``` identifié par ```'Express123'```
  
Juste à copier les requêtes SQL ou importer les requêtes SQL dans MySQL qui sont dans [```base_de_données``` \ ```base_de_donnes.sql```](/base_de_donnée/base_de_donnees.sql)

4. Installer les modules requis au bon fonctionnement de l'application.

```shell
npm i
```

4. Lancer l'application

```shell
node app.js
```

Lien d'accès au site : http://localhost:3000/

5. Connexion à l'application web

Par défaut l'accès se fait avec l'utilisateur ```Admin``` identifié par ```Admin``` (mot de passe modifiable).

Toute création de nouveau utilisateur est automatiquement un utilisateur.
