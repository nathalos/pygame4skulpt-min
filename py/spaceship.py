import pygame as pg, random
pg.init()

pg.key.set_repeat(50, 25)

pg.display.set_caption("setanje imga")

(w, h) = (1280, 720)
scr = pg.display.set_mode((w, h))

img = pg.image.load('./spaceship.png')
img_w = img.get_width()
img_h = img.get_height()

# coords for centre of screen
(x, y) = (w / 2, h / 2)
(dx, dy) = (10, 10)

key2move = {pg.K_LEFT: (-dx, 0),
           pg.K_RIGHT: (dx, 0),
           pg.K_DOWN: (0, dy),
           pg.K_UP: (0, -dy)}

refresh = True
quit = False
while not quit:
    if refresh:
       scr.fill(pg.Color("black"))
       scr.blit(img, (x - img_w / 2, y - img_h / 2))
       pg.display.update()
       refresh = False

    ev = pg.event.wait()
    if ev.type == pg.QUIT:
        quit = True
    if ev.type == pg.KEYDOWN:
        if ev.key in key2move:
           (DX, DY) = key2move[ev.key]
           x += DX
           y += DY
           refresh = True

pg.quit()