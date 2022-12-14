---
layout: post
author: "kafkaah"
title: "Au hasard Balthazar"
date: "2022-12-01 20:14:24 -0000"
categories: ["Programmation"]
tags: ["programmation", "expérience"]
fichier: "2022-12-01-au-hasard-balthazar.md"
visible: "oui"
---


<!-- Cet élément <script> doit être présent et doit avoir: class="scriptacular" -->
<script class="scriptacular" type="text/javascript">
  
  //Ici, on code ce qu'on veut
  //Les noms de fonctions doivent être uniques dans la page
  //On peut utiliser un "namespace" (un objet) pour être plus certain de l'unicité d'un fonction créée

  //Utilisation d'un "namespace" (un objet) pour éviter une collision de noms entre les fonctions de la page
  //Plus le nom du namespace est long et compliqué, moins il y a de chance de collision
  const namespace_le_hasard_des_couleurs = {}

  namespace_le_hasard_des_couleurs.couleurAuHasard = function () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
    
  namespace_le_hasard_des_couleurs.couleur = function (el, clr) {
      
    let repeter = 1,
        couleurAppliquee,
        compteur = 0
    
    const p = document.getElementById('citation')
    
    if(clr === 'hasard') {
      repeter = 300
    }
    
    const timer = setInterval(() => {
        const couleurAppliquee = clr === 'hasard' ? namespace_le_hasard_des_couleurs.couleurAuHasard() : clr
        el.style.color = couleurAppliquee 
        p.style.color = couleurAppliquee
        console.log(`${repeter - compteur}: ${couleurAppliquee}`)
        compteur++
        if(compteur >= repeter) {
          clearInterval(timer)
        }
      }, 200)
    
  }
  
</script>

<!-- On peut injecter n'importe quel code HTML ici  -->
<div id="box">
  <p id="citation"><strong>Un coup de dés jamais n'abolira le hasard</strong></p>
  <!-- La fonction "couleur" a été déclarée plus haut  -->
  <!-- "this" représente l'élément HTML lui-même (ici, les boutons. Voir "el" dans la fonction)  -->
  <button onclick="namespace_le_hasard_des_couleurs.couleur(this, 'blue');">Bleu</button>
  <button onclick="namespace_le_hasard_des_couleurs.couleur(this, 'red');">Rouge</button>
  <button onclick="namespace_le_hasard_des_couleurs.couleur(this, 'hasard');">Hasard</button>
<div>
