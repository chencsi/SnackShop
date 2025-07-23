# SnackShop Frontend

## Weboldal felépítése

```
src/
└── pages/
    ├── index.tsx                # Főoldal / Terméklista
    ├── login.tsx                # Bejelentkezés
    ├── register.tsx             # Regisztráció
    ├── cart.tsx                 # Kosár
    ├── orders/
    │   └── index.tsx            # Felhasználó rendelései
    └── admin/
        ├── index.tsx            # Admin felület
        ├── products/
        │   ├── index.tsx        # Termékek kezelése
        │   ├── new.tsx          # Új termék hozzáadása
        │   └── [id].tsx         # Termék szerkesztése
        └── orders/
            └── index.tsx        # Minden rendelés (admin nézet)
```
