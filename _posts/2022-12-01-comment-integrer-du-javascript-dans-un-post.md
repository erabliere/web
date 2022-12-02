---
layout: post
author: "kafkaah"
title: "Comment intégrer du JavaScript dans un post"
date: "2022-12-01 22:34:41 -0000"
categories: ["Programmation"]
tags: ["programmation"]
fichier: "2022-12-01-comment-integrer-du-javascript-dans-un-post.md"
visible: "non"
---

<!-- Cet élément <script> doit être présent et doit avoir l'id = "scriptacular" -->
<script id="scriptacular" type="text/javascript">
  //Ici, on code ce qu'on veut
  function couleur(el, clr){
    console.log("Invoqué avec: " + clr);
    el.style.color = clr
    const p = document.getElementById('para')
    p.style.color = clr
  }
  //Toute fonction doit être attribuée à window de cette manière
  window.couleur = couleur
</script>

<!-- On peut injecter n'importe quel code HTML ici  -->
<div id="box">
  <p id="para">Du texte</p>
  <!-- La fonction "couleur" a été déclarée plus haut  -->
  <!-- "this" représente l'élément HTML lui-même (ici, les boutons. Voir "el" dans la fonction)  -->
  <button onclick="couleur(this, 'blue');">Bleu</button>
  <button onclick="couleur(this, 'red');">Rouge</button>  
<div>
  
<!-- Cet élément <style> doit être présent tel quel à la fin du post  -->
<!-- Il permet d'injecter et de rendre actif le code plus haut dans la page  -->
<style onload="const el = document.getElementById('scriptacular');window.addEventListener('load', () => eval(el.innerHTML));"/>
