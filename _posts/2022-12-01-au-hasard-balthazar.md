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


<!-- Cet élément <script> doit être présent et doit avoir l'id = "scriptacular" -->
<script id="scriptacular" type="text/javascript">
  
  //Ici, on code ce qu'on veut
  
  function couleurAuHasard() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
  
  function couleur(el, clr) {
    
    let repeter = 1,
        couleurAppliquee,
        compteur = 0
    
    const p = document.getElementById('citation')
    
    if(clr === 'hasard') {
      repeter = 300
    }
    
    const timer = setInterval(() => {
      const couleurAppliquee = clr === 'hasard' ? couleurAuHasard() : clr
      el.style.color = couleurAppliquee 
      p.style.color = couleurAppliquee
      console.log(`${repeter - compteur}: ${couleurAppliquee}`)
      compteur++
      if(compteur >= repeter) {
        clearInterval(timer)
      }
    }, 200)
    
  }

  //Toute fonction requise directement dans la page
  //doit être attribuée à window de cette manière
  window.couleur = couleur
</script>

<!-- On peut injecter n'importe quel code HTML ici  -->
<div id="box">
  <p id="citation"><strong>Un coup de dés jamais n'abolira le hasard</strong></p>
  <!-- La fonction "couleur" a été déclarée plus haut  -->
  <!-- "this" représente l'élément HTML lui-même (ici, les boutons. Voir "el" dans la fonction)  -->
  <button onclick="couleur(this, 'blue');">Bleu</button>
  <button onclick="couleur(this, 'red');">Rouge</button>
  <button onclick="couleur(this, 'hasard');">Hasard</button>
<div>
  
<!-- Cet élément <style> doit être présent tel quel à la fin du post  -->
<!-- Il permet d'injecter et de rendre actif le code plus haut dans la page  -->
<style onload="window.addEventListener('load', () => eval(document.getElementById('scriptacular').innerHTML));"/>
