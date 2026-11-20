#!/usr/bin/env python3
"""Analiza un CSV sencillo de ventas usando únicamente la biblioteca estándar."""
import csv
from collections import defaultdict
from pathlib import Path

ARCHIVO = Path(__file__).with_name("ventas_demo.csv")

def analizar_ventas(ruta):
    total_general = 0.0
    cantidad_registros = 0
    unidades_totales = 0
    ventas_por_producto = defaultdict(float)

    with ruta.open("r", encoding="utf-8", newline="") as archivo:
        lector = csv.DictReader(archivo)
        for fila in lector:
            try:
                unidades = int(fila["unidades"])
                valor_unitario = float(fila["valor_unitario"])
            except (KeyError, TypeError, ValueError):
                continue
            if unidades <= 0 or valor_unitario < 0:
                continue
            subtotal = unidades * valor_unitario
            total_general += subtotal
            unidades_totales += unidades
            cantidad_registros += 1
            ventas_por_producto[fila["producto"]] += subtotal

    promedio = total_general / cantidad_registros if cantidad_registros else 0
    producto_destacado = max(ventas_por_producto, key=ventas_por_producto.get) if ventas_por_producto else "Sin datos"
    return cantidad_registros, unidades_totales, total_general, promedio, producto_destacado

def main():
    registros, unidades, total, promedio, destacado = analizar_ventas(ARCHIVO)
    print("RESUMEN DE VENTAS — DATOS FICTICIOS")
    print(f"Registros analizados: {registros}")
    print(f"Unidades vendidas: {unidades}")
    print(f"Ventas acumuladas: ${total:,.0f}")
    print(f"Promedio por registro: ${promedio:,.0f}")
    print(f"Producto destacado: {destacado}")

if __name__ == "__main__":
    main()
