<p align="center">
    <img src="/public/assets/logo.png" alt="Skeleton Wave Shooter logo" align="center"/>
</p>
<h1 align="center">Skeleton Wave Shooter</h1>

> Projet VR réalisé dans le cadre du cours d'exploration de A-Frame du Bachelor Ingénierie des médias, HEIG-VD.

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![A-Frame](https://img.shields.io/badge/A%E2%80%93Frame-brightgreen?style=for-the-badge&labelColor=%23ef2d5e&color=%23ef2d5e)
![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

---

## Concept

**Skeleton Wave Shooter** est un jeu de tir à la première personne en réalité virtuelle. Le joueur se retrouve au centre d'une arène volcanique sombre et doit éliminer une vague de 15 squelettes qui convergent vers lui depuis toutes les directions. Le but est de tous les abattre avant qu'ils ne l'atteignent.

L'ambiance est délibérément ténébreuse : brouillard rouge sang, éclairage volcanique, musique de fond oppressante et grognements de créatures qui résonnent dans l'obscurité. Le joueur est armé d'un Desert Eagle et doit viser avec précision pour survivre.

---

## Ce que j'ai appris — Architecture Entity Component System

Ce projet m'a permis d'explorer en profondeur l'architecture **Entity Component System (ECS)** propre à A-Frame. Dans cette approche :

- Une **entité** (`<a-entity>`) est un objet vide sans comportement propre
- Un **composant** (`AFRAME.registerComponent`) encapsule un comportement réutilisable que l'on attache à une entité
- Un **système** (`AFRAME.registerSystem`) gère une logique globale partagée entre plusieurs composants

Cette architecture m'a appris à séparer les responsabilités : au lieu de tout mettre dans un seul fichier, chaque comportement (marcher vers le joueur, détecter un hit, gérer le score) vit dans son propre composant. Cela rend le code modulaire, réutilisable et plus facile à déboguer. J'ai également compris l'importance de ne pas gérer la logique de jeu dans les composants Vue, mais bien dans des systèmes A-Frame qui communiquent via des événements.

---

## Composants A-Frame créés

| Fichier | Rôle |
|---|---|
| `game-manager.js` | Système global qui gère le score, le timer, les highscores, les sons de snarl et les événements de fin de partie |
| `skeleton-walker.js` | Fait marcher le squelette vers le joueur et déclenche le game over si la distance est trop faible |
| `shooting-target.js` | Détecte le clic sur un squelette, déclenche l'animation de mort, le son de tir et émet un événement de score |

---

## Stack technique

- [A-Frame](https://aframe.io/) v1.7.1
- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Three.js](https://threejs.org/) r173
- Boilerplate de base : [a-frame-vite-vue-boilerplate](https://github.com/Chabloz/a-frame-vite-vue-boilerplate) par [M. Nicolas Chabloz](https://github.com/Chabloz) dans le cadre du cours de Réalité Virtuelle, HEIG-VD

---

## Libs incluses

- [aframe-extras](https://github.com/c-frame/aframe-extras) — MIT License
- [aframe physx](https://github.com/c-frame/physx) — MIT License
- [aframe-blink-controls](https://github.com/jure/aframe-blink-controls) — MIT License
- [aframe-multi-camera](https://github.com/diarmidmackenzie/aframe-multi-camera/) — MIT License
- [simple-navmesh-constraint](https://github.com/AdaRoseCannon/aframe-xr-boilerplate) — MIT License

---

## Modes de jeu supportés

- **Desktop** — Clavier WASD / flèches pour se déplacer + Souris pour regarder + Clic pour tirer
- **VR/AR** — Utiliser l'orientation du headset pour regarder et la gachette de la manette VR pour tirer

---

## Ressources utilisées

### Modèles 3D

- [Skeleton animated](https://sketchfab.com/3d-models/skeleton-animated-9210377c7a514cf6b48a31b9d3991ff3) par [dnielmclogan](https://sketchfab.com/dnielmclogan) — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [Mephiles Phase_1](https://sketchfab.com/3d-models/mephiles-phase-1-d506a5f62be046b49bf9ea424333b9f2) par World Game — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [Desert Eagle Gun](https://sketchfab.com/3d-models/desert-eagle-gun-1605b6c38826433fb3fe564e1d043199) par [attix84work](https://sketchfab.com/attix84work) — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

### Sons

- [Single gunshot sound](https://pixabay.com/sound-effects/film-special-effects-single-pistol-gunshot-3-101923/) par morganpurkis for freesound community — [Pixabay Content License](https://pixabay.com/service/license-summary/)
- [Dark rumble atmosphere, loops, droning, slight low pitched whine](https://www.zapsplat.com/?registration_redirect=1&item_id=166531) par [Dark Harmonics](https://www.zapsplat.com/author/dark-harmonics/) — [Standard License Agreement](https://www.zapsplat.com/license-type/standard-license/)
- [Demon or evil monster, snarl, nasal, soft](https://www.zapsplat.com/sound-effect-category/monsters-and-creatures/) par [Zapsplat](https://www.zapsplat.com/author/zapsplat/) — [Standard License Agreement](https://www.zapsplat.com/license-type/standard-license/)

---

## Quickstart

```sh
git clone https://github.com/VictorWojciechowski/VR.git .
npm ci
npm run dev expose
```

3. Sur le casque, navigue vers l'adresse `[ip]:[port]` affichée dans le terminal.

> Le certificat est auto-signé, il faudra confirmer l'accès dans le navigateur du casque.

---


### [>> DEMO <<](https://vr.onivers.com/victor/)

## License

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge&color=%23262626)
