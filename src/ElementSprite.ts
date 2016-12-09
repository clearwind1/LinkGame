/**
 * Created by hardymonkey on 2016/12/7.
 */

class ElementSprite extends GameUtil.MyBitmap
{
    public type:number;
    public blinked: boolean = false;
    public posx:number;
    public posy:number;
    public constructor(texture:egret.Texture,posx:number,posy:number)
    {
        super(texture,posx,posy);
    }

    public initpro(type:number,posx:number,posy:number)
    {
        this.type = type;
        this.setpos(posx,posy);
    }

    public setpos(x,y)
    {
        this.posx = x;
        this.posy = y;
    }
}