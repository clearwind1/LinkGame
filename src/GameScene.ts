/**
 * Created by pior on 16/12/7.
 */

class GameScene extends GameUtil.BassPanel
{

    private bplayEffect: boolean;
    private _selectSprite: ElementSprite;
    private elementcontain: egret.DisplayObjectContainer;
    private tilearr: boolean[][];

    private createobj: number[][];

    public constructor()
    {
        super();
    }

    public init()
    {
        this.bplayEffect = false;
        this._selectSprite = null;
        var tArray = new Array();   //先声明一维
        for(var k=-1;k<10;k++){ //一维长度为i,i为变量，可以根据实际情况改变
            tArray[k]=new Array(); //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var j=-1;j<10;j++){ //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
                tArray[k][j]=false; //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
            }
        }
        this.tilearr = tArray;

        this.createobj =   [[1,0,2,0,1],
                            [1,0,2,0,1],
                            [1,0,2,0,1],
                            [0,0,0,0,0],
                            [0,0,0,0,0],
                            [0,0,0,0,0],];

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

        //console.log('creaobj======',this.createobj);
        //生成元素
        for(var i:number = 0;i < GameUtil.GameConfig.MAXCOL*GameUtil.GameConfig.MAXROW;i++)
        {
            var posy: number = Math.floor(i/GameUtil.GameConfig.MAXROW);
            var posx: number = i%GameUtil.GameConfig.MAXROW;

            var type: number = this.createobj[posy][posx];
            //console.log('type====',type);
            if(type == 0)
            {
                continue;
            }

            var x: number = (this.mStageW/2-200) + 100*posx;
            var y: number = 400 + 100*posy;
            var pic: ElementSprite = new ElementSprite(RES.getRes('type'+type+'_png'),x,y);
            pic.initpro(type,posx,posy);


            //var type: number = Math.floor(i/2);
            //var posx: number = (this.mStageW/2-200) + 100*Math.floor(i/GameUtil.GameConfig.MAXROW);
            //var posy: number = 400 + 100*(i%GameUtil.GameConfig.MAXROW);
            //var pic: ElementSprite = new ElementSprite(RES.getRes('type'+type+'_png'),posx,posy);
            //pic.initpro(type,Math.floor(i/GameUtil.GameConfig.MAXROW),i%GameUtil.GameConfig.MAXROW);
            this.elementcontain.addChild(pic);
            this.tilearr[pic.posx][pic.posy] = true;
        }

        //this.randompos();

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
    //玩家点击
    private touchele(evt: egret.TouchEvent)
    {
        //if(this.bplayEffect)//是否正在播放效果
        //{
        //    return;
        //}
        var ele: ElementSprite = this.getchildby(evt.stageX,evt.stageY);
        if(ele != null)
        {
            if(this._selectSprite != null)
            {
                //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                if(this._selectSprite.type != ele.type)
                {
                    this.eleeffect(this._selectSprite,false);
                    this.eleeffect(ele,false);
                    this._selectSprite = null;
                }
                else
                {
                    //console.log('selecttype======',this._selectSprite.type,'eletype=======',ele.type);
                    if(this.judeiscanlink(ele))
                    {
                        this.eleeffect(ele,true);
                        this.playlinkeffect(ele);
                    }
                    else
                    {
                        this.eleeffect(this._selectSprite,false);
                        this.eleeffect(ele,false);
                        this._selectSprite = null;
                    }
                }
            }
            else
            {
                this._selectSprite = ele;
                this.eleeffect(ele,true);
            }

        }
    }

