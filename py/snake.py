import pygame as pg
from random import randint
import skulptcookies as cookies

def place_apple():
    a = (randint(0, w - 1), randint(0, h - 1))
    while a in snake:
        a = (randint(0, w - 1), randint(0, h - 1))
    return a

def check_collisions():
    head = snake[-1]
    for i in range(len(snake) - 1):
        if head == snake[i]:
            return 2
    if head[0] >= w or head[0] < 0:
        return 3
    if head[1] >= h or head[1] < 0:
        return 3
    if head == apple:
        return 1
    return 0

def display_text(text, font, colour, pos):
    ttl = font.render(text, False, colour)
    (x,y) = pos
    disp.blit(ttl, (x-ttl.get_width()/2, y-ttl.get_height()/2))

def start_game():
    global gamestate, score, snake, direction, apple
    gamestate = GS_RUN
    score = 0
    snake = [(7, 3), (7, 4)]
    direction = 0
    apple = place_apple()
    
pg.init()
print("Pygame initialized. Skulptcookies version: "+cookies.ver)

GS_INTRO    = 0
GS_RUN      = 1
GS_GAMEOVER = 2
GS_IDLE     = 3
COLOR_WHITE = pg.Color("white")
COLOR_RED = pg.Color("red")
COLOR_GREEN = pg.Color("green")
COLOR_BLUE = pg.Color("blue")

highscore = cookies.get("score")
if (highscore == None):
    cookies.set("score",0)
    highscore = 0
else:
    highscore = int(highscore)

side = 40
w = 32
h = 18
disp = pg.display.set_mode((w * side, h * side))

dirs = [pg.K_RIGHT, pg.K_DOWN, pg.K_LEFT, pg.K_UP]
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]

clock = pg.time.Clock()
title_font = pg.font.SysFont('monospace', 36, True)
text_font = pg.font.SysFont('monospace', 24, True)

gamestate = GS_INTRO

while True:
    clock.tick(8)
    for e in pg.event.get():
        if e.type == pg.KEYDOWN:
            if e.key == pg.K_SPACE:
                start_game()
            else:
                for i in range(4):
                    if e.key == dirs[i] and direction != (i + 2) % 4:
                        direction = i
    if gamestate == GS_INTRO:
        disp.fill(pg.Color("black"))
        display_text("S N A K E",title_font,COLOR_WHITE, (640,300))
        display_text("High Score: "+str(highscore), text_font, COLOR_GREEN, (640, 420))
        display_text("Press SPACE to play", text_font, COLOR_WHITE, (640, 600))
        pg.display.update()
        gamestate = GS_IDLE
    if gamestate == GS_GAMEOVER:
        disp.fill(pg.Color("black"))
        display_text("Game over!",title_font,COLOR_RED, (640,300))
        display_text("Your Score: "+str(score), text_font, COLOR_WHITE, (640,360))
        display_text("High Score: "+str(highscore), text_font, COLOR_GREEN, (640, 420))
        display_text("Press SPACE to play again", text_font, COLOR_WHITE, (640, 600))
        pg.display.update()
        gamestate = GS_IDLE
    if gamestate == GS_IDLE:
        continue
    if gamestate == GS_RUN:
        snake.append((snake[-1][0] + dx[direction], snake[-1][1] + dy[direction]))
        coll = check_collisions()
        if coll >= 2:
            gamestate = GS_GAMEOVER
        elif coll == 1:
            apple = place_apple()
            score += 1
            if score > highscore:
                highscore = score
                cookies.set("score",highscore)
        elif coll == 0:
            snake.pop(0)
        disp.fill(pg.Color("black"))
        for i in range(len(snake)):
            pg.draw.rect(disp, pg.Color("green"), pg.Rect(snake[i][0] * side, snake[i][1] * side, side, side))
        pg.draw.rect(disp, pg.Color("red"), pg.Rect(apple[0] * side, apple[1] * side, side, side))

        display_text("Your Score: "+str(score)+" High Score: "+str(highscore), text_font, COLOR_WHITE, (640,30))
        pg.display.update()
    