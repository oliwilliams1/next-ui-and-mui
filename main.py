import pygame as pg
from glm import vec2, distance
from math import sin, floor, cos, atan

width = 800
height = 600

pg.init()
screen = pg.display.set_mode((width, height))

def ndcToScreen(vec: vec2) -> vec2:
    return vec2(vec.x * width / 2 + width / 2, vec.y * height / 2 + height / 2)

co1 = vec2(-0.5, -0.5)
co2 = vec2(0.5, 0.5)

c1 = vec2(-0.5, -0.5)
c2 = vec2(0.5, 0.5)
import math

if __name__ == "__main__":
    running = True
    while running:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                running = False
        
        t = pg.time.get_ticks() / 2000
        c1 = vec2(sin(t) / 5 + co1.x, cos(t) / 5 + co1.y)        
        c2 = vec2(sin(t * 1.4 + 4.16) / 5 + co2.x, cos(t * 1.4 + 4.16) / 5 + co2.y)
        oc1 = vec2(c1)
        oc2 = vec2(c2)
        
        mousePos = pg.mouse.get_pos()
        # mouse pos to [-1, 1]
        mousePos = vec2(mousePos[0] / width * 2 - 1, mousePos[1] / height * 2 - 1)
        
        c1tmv = c1 - mousePos
        c2tmv = c2 - mousePos

        c1 = c1 - c1tmv * min(0.05 / distance(c1, mousePos) ** 2, 1)
        c2 = c2 - c2tmv * min(0.05 / distance(c2, mousePos) ** 2, 1)

        screen.fill((0, 0, 0))
        pg.draw.circle(screen, (255, 255, 255), ndcToScreen(c1), 90)
        pg.draw.circle(screen, (255, 255, 255), ndcToScreen(c2), 90)

        pg.draw.circle(screen, (255, 0, 0), ndcToScreen(oc1), 10)
        pg.draw.circle(screen, (0, 0, 255), ndcToScreen(oc2), 10)

        pg.draw.line(screen, (255, 0, 0), ndcToScreen(oc1), ndcToScreen(c1))
        pg.draw.line(screen, (0, 0, 255), ndcToScreen(oc2), ndcToScreen(c2))

        pg.draw.circle(screen, (0, 255, 0), ndcToScreen(mousePos), 10)

        pg.display.flip()

pg.quit()