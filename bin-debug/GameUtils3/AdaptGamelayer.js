/**
 * Created by pior on 16/3/14.
 */
var AdaptGamelayer = (function (_super) {
    __extends(AdaptGamelayer, _super);
    function AdaptGamelayer() {
        _super.call(this);
    }
    var d = __define,c=AdaptGamelayer,p=c.prototype;
    p.initlayer = function (maxheight) {
        this.maxheight = maxheight;
    };
    p.putItme = function (child) {
        this.addChild(child);
    };
    p.adpat = function (bscalex) {
        if (bscalex === void 0) { bscalex = true; }
        var sc = 1;
        //console.log('adh=====',this.$getHeight(),'maxh======',this.maxheight);
        //console.log('adh=====',this.$getWidth(),'maxh======');
        if (this.$getHeight() > this.maxheight) {
            sc = this.maxheight / this.$getHeight();
            if (bscalex) {
                this.scaleX = this.scaleY = sc;
            }
            else {
                this.scaleY = sc;
            }
        }
        //var disw: number = (this.mStageW-this.$getWidth()*this.scaleX)/2;
        //this.x = disw;
    };
    return AdaptGamelayer;
}(GameUtil.BassPanel));
egret.registerClass(AdaptGamelayer,'AdaptGamelayer');
