# SnackShop
Full-Stack Próbafeladat

### Első indítás (adatbázis, backend, frontend, adminer)

```bash
docker compose up --build
```

Ez elindítja:
- **Backend** (Fastify + Prisma): [http://localhost:3001](http://localhost:3001)
- **Frontend** (React): [http://localhost:3000](http://localhost:3000)
- **Adminer** (adatbázis böngésző): [http://localhost:8080](http://localhost:8080)
- **PostgreSQL**: a Docker hálózaton belül `db` néven érhető el

### Adatbázis migráció és seed (admin felhasználó, termékek és rendelések létrehozása)

Indítás után a backend konténerben futtasd az alábbi parancsot, hogy létrejöjjön a fix admin és a többi kezdeti adat:

```bash
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npx prisma db seed
```

Admin felhasználó:
- **Felhasználónév:** admin  
- **Jelszó:** SnackBoss2025

### 5. Bejelentkezés az Adminerbe

- **Server:** db
- **Felhasználó:** snackshop
- **Jelszó:** snackshop
- **Adatbázis:** snackshop