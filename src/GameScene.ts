/**
 * Created by pior on 16/12/7.
 */

class GameScene extends GameUtil.BassPanel
{

    private _selectSprite: ElementSprite;
    private elementcontain: egret.DisplayObjectContainer;

    public constructor()
    {
        super();
    }

    public init()
    {
        this._selectSprite = null;
        this.showgamescene();
    }

    private showgamescene()
    {
        var bg:egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0xa0c0a3);
        this.addChild(bg);

        this.elementcontain = new egret.DisplayObjectContainer();
        this.addChild(this.elementcontain);
        this.elementcontain.$setTouchEnabled(true);
        this.elementcontain.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchele,this);

        for(var i:number = 0;i < GameUtil.GameConfig.MAXCOL;i++)
        {
            for(var j:number=0;j < GameUtil.GameConfig.MAXROW;j++)
            {
                var posx: number = (this.mStageW/2-200) + 100*i;
                var posy: number = 400 + 100*j;
                var pic: ElementSprite = new ElementSprite(RES.getRes('type0_png'),posx,posy);
                pic.initpro(0);
                this.elementcontain.addChild(pic);
            }
        }


    }

    private touchele(evt: egret.TouchEvent)
    {
        var ele: ElementSprite = this.getchildby(evt.stageX,evt.stageY);
        ele.$setScaleX(1.1);
        ele.$setScaleY(1.1);
    }

    private getchildby(posx,posy): ElementSprite
    {
        var ele: ElementSprite = null;
        for(var i:number=0;i < this.elementcontain.numChildren;i++)
        {
            ele = <ElementSprite>this.elementcontain.getChildAt(i);
            if(ele.$hitTest(posx,posy))
            {
                return ele;
            }
        }

        return null;
    }

}