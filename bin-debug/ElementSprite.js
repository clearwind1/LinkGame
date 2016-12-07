/**
 * Created by hardymonkey on 2016/12/7.
 */
var ElementSprite = (function (_super) {
    __extends(ElementSprite, _super);
    function ElementSprite(texture, posx, posy) {
        _super.call(this, texture, posx, posy);
    }
    var d = __define,c=ElementSprite,p=c.prototype;
    p.initpro = function (type) {
        this.type = type;
    };
    return ElementSprite;
}(GameUtil.MyBitmap));
egret.registerClass(ElementSprite,'ElementSprite');
