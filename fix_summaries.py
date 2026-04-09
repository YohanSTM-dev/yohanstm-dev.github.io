# -*- coding: utf-8 -*-
path = r'C:\Users\yohan\yohanstm-dev.github.io\portfolio-new.js'
with open(path, encoding='utf-8') as f:
    txt = f.read()

replacements = [
    (
        "summary: 'Refonte compl\u00e8te du site officiel d\u2019un club de football. Hi\u00e9rarchie \u00e9ditoriale, performances SEO et navigation mobile-first.'",
        "summary: 'Refonte du site officiel d\u2019un club de foot. SEO optimis\u00e9, mobile-first.'"
    ),
    (
        "summary: 'Interface portfolio reproduisant l\u2019exp\u00e9rience macOS \u2014 dock magn\u00e9tique, fen\u00eatres glassmorphism, th\u00e8me clair/sombre et animations GSAP.'",
        "summary: 'Portfolio macOS \u2014 dock magn\u00e9tique, glassmorphism, th\u00e8mes et GSAP.'"
    ),
    (
        "summary: 'Application mobile de suivi fitness & nutrition. Dashboard d\u2019entra\u00eenement, journaux de s\u00e9ances et API REST Python.'",
        "summary: 'App mobile fitness & nutrition. Entra\u00eenements, journaux et API Python.'"
    ),
    (
        "summary: 'Application mobile de gestion d\u2019objectifs. Suivi quotidien, visualisation de progression et rappels intelligents.'",
        "summary: 'App mobile d\u2019objectifs. Suivi quotidien, progression et rappels.'"
    ),
    (
        "summary: 'Encyclop\u00e9die web auto-h\u00e9berg\u00e9e. Cr\u00e9ation, \u00e9dition et recherche d\u2019articles avec gestion de cat\u00e9gories et de tags.'",
        "summary: 'Wiki auto-h\u00e9berg\u00e9. Articles, cat\u00e9gories et recherche en PHP/MySQL.'"
    ),
    (
        "summary: 'Mini application syst\u00e8me compil\u00e9e en WebAssembly. Performance native dans le navigateur, interface minimaliste et exp\u00e9rimentation bas-niveau.'",
        "summary: 'App syst\u00e8me en WebAssembly. Performance native et interface minimaliste.'"
    ),
]

count = 0
for old, new in replacements:
    if old in txt:
        txt = txt.replace(old, new)
        count += 1
        print("OK: " + new[:70])
    else:
        print("NOT FOUND: " + old[:70])

with open(path, 'w', encoding='utf-8') as f:
    f.write(txt)
print("Done: " + str(count) + " replacements")
