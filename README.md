Pour faire le docker
- docker compose up
Changez bien les variables de connexion de la bd dans le compose
Mettez les a jour sur le .env
(Si ya un souci, vous rentrez dans le docker postgres et creer la db
- pour se connecter psql -U mot de passe
- CREATE DATABASE nom de la bd
)
Quand tu finis tu pars dans le container de l'app
- Tu fais node ace migration:run --force
- Ensuite tu fais node ace db:seed
( Les credentials de l'admin par defaut sont user helios@gmail.com et mdp 123456)
