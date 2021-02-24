var game = {
    view: {
        canvas: {
            black: null,
            start: null,
            back: null,
            char: null,
            backParticle: null,
            top: null,
            width: 0,
            height: 0
        },
        ctx: {
            s: null,
            b: null,
            c: null,
            bp: null,
            t: null,
        },
        beadsGroup: null,
        boomImgGroups: [],
        size: {
            grid: 0,
            halfGrid: 0,
            gap: 0,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            sub: 0,
            drop: 5,
            x: {
                offset: 0
            },
            y: {
                offset: 0
            },
            z: {
                click: 150,
                normal: 100
            }
        },
        ui: {
            img: {
                load: null,
                aud: null
            },
            text: {
                div: null
            },
            btn: {
                cheatSetting: null,
                cheat: null,
                aud: null
            },
            slider: null
        },
        draw: {
            start: {
                open: function () { },
                close: function () { }
            },
            main: {
                open: function () { },
                back: {
                    grid: function () { },
                    miku:{
                        set: function(){},
                        redraw: function(){}
                    },
                    bar: {
                        redraw: function () { },
                        clear: function () { }
                    }
                }
            }
        }
    },
    bead: {
        cur: [],// 30 
        new: [],
        drop: [],
        clear: {
            row: [],
            col: [],
            clearNum: [0, 0, 0, 0, 0, 0]
        },
        clicked: {
            type: -1,
            x: 0,
            y: 0
        },
        transparent: null,
        hover: -1,
        type: 6,
        init: function () { },
        create: function () { },
        selType: function () { },
        draw: {
            transparent: function () { },
            drop: function () { },
            new: function () { },
            move: function () { },
            up: function () { },
            clear: function () { },
            boom: function () { }
        }
    },
    status: {
        is_load: false,
        is_start: false,
        can_play: false,
        is_click: false,
        is_move: false,
        is_clear: false,
        music: false,
        combo: 0,
        enableEffect: true
    },
    time: {
        clear: 300,
        drop: 20,
        boom: 10
    },
    res: {
        aud: {
            dic: {},
            src_dic: {}
        },
        img: {
            dic: {}
        },
        load: function () { }
    },
    particle: {
        build: function () { },
        update: function () { },
        draw: function () { },
        add: {
            move: function () { },
            click: function () { },
            back: function () { }
        }
    },
    start: function () { },
    ruleStart: function () { },
    loop: {
        start: function () { },
        newWork: function () { },
        doSth: []// func
    }
}


var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

