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
        this._selectSprite = null;
        this.showgamescene();
    };
    p.showgamescene = function () {
        var bg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xa0c0a3);
        this.addChild(bg);
        this.elementcontain = new egret.DisplayObjectContainer();
        this.addChild(this.elementcontain);
        this.elementcontain.$setTouchEnabled(true);
        this.elementcontain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchele, this);
        for (var i = 0; i < GameUtil.GameConfig.MAXCOL; i++) {
            for (var j = 0; j < GameUtil.GameConfig.MAXROW; j++) {
                var posx = (this.mStageW / 2 - 200) + 100 * i;
                var posy = 400 + 100 * j;
                var pic = new ElementSprite(RES.getRes('type0_png'), posx, posy);
                pic.initpro(0);
                this.elementcontain.addChild(pic);
            }
        }
    };
    p.touchele = function (evt) {
        var ele = this.getchildby(evt.stageX, evt.stageY);
        ele.$setScaleX(1.1);
        ele.$setScaleY(1.1);
    };
    p.getchildby = function (posx, posy) {
        var ele = null;
        for (var i = 0; i < this.elementcontain.numChildren; i++) {
            ele = this.elementcontain.getChildAt(i);
            if (ele.$hitTest(posx, posy)) {
                return ele;
            }
        }
        return null;
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
