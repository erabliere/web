---
layout: post
author: "kafkaah"
title: "Comment intégrer du JavaScript dans un post"
date: "2022-12-01 22:34:41 -0000"
categories: ["Programmation"]
tags: ["programmation"]
fichier: "2022-12-01-comment-integrer-du-javascript-dans-un-post.md"
visible: "oui"
---

<!-- Cet élément <script> doit être présent et doit avoir: class="scriptacular" -->
<script class="scriptacular" type="text/javascript">
  //Ici, on code ce qu'on veut
  function couleur(el, clr){
    console.log("Fonction invoquée avec la couleur: " + clr);
    console.log("Fonction invoquée avec le bouton dont l'id est: " + el.id);
    el.style.color = clr
    const p = document.getElementById('para')
    p.style.color = clr
  }

</script>

<!-- On peut injecter n'importe quel code HTML ici  -->
<div id="box">
  <p id="para">Du texte</p>
  <!-- La fonction "couleur" a été déclarée plus haut  -->
  <!-- "this" représente l'élément HTML lui-même (ici, les boutons. Voir "el" dans la fonction)  -->
  <button id="bouton-bleu" onclick="couleur(this, 'blue');">Bleu</button>
  <button id="bouton-rouge" onclick="couleur(this, 'red');">Rouge</button>  
<div>

