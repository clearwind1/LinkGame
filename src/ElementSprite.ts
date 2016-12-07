/**
 * Created by hardymonkey on 2016/12/7.
 */

class ElementSprite extends GameUtil.MyBitmap
{
    public type:number;
    public constructor(texture:egret.Texture,posx:number,posy:number)
    {
        super(texture,posx,posy);
    }

    public initpro(type:number)
    {
        this.type = type;
    }

}