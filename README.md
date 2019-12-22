# TinyHockey
## B65 - Projet synthèse

Par Félix-Olivier Landry

TinyHockey est un simple jeu web de hockey de style arcade où l'utilisateur contrôle son joueur à partir de son téléphone intelligent.

## Mise en place

### Utilisateur technique

Pour bien configurer l'environnement dans lequel le serveur Node s'executera, il faut s'assurer en premier lieu d'avoir Node et npm d'installé. Ensuite, après avoir cloné le projet, il faut installer les dépendences du jeu en ouvrant une console dans le fichier racine (où se situe le fichier `server.js`) et executer la commande:

```
npm install
```

Quand l'installation est terminée, il ne reste qu'a partir le serveur en executant la ligne de commande suivante au même endroit que tentot:

```
npm start
```

Cette commande partira le serveur sur le port 8000 de l'ordinateur et le jeu est prêt!

### Utilisateur général

Simplement ouvrir un navigateur web et accéder l'adresse de l'ordinateur sur lequel le serveur s'execute au port 8000. Par exemple, si un ordinateur en réseau local dont l'adresse IP est 192.168.1.3, vous n'avez qu'a écrire `http:\\192.168.1.3:8000` pour y acceder.

## Sources

[**Express**](https://expressjs.com/fr/)  
[**Socket.io**](https://socket.io/)  
[**Sprites utilisés**](https://www.spriters-resource.com/nes/icehockey/sheet/27216/)  

Et un gros merci à [**Frédéric Thériault**](https://github.com/ftheriault) pour la classe d'animation TiledImage et son [**créateur de "sprite sheets" normaliés**](https://apps-de-cours.com/utils/sprite-sheet-creator/)!
