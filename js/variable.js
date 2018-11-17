// button
var startBtn;
// progress bar
var progressBar ;
var progress;
var bar;
// canvas
var mainCanvas, backCanvas;
var mCtx, bCtx;
var canvasWidth, canvasHeight;
// beads
// beads * 30
var beads = [];
var newBeads = [];
// original beads which need to drop down
var dropBeads = [];
var beadTypes = 6;
// clear
var row = [];
var col = [];
// how many beads each col clear ? 
var clearNum = [0, 0, 0, 0, 0, 0];
var clearFlag = false;
// upper left corner of gird
var startX, startY;
// bottom right corner of gird
var endX, endY;
// size
var gridSize;
var gap;
var dropSize = 5;
// every drop height
var sub;
// which bead clicked
var clickedBead = {
    //always = -1
    type: -1,
    x: 0,
    y: 0
};
var offsetX, offsetY;
// which bead move
var hover = -1;
// flag
var canPlay = false;
var isClick = false;
var isMove = false;
// interval time
var clearT = 300;
var dropT = 15;
// audio
var moveAudSrc;
var comboAud = [];
var comboMaxAudSrc;
var cntAudSrc;
var bgm;
// image
var backImg;
var beadsImg = [];

var combo = 0;