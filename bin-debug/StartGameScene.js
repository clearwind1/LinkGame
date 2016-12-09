/**
 * Created by pior on 16/9/9.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
    }
    var d = __define,c=StartGameScene,p=c.prototype;
    p.init = function () {
        this.showbg();
    };
    p.showbg = function () {
        var bg = new GameUtil.MyBitmap(RES.getRes('startgamebg_jpg'), 0, 0);
        bg.width = this.mStageW;
        bg.height = this.mStageH;
        bg.setanchorOff(0, 0);
        this.addChild(bg);
        var gametitle = new GameUtil.MyTextField(this.mStageW / 2, 300, 60);
        gametitle.textColor = 0x53a3e1;
        gametitle.setText('连连看');
        gametitle.$setItalic(true);
        gametitle.$setBold(true);
        gametitle.strokeColor = 0xc6def1;
        gametitle.stroke = 2;
        this.addChild(gametitle);
        var startbtn = new GameUtil.Menu(this, 'startgamebtn_png', 'startgamebtn_png', this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW / 2;
        startbtn.y = 600;
        this.addChild(startbtn);
        //console.log('btny=====',startbtn.y,'stageh=====',this.mStageH);
    };
    p.resize = function () {
        //console.log('mstagew====',StageUtils.stageW);
    };
    p.startgame = function () {
        console.log('start');
        GameUtil.GameScene.runscene(new GameScene());
    };
    return StartGameScene;
}(GameUtil.BassPanel));
egret.registerClass(StartGameScene,'StartGameScene');
