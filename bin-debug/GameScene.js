/**
 * Created by pior on 16/12/7.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        this.bplayEffect = false;
        this._selectSprite = null;
        var tArray = new Array(); //先声明一维
        for (var k = 0; k < 100; k++) {
            tArray[k] = new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for (var j = 0; j < 100; j++) {
                tArray[k][j] = false; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
            }
        }
        this.tilearr = tArray;
        this.showgamescene();
    };
    p.showgamescene = function () {
        var bg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xa0c0a3);
        this.addChild(bg);
        this.elementcontain = new egret.DisplayObjectContainer();
        this.addChild(this.elementcontain);
        this.elementcontain.$setTouchEnabled(true);
        this.elementcontain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchele, this);
        //生成元素
        for (var i = 0; i < GameUtil.GameConfig.MAXCOL * GameUtil.GameConfig.MAXROW; i++) {
            var type = Math.floor(i / 2);
            var posx = (this.mStageW / 2 - 200) + 100 * Math.floor(i / GameUtil.GameConfig.MAXROW);
            var posy = 400 + 100 * (i % GameUtil.GameConfig.MAXROW);
            var pic = new ElementSprite(RES.getRes('type' + type + '_png'), posx, posy);
            pic.initpro(type, Math.floor(i / GameUtil.GameConfig.MAXROW), i % GameUtil.GameConfig.MAXROW);
            //console.log('type=====',Math.floor((i+j*GameUtil.GameConfig.MAXROW)/2));
            this.elementcontain.addChild(pic);
            this.tilearr[pic.posx][pic.posy] = true;
        }
        this.randompos();
    };
    //元素乱序
    p.randompos = function () {
        //console.log('this.elementcontain.numChildren===========',this.elementcontain.numChildren);
        for (var i = 0; i < this.elementcontain.numChildren; i++) {
            var ele = this.elementcontain.getChildAt(i);
            var num = RandomUtils.limitInteger(0, this.elementcontain.numChildren - 1);
            //console.log('num====',num);
            var randele = this.elementcontain.getChildAt(num);
            //console.log('randele=======',randele,'ele======',ele);
            var posx = ele.x;
            var posy = ele.y;
            ele.x = randele.x;
            ele.y = randele.y;
            randele.x = posx;
            randele.y = posy;
        }
    };
    //玩家点击
    p.touchele = function (evt) {
        //if(this.bplayEffect)//是否正在播放效果
        //{
        //    return;
        //}
        var ele = this.getchildby(evt.stageX, evt.stageY);
        if (ele != null) {
            if (this._selectSprite != null) {
                //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                if (this._selectSprite.type != ele.type) {
                    this.eleeffect(this._selectSprite, false);
                    this.eleeffect(ele, false);
                    this._selectSprite = null;
                }
                else {
                    //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                    if (this.judeiscanlink(ele)) {
                        this.eleeffect(ele, true);
                        this.playlinkeffect(ele);
                    }
                    else {
                        this.eleeffect(this._selectSprite, false);
                        this.eleeffect(ele, false);
                        this._selectSprite = null;
                    }
                }
            }
            else {
                this._selectSprite = ele;
                this.eleeffect(ele, true);
            }
        }
    };
    //判断是否可连
    p.judeiscanlink = function (ele) {
        console.log('tilearr=====', this.tilearr[1][0]);
        var bcanlink = false;
        var sourcex, sourcey;
        var tagetx, tagety;
        if (this._selectSprite.posx > ele.posx) {
            sourcex = ele.posx;
            sourcey = ele.posy;
            tagetx = this._selectSprite.posx;
            tagety = this._selectSprite.posy;
        }
        else {
            tagetx = ele.posx;
            tagety = ele.posy;
            sourcex = this._selectSprite.posx;
            sourcey = this._selectSprite.posy;
        }
        if (sourcey == tagety) {
            var isnull = true;
            for (var i = sourcex + 1; i < tagetx; i++) {
                if (this.tilearr[i][sourcey]) {
                    isnull = false;
                    break;
                }
            }
            if (isnull) {
                return true;
            }
            else {
                for (var i = sourcey; i >= -1; i--) {
                    if (this.tilearr[sourcex][i]) { }
                }
            }
        }
        return bcanlink;
    };
    //播放连线效果
    p.playlinkeffect = function (obj) {
        this.tilearr[this._selectSprite.posx][this._selectSprite.posy] = false;
        this.tilearr[obj.posx][obj.posy] = false;
        this.bplayEffect = true;
        var self = this;
        var contain = obj.parent;
        egret.Tween.get(this._selectSprite).to({ scaleX: 0, scaleY: 0 }, 1000);
        egret.Tween.get(obj).to({ scaleX: 0, scaleY: 0 }, 1000).call(function () {
            contain.removeChild(obj);
            contain.removeChild(self._selectSprite);
            self._selectSprite = null;
            self.bplayEffect = false;
        });
    };
    //选中效果
    p.eleeffect = function (obj, bselect) {
        obj.blinked = bselect;
        var sc = 1;
        sc = bselect ? 1.1 : 1;
        obj.$setScaleX(sc);
        obj.$setScaleY(sc);
    };
    //获取元素
    p.getchildby = function (posx, posy) {
        var ele = null;
        for (var i = 0; i < this.elementcontain.numChildren; i++) {
            ele = this.elementcontain.getChildAt(i);
            if (ele.$hitTest(posx, posy) && !ele.blinked) {
                return ele;
            }
        }
        return null;
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
