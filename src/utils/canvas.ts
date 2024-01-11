import Two from "two.js";

export const createCanvas = (elem: HTMLElement) => {
    var two = new Two({
        fullscreen: true,
        autostart: true
    }).appendTo(elem);

    return two;
};


export const createCircle = (two: Two, x: number, y: number, radius: number) => {
    const circle = two.makeCircle(x, y, radius);
    circle.fill = "orange";
    circle.stroke = "orange";
    circle.linewidth = 5;
    return circle;
}


export const connectFigures = (two: Two, figure1: Two.Shape, figure2: Two.Shape) => {
    const firstFigureTranslation = figure1.translation;
    const secondFigureTranslation = figure2.translation;

    var line = two.makeLine(
        firstFigureTranslation.x,
        firstFigureTranslation.y,
        secondFigureTranslation.x,
        secondFigureTranslation.y
    );

    line.stroke = "orange";
    line.linewidth = 5;
    line.closed = true;

    line.position = new Two.Vector(0, 0);
    return line;
}
