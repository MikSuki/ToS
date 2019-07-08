// ----------html element-----------
// load Image
var loadImg;
// div
var divText;
// audio Button
var audBtn;
var audImg;
// cheat
var cheatSettingBtn;
var cheatBtn;
// canvas
var beadsGroup
var blackCanvas, startCanvas, backCanvas, backParticleCanvas, topCanvas;
var sCtx, mCtx, bCtx, bpCtx, tCtx;
var canvasWidth, canvasHeight;



// beads
// beads * 30
var beads = [];
var newBeads = [];
// original beads which need to drop down
var dropBeads = [];
var beadTypes = 6;
const clickZ = 150
const normalZ = 100
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
var halfGridSize;
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
var transparentBead;
var offsetX, offsetY;
// which bead move
var hover = -1;
// flag
var isLoad = false;
var gameStart = false;
var canPlay = false;
var isClick = false;
var isMove = false;
var music = false;
// interval time
var clearT = 300;
var dropT = 20;
const boomT = 10
// audio
var audioDic = {};
var audSrcDic = {};
// image
var imgDic = {};
var beadImgsSrc = [];
var c;

var combo = 0;