/**
 * Created by pior on 16/12/7.
 */

class GameScene extends GameUtil.BassPanel
{

    private bplayEffect: boolean;
    private _selectSprite: ElementSprite;
    private elementcontain: egret.DisplayObjectContainer;

    public constructor()
    {
        super();
    }

    public init()
    {
        this.bplayEffect = false;
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

        //生成元素
        for(var i:number = 0;i < GameUtil.GameConfig.MAXCOL;i++)
        {
            for(var j:number=0;j < GameUtil.GameConfig.MAXROW;j++)
            {
                var type: number = Math.floor((i+j*GameUtil.GameConfig.MAXCOL)/2);
                var posx: number = (this.mStageW/2-200) + 100*i;
                var posy: number = 400 + 100*j;
                var pic: ElementSprite = new ElementSprite(RES.getRes('type'+type+'_png'),posx,posy);
                pic.initpro(type);
                //console.log('type=====',Math.floor((i+j*GameUtil.GameConfig.MAXROW)/2));
                this.elementcontain.addChild(pic);
            }
        }

        this.randompos();

    }
    //元素乱序
    private randompos()
    {
        //console.log('this.elementcontain.numChildren===========',this.elementcontain.numChildren);
        for(var i:number=0;i < this.elementcontain.numChildren;i++)
        {
            var ele = this.elementcontain.getChildAt(i);
            var num = RandomUtils.limitInteger(0,this.elementcontain.numChildren-1);
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
    }

    private touchele(evt: egret.TouchEvent)
    {
        if(this.bplayEffect)
        {
            return;
        }
        var ele: ElementSprite = this.getchildby(evt.stageX,evt.stageY);
        if(ele != null)
        {
            if(this._selectSprite != null)
            {
                //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                if(this._selectSprite.hashCode == ele.hashCode || this._selectSprite.type != ele.type)
                {
                    this.eleeffect(this._selectSprite,false);
                    this.eleeffect(ele,false);
                    this._selectSprite = null;
                }
                else
                {
                    //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                    this.eleeffect(ele,true);
                    this.playlinkeffect(ele);
                }
            }
            else
            {
                this._selectSprite = ele;
                this.eleeffect(ele,true);
            }

        }
    }

    private playlinkeffect(obj:any)
    {
        this.bplayEffect = true;
        var self:any = this;
        var contain = obj.parent;
        egret.Tween.get(this._selectSprite).to({scaleX:0,scaleY:0},1000);
        egret.Tween.get(obj).to({scaleX:0,scaleY:0},1000).call(function(){
            contain.removeChild(obj);
            contain.removeChild(self._selectSprite);
            self._selectSprite = null;
            self.bplayEffect = false;
        });
    }

    private eleeffect(obj,bselect:boolean)
    {
        var sc = 1;
        sc = bselect? 1.1:1;
        obj.$setScaleX(sc);
        obj.$setScaleY(sc);
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