    //判断是否可连
    private judeiscanlink(ele:ElementSprite):boolean
    {
        //console.log('tilearr=====',this.tilearr[1][0]);
        var bcanlink: boolean = false;
        var sourcex,sourcey;
        var tagetx,tagety;
        if(this._selectSprite.posx > ele.posx)
        {
            sourcex = ele.posx;
            sourcey = ele.posy;
            tagetx = this._selectSprite.posx;
            tagety = this._selectSprite.posy;
        }
        else
        {
            tagetx = ele.posx;
            tagety = ele.posy;
            sourcex = this._selectSprite.posx;
            sourcey = this._selectSprite.posy;
        }
        if(sourcey == tagety){
            var isnull = true;
            //直线判断
            var curx = this.judeHorizontal(sourcex+1,sourcey,tagetx);
            if(curx != tagetx)
            {
                isnull = false;
            }
            if(isnull){
                return true;
            }else{
                //往上判断
                for(var y:number=sourcey-1;y >= -1;y--)
                {
                    isnull = true;
                    if(!this.tilearr[sourcex][y]){
                        for(var x:number=sourcex+1;x<=tagetx;x++)
                        {
                            if(this.tilearr[x][y]){
                                isnull = false;
                                break;
                            }
                        }
                        if(isnull)
                        {
                            for(var sy:number=y;sy < tagety;sy++)
                            {
                                if(this.tilearr[tagetx][sy])
                                {
                                    isnull = false;
                                    break;
                                }
                            }
                            if(isnull)
                            {
                                return true;
                            }
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                //往上判断结束
                //往下判断
                for(var y:number=sourcey+1;y <= GameUtil.GameConfig.MAXCOL;y++) {
                    isnull = true;
                    if (!this.tilearr[sourcex][y]) {
                        for (var x:number = sourcex + 1; x <= tagetx; x++) {
                            if (this.tilearr[x][y]) {
                                isnull = false;
                                break;
                            }
                        }
                        if (isnull) {
                            for (var sy:number = y; sy < tagety; sy++) {
                                if (this.tilearr[tagetx][sy]) {
                                    isnull = false;
                                    break;
                                }
                            }
                            if (isnull) {
                                return true;
                            }
                        }
                    }else {
                        break;
                    }
                }
                //往下判断结束
            }
        }

        return bcanlink;
    }

    /**
     * 判断竖方向
     * @param sourcex
     * @param sourcey
     * @param tagety
     * @returns {number}
     */
    private judeVertical(sourcex:number,sourcey:number,tagety:number): number
    {
        var curY = tagety;
        if(sourcey > tagety)
        {
            for(var y:number= sourcey;y>tagety;y--)
            {
                if(!this.tilearr[sourcex][y])
                {
                    curY = y;
                    break;
                }
            }
        }
        else
        {
            for(var y:number= sourcey;y<tagety;y++)
            {
                if(!this.tilearr[sourcex][y])
                {
                    curY = y;
                    break;
                }
            }
        }


        return curY;

    }

    /**
     * 判断横方向
     * @param sourcex
     * @param sourcey
     * @param tagetx
     * @returns {number}
     */
    private judeHorizontal(sourcex:number,sourcey:number,tagetx:number): number
    {
        var curX = tagetx;
        for(var x:number= sourcex;x<tagetx;x++)
        {
            //console.log('x====',x,'sourcey=====',sourcey);
            //console.log('tilearr=====',this.tilearr[x][sourcey]);
            if(this.tilearr[x][sourcey])
            {
                curX = x;
                break;
            }
        }

        //console.log('curx====',curX);
        return curX;
    }

    //播放连线效果
    private playlinkeffect(obj:ElementSprite)
    {
        this.tilearr[this._selectSprite.posx][this._selectSprite.posy] = false;
        this.tilearr[obj.posx][obj.posy] = false;
        this.bplayEffect = true;
        var self:any = this;
        var contain = obj.parent;
        var selectsp = this._selectSprite;
        this._selectSprite = null;
        egret.Tween.get(selectsp).to({scaleX:0,scaleY:0},1000);
        egret.Tween.get(obj).to({scaleX:0,scaleY:0},1000).call(function(){
            contain.removeChild(obj);
            contain.removeChild(selectsp);
            //self._selectSprite = null;
            self.bplayEffect = false;
        });
    }
    //选中效果
    private eleeffect(obj:ElementSprite,bselect:boolean)
    {
        obj.blinked = bselect;
        var sc = 1;
        sc = bselect? 1.1:1;
        obj.$setScaleX(sc);
        obj.$setScaleY(sc);
    }
    //获取元素
    private getchildby(posx,posy): ElementSprite
    {
        var ele: ElementSprite = null;
        for(var i:number=0;i < this.elementcontain.numChildren;i++)
        {
            ele = <ElementSprite>this.elementcontain.getChildAt(i);
            if(ele.$hitTest(posx,posy) && !ele.blinked)
            {
                return ele;
            }
        }

        return null;
    }

}