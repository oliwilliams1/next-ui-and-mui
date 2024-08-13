import pygame as pg
from glm import vec2
from math import sin, floor, cos
width = 800
height = 600

pg.init()
screen = pg.display.set_mode((width, height))

def ndcToScreen(vec: vec2) -> vec2:
    return vec2(vec.x * width / 2 + width / 2, vec.y * height / 2 + height / 2)

c1 = vec2(-0.5, -0.5)
c2 = vec2(0.5, 0.5)

if __name__ == "__main__":
    running = True
    while running:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                running = False
        
        t = pg.time.get_ticks() / 2000
        c1.x = sin(t) / 5 - 0.5
        c1.y = cos(t) / 5 - 0.5

        c2.x = -sin(t * 1.4 + 4.134) / 5 + 0.5
        c2.y = -cos(t * 1.4 + 4.134) / 5 + 0.5
        
        screen.fill((0, 0, 0))
        pg.draw.circle(screen, (255, 255, 255), ndcToScreen(c1), 90)
        pg.draw.circle(screen, (255, 255, 255), ndcToScreen(c2), 90)
        pg.display.flip()

pg.quit()