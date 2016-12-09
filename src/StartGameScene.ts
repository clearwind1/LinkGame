/**
 * Created by pior on 16/9/9.
 */
class StartGameScene extends GameUtil.BassPanel
{
    public constructor()
    {
        super();
    }

    public init()
    {
        this.showbg();
    }

    private showbg()
    {
        var bg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('startgamebg_jpg'),0,0);
        bg.width = this.mStageW;
        bg.height = this.mStageH;
        bg.setanchorOff(0,0);
        this.addChild(bg);

        var gametitle: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,300,60);
        gametitle.textColor = 0x53a3e1;
        gametitle.setText('连连看');
        gametitle.$setItalic(true);
        gametitle.$setBold(true);
        gametitle.strokeColor = 0xc6def1;
        gametitle.stroke = 2;
        this.addChild(gametitle);

        var startbtn: GameUtil.Menu = new GameUtil.Menu(this,'startgamebtn_png','startgamebtn_png',this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW/2;
        startbtn.y = 600;
        this.addChild(startbtn);

        //console.log('btny=====',startbtn.y,'stageh=====',this.mStageH);

    }

    public resize()
    {
        //console.log('mstagew====',StageUtils.stageW);
    }

    private startgame()
    {
        console.log('start');
        GameUtil.GameScene.runscene(new GameScene());
    }

}