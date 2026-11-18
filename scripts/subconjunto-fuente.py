"""Genera src/assets/inter-zp.woff2: Inter variable reducida a lo que usa el sitio.

- Solo caracteres de español (ASCII + Latin-1) y la puntuación tipográfica usada.
- Eje de peso limitado a 400-850 (los pesos que usa site.css).
Menos bytes en la fuente = LCP más bajo en móvil (ver docs/RENDIMIENTO.md §4).

Uso: python scripts/subconjunto-fuente.py   (requiere: pip install fonttools brotli)
"""
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options
from fontTools.varLib import instancer

ORIGEN = "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"
DESTINO = "src/assets/inter-zp.woff2"
# ASCII, Latin-1, – — ‘ ’ “ ” • … € → − (y el NBSP de los precios, dentro de Latin-1)
UNICODES = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [
    0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x20AC, 0x2192, 0x2212,
]

fuente = TTFont(ORIGEN)
opciones = Options()
opciones.flavor = "woff2"
opciones.layout_features = ["kern", "liga", "calt", "tnum"]
sub = Subsetter(opciones)
sub.populate(unicodes=UNICODES)
sub.subset(fuente)
# Primero el subconjunto y después el recorte del eje (al revés falla con glifos .tf).
fuente = instancer.instantiateVariableFont(fuente, {"wght": (400, 850)})
fuente.flavor = "woff2"
fuente.save(DESTINO)
print("ok", DESTINO)
