/**
 * Created by hardymonkey on 2016/12/7.
 */
var ElementSprite = (function (_super) {
    __extends(ElementSprite, _super);
    function ElementSprite(texture, posx, posy) {
        _super.call(this, texture, posx, posy);
        this.blinked = false;
    }
    var d = __define,c=ElementSprite,p=c.prototype;
    p.initpro = function (type, posx, posy) {
        this.type = type;
        this.setpos(posx, posy);
    };
    p.setpos = function (x, y) {
        this.posx = x;
        this.posy = y;
    };
    return ElementSprite;
}(GameUtil.MyBitmap));
egret.registerClass(ElementSprite,'ElementSprite');
