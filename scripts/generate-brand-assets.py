#!/usr/bin/env python3
"""Generate favicon and OG raster assets for Crimson Technology."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SRC = (
    Path.home()
    / ".cursor/projects/Users-scottsayler-Projects-Crimson-Tech-Redesign/assets"
    / "ChatGPT_Image_Jul_1__2026__11_21_34_AM-3d3ceae6-5184-422f-bd21-8ad16ed34148.png"
)

CRIMSON = (155, 27, 48, 255)
GREY = (139, 145, 153, 255)
WHITE = (255, 255, 255, 255)


def draw_icon(draw: ImageDraw.ImageDraw, size: int, color: tuple[int, int, int, int]) -> None:
    pad = size * 0.18
    bubble = (pad, pad, size - pad, size - pad * 1.35)
    draw.rounded_rectangle(bubble, radius=size * 0.14, outline=color, width=max(1, size // 14))
    tail = [
        (size * 0.38, size - pad * 1.2),
        (size * 0.28, size - pad * 0.45),
        (size * 0.48, size - pad * 0.95),
    ]
    draw.polygon(tail, fill=color)
    y = size * 0.52
    for x in (0.38, 0.5, 0.62):
        r = max(1, size // 22)
        draw.ellipse((size * x - r, y - r, size * x + r, y + r), fill=color)


def icon_image(size: int, bg: tuple | None, icon_color: tuple) -> Image.Image:
    img = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if bg:
        radius = int(size * 0.18)
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=bg)
    draw_icon(draw, size, icon_color)
    return img


def save_og() -> None:
    sheet = Image.open(SRC).convert("RGBA")
    og = sheet.crop((0, 398, 1024, 682)).resize((1200, 630), Image.Resampling.LANCZOS)
    og.save(PUBLIC / "og.png", optimize=True, compress_level=9)


def save_ico(path: Path, images: list[Image.Image]) -> None:
    images[0].save(
        path,
        format="ICO",
        sizes=[(img.width, img.height) for img in images],
        append_images=images[1:],
    )


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    grey_16 = icon_image(16, WHITE, GREY)
    red_32 = icon_image(32, CRIMSON, WHITE)
    apple = icon_image(180, WHITE, GREY)

    grey_16.save(PUBLIC / "favicon-16.png", optimize=True)
    red_32.save(PUBLIC / "favicon-32.png", optimize=True)
    apple.save(PUBLIC / "apple-touch-icon.png", optimize=True)
    save_ico(PUBLIC / "favicon.ico", [red_32, grey_16.resize((16, 16), Image.Resampling.LANCZOS)])
    save_og()

    print("Brand raster assets generated in", PUBLIC)


if __name__ == "__main__":
    main()
