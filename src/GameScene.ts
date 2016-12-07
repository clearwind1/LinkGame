/**
 * Created by pior on 16/12/7.
 */

class GameScene extends GameUtil.BassPanel
{
    public constructor()
    {
        super();
    }

    public init()
    {
        this.showgamescene();
    }

    private showgamescene()
    {
        var bg:egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0xa0c0a3);
        this.addChild(bg);

        for(var i:number = 0;i < GameUtil.GameConfig.MAXCOL;i++)
        {
            for(var j:number=0;j < GameUtil.GameConfig.MAXROW;j++)
            {
                var posx: number = (this.mStageW/2-200) + 100*i;
                var posy: number = 400 + 100*j;
                var pic: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('type0_png'),posx,posy);
                this.addChild(pic);
            }
        }


    }

}