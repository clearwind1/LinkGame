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
        this.showgamescene();
    };
    p.showgamescene = function () {
        var bg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xa0c0a3);
        this.addChild(bg);
        for (var i = 0; i < GameUtil.GameConfig.MAXCOL; i++) {
            for (var j = 0; j < GameUtil.GameConfig.MAXROW; j++) {
                var posx = (this.mStageW / 2 - 200) + 100 * i;
                var posy = 400 + 100 * j;
                var pic = new GameUtil.MyBitmap(RES.getRes('type0_png'), posx, posy);
                this.addChild(pic);
            }
        }
    };
    return GameScene;
}(GameUtil.BassPanel));
egret.registerClass(GameScene,'GameScene');
