---
layout: post
author: "kafkaah"
title: "Au hasard Balthazar"
date: "2022-12-01 20:14:24 -0000"
categories: ["Mathématiques", "Question/réponse"]
tags: ["mathématiques", "question/réponse", "expérience", "programmation"]
fichier: "2022-12-01-au-hasard-balthazar.md"
visible: "oui"
---

<script id="scriptaculous" type="text/javascript"> 
  
  window.addEventListener("load", (event) => {
    
    const changeColor = function(newColor) {
    var elem = document.getElementById('para');
    elem.style.color = newColor;
  }
    window.changeColor = changeColor
  });
</script>

<script id="scriptacular" type="text/javascript">
  window.couleur = function(clr){
    console.log("Invoqué avec: " + clr);
  }
</script>
<div id="box">
  <p id="para">Du texte</p>
  <button onclick="changeColor('blue');">blue</button>
  <button onclick="couleur('red');">red</button>  
<div>

<style onload="var el = document.getElementById('scriptaculous');document.body.appendChild(el);eval(el.innerHTML);"/>
<style onload="const el = document.getElementById('scriptacular');document.body.appendChild(el);window.addEventListener('load', () => eval(el.innerHTML));"/>
