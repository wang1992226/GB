// src/utils/CanvasClass.js

class Canvas {
    constructor(canvasElementId) {
        this.canvas = document.getElementById(canvasElementId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id ${canvasElementId} not found.`);
        }
        this.ctx = this.canvas.getContext('2d');
    }



    // 清除画布
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    CanvasResize(width, height) {
        // console.log('CanvasResize', width, height);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.canvas.width = width;
        this.canvas.height = height;
        this.clear();
    }
    setlineWidth(lineWidth) {
        console.log('setlineWidth', lineWidth);
        this.ctx.lineWidth = lineWidth;
    }
    setstrokeStyle(color) {
        this.ctx.strokeStyle = color;
    }

    drawLine(startX, startY, endX, endY, color, lineWidth) {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }
    drawLinestart(startX, startY, color, lineWidth){
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
    }
    drawLineTo(endX, endY){
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
    }


    drawCircle(x, y, radius, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    drawRect(x, y, width, height, color) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
    }
    drawArrow(startX, startY, endX, endY,color){
        // console.log('startX, startY, endX, endY');
        const CONST = { edgeLen: 50, angle: 40 };
        const dynArrowSize = () => {
            const x = endX - startX;
            const y = endY - startY;
            const length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            if (length < 250) {
                CONST.edgeLen /= 2;
                CONST.angle /= 2;
            } else if (length < 500) {
                CONST.edgeLen *= length / 500;
                CONST.angle *= length / 500;
            }
        };

        const getRadian = () => {
            const angle = Math.atan2(endY - startY, endX - startX) / Math.PI * 180;
            dynArrowSize();
            return angle;
        };

        const arrowCoord = (angle) => {
            const polygonVertex = [
                startX, startY,
                0, 0,
                0, 0,
                endX, endY,
                0, 0,
                0, 0
            ];
            polygonVertex[8] = endX - CONST.edgeLen * Math.cos(Math.PI / 180 * (angle + CONST.angle));
            polygonVertex[9] = endY - CONST.edgeLen * Math.sin(Math.PI / 180 * (angle + CONST.angle));
            polygonVertex[4] = endX - CONST.edgeLen * Math.cos(Math.PI / 180 * (angle - CONST.angle));
            polygonVertex[5] = endY - CONST.edgeLen * Math.sin(Math.PI / 180 * (angle - CONST.angle));

            const midpoint = {
                x: (polygonVertex[4] + polygonVertex[8]) / 2,
                y: (polygonVertex[5] + polygonVertex[9]) / 2
            };
            polygonVertex[2] = (polygonVertex[4] + midpoint.x) / 2;
            polygonVertex[3] = (polygonVertex[5] + midpoint.y) / 2;
            polygonVertex[10] = (polygonVertex[8] + midpoint.x) / 2;
            polygonVertex[11] = (polygonVertex[9] + midpoint.y) / 2;

            return polygonVertex;
        };

        const radian  = getRadian();
        const polygonVertex = arrowCoord(radian);
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(polygonVertex[0], polygonVertex[1]);
        this.ctx.lineTo(polygonVertex[2], polygonVertex[3]);
        this.ctx.lineTo(polygonVertex[4], polygonVertex[5]);
        this.ctx.lineTo(polygonVertex[6], polygonVertex[7]);
        this.ctx.lineTo(polygonVertex[8], polygonVertex[9]);
        this.ctx.lineTo(polygonVertex[10], polygonVertex[11]);
        this.ctx.closePath();
        this.ctx.fill();
    }
    drawText(x, y, text, color,fontsize) {
        this.ctx.font = fontsize + 'px Microsoft YaHei';
        this.ctx.fillStyle = color;
        // console.log(text);
        const lines = text.split('\n');
        const lineHeight = fontsize + 5; // 动态计算行高

        lines.forEach((line, index) => {
            this.ctx.fillText(line, x+2 , y + index * lineHeight+fontsize);
        });
    }

    // 其他绘图方法...

    async drawstrokes (strokes)  {
        return new Promise(resolve => {
            this.clear();
            // console.log(strokes);
            // 重新绘制所有已有的笔触
            strokes.forEach(stroke => {
                const scaleX =  this.canvas.width / stroke.canvaswidth;
                const scaleY =  this.canvas.height / stroke.canvasheight;
                const {x, y, w, h} = stroke.data;
                const adjustedX = x * scaleX;
                const adjustedY = y * scaleY;

                this.ctx.lineWidth = stroke.lineWidth;
                this.ctx.strokeStyle = stroke.color;
                if (stroke.type === 'line') {
                    stroke.data.forEach((point, index) => {
                        const adjustedX = point.x * scaleX;
                        const adjustedY = point.y * scaleY;
                        // console.log(adjustedX, adjustedY);
                        this.ctx.lineCap = 'round';
                        this.ctx.lineJoin = 'round';
                        if (index === 0) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(adjustedX, adjustedY);
                        } else {
                            this.ctx.lineTo(adjustedX, adjustedY);
                            this.ctx.stroke();
                        }
                    })
                }
                if (stroke.type === 'text') {
                    const {x, y, text} = stroke.data;
                    const adjustedX = x * scaleX;
                    const adjustedY = y * scaleY;
                    this.drawText(adjustedX, adjustedY, text, stroke.color, stroke.lineWidth*3)
                }
                if (stroke.type === 'circle') {
                    // 根据当前画布的宽高计算坐标
                    this.drawCircle(adjustedX, adjustedY, Math.sqrt((w * scaleX)*(w * scaleX)+(h * scaleY)*(h * scaleY)), stroke.color)
                }
                if (stroke.type === 'rect') {
                    this.drawRect(adjustedX, adjustedY, w * scaleX, h * scaleY, stroke.color)
                }
                if (stroke.type === 'arrow') {
                    this.drawArrow(adjustedX, adjustedY, adjustedX + w * scaleX, adjustedY + h * scaleY, stroke.color);
                }

            });
        resolve();
        });
    };
    updatestroke = (stroke) => {
        // console.log('updatestroke', stroke);
        const scaleX =  this.canvas.width / stroke.canvaswidth;
        const scaleY =  this.canvas.height / stroke.canvasheight;
        const {x, y, w, h} = stroke.data;
        const adjustedX = x * scaleX;
        const adjustedY = y * scaleY;

        this.ctx.lineWidth = stroke.lineWidth;
        this.ctx.strokeStyle = stroke.color;
        if (stroke.type === 'line') {
            stroke.data.forEach((point, index) => {
                const adjustedX = point.x * scaleX;
                const adjustedY = point.y * scaleY;
                // console.log(adjustedX, adjustedY);
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                if (index === 0) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(adjustedX, adjustedY);
                } else {
                    this.ctx.lineTo(adjustedX, adjustedY);
                    this.ctx.stroke();
                }
            })
        }
        if (stroke.type === 'text') {
            const {x, y, text} = stroke.data;
            const adjustedX = x * scaleX;
            const adjustedY = y * scaleY;
            this.drawText(adjustedX, adjustedY, text, stroke.color, stroke.lineWidth*3)
        }
        if (stroke.type === 'circle') {
            // 根据当前画布的宽高计算坐标
            this.drawCircle(adjustedX, adjustedY, Math.sqrt((w * scaleX)*(w * scaleX)+(h * scaleY)*(h * scaleY)), stroke.color)
        }
        if (stroke.type === 'rect') {
            this.drawRect(adjustedX, adjustedY, w * scaleX, h * scaleY, stroke.color)
        }
        if (stroke.type === 'arrow') {
            this.drawArrow(adjustedX, adjustedY, adjustedX + w * scaleX, adjustedY + h * scaleY, stroke.color);
        }
    }

    toDataURL = () => {
        return this.canvas.toDataURL();
    }

}

export default Canvas;