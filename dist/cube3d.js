/***
 *       ______      __        _____ ____
 *      / ____/_  __/ /_  ___ |__  // __ \
 *     / /   / / / / __ \/ _ \ /_ </ / / /
 *    / /___/ /_/ / /_/ /  __/__/ / /_/ /
 *    \____/\__,_/_.___/\___/____/_____/
 *
 *   Add pseudo 3d elements to HTML without any 3D framework or canvas library
 *   Copyright: shezw.com 2021
 *   Author	  : Sprite
 *   Email	  : hello@shezw.com
 */
"use strict";

var C3dThreeDAnimates = {

};



/**
 * One plate of Cube3d
 * @param Direction {int} 0-5
 * @param RGBAColor {[int,int,int,float]}
 * @param contrast {int} 0-10
 */
function C3dSide(Direction, RGBAColor, contrast ){

    this.d  = Direction;
    this.bg = RGBAColor;
    this.contrast = contrast;

    this.vd = VD('<div></div>');
}

/**
 *
 * @param W
 * @param H
 * @param Ex
 * @returns {this}
 */
C3dSide.prototype.setSize = function( W,H, Ex ){
    this.w = W;
    this.h = H;
    this.e = Ex;
    return this;
}

/**
 * Set color to plate
 * @param r {int}
 * @param g {int}
 * @param b {int}
 * @param a {float}
 * @returns {this}
 */
C3dSide.prototype.setColor = function(r, g, b, a ){
    this.bg = [r,g,b,a];
    return this;
}
/**
 * Set an image to plate
 * @param imageVdom {vdom}
 * @returns {this}
 */
C3dSide.prototype.setImage = function( imageVdom ) {
    this.image = true;
    if ( this.vd.find('img') ){
        this.vd.find('img').remove();
    }
    this.vd.append(imageVdom);
    return this;
}

/**
 * Set the url of image
 * @param imageUrl {string} URL
 * @returns {this}
 */
C3dSide.prototype.setImageUrl = function( imageUrl ){
    if (!this.image){
        this.setImage(vdom('<img alt="" src="'+imageUrl+'"/>'));
    }else{
        this.vd.find('img').attr('src',imageUrl);
    }
    return this;
}

/**
 *
 * @returns {C3dSide}
 */
C3dSide.prototype.removeImage = function(){
    if (this.image){
        this.vd.find('img').remove();
    }
    this.image = false;
    return this;
}

C3dSide.prototype.rend = function () {

    var styles = {
        position:"absolute"
    };

    if( this.bg ){
        var colorOffset = 0;
        switch (this.d) {
            case 0: colorOffset = 5*this.contrast; break;
            case 5: break;
            default: colorOffset = this.d * this.contrast; break;
        }
        styles.background = "rgba(" + (this.bg[0]-colorOffset) + "," + (this.bg[1]-colorOffset) + ","+ (this.bg[2]-colorOffset) + "," + this.bg[3] + ")";
    }

    styles.width = this.w + "px";
    styles.height = this.h + "px";

    switch (this.d) {

        case 0:
            styles.transform = "translateX(0px) translateZ(" + (this.e/2) + "px)";
            break; // translateZ("+(z/2)+"px)

        case 1:
            styles.transform =  "rotateZ(-90deg) rotateX(90deg) " +
                                "translateX("+((this.h-this.w)/2)+"px) translateZ(" + (this.w/2) + "px)";
            break; // translateX("+((z-y)/2)+"px) translateZ("+(y/2)+"px)

        case 2:
            styles.transform =  "rotateZ(0deg)   rotateX(90deg) " +
                                "translateX(0px) translateZ(" + (this.h/2) + "px)";
            break; // translateX(0px) translateZ("+(z/2)+"px)

        case 3:
            styles.transform =  "rotateZ(180deg) rotateX(90deg) " +
                                "translateX(0px) translateZ(" + (this.e-(this.h/2)) + "px)";
            break; // translateX(0px) translateZ("+(y-(z/2))+"px)
        case 4:
            styles.transform =  "rotateZ(90deg) rotateX(90deg) " +
                                "translateX("+(-(this.h-this.w)/2)+"px) translateZ(" + (this.e-(this.w/2)) + "px)";
            console.log(styles.transform);
            break; // translateX(-"+((z-y)/2)+"px) translateZ("+(x-(y/2))+"px)
        case 5:
            styles.transform =  "rotateX(180deg) " +
                                "translateZ(" + (this.e/2) + "px)";
            break; // translateZ( "+(z/2)+"px )
    }

    this.vd.styles(styles);
}


function C3dNode( X,Y,Z ){

    /** Size **/
    this.X = X;
    this.Y = Y;
    this.Z = Z;

    this.transform = {

        /** Translate **/
        translateX : 0,
        translateY : 0,
        translateZ : 0,

        /** Scale **/
        scaleX : 1,
        scaleY : 1,
        scaleZ : 1,

        /** Rotation **/
        rotateX : -120,
        rotateY : 0,
        rotateZ : 45
    }

    this.transition = {

        time : 375,
        curve : 'ease-out'
    };

    this.container = VD('<div class="Cube3dContainer"></div>');
    this.cube = VD('<div class="Cube3dCube"></div>');

    this.container.append(this.cube);
    this.rend();
}


C3dNode.prototype.move = function(x,y,z,time,curve) {

    return this.moveTo(this.transform.translateX + (x||0),this.transform.translateY + (y||0),this.transform.translateZ + (z||0), time, curve );
}


C3dNode.prototype.moveTo = function(x,y,z,time,curve){

    this.transition.time  = time || 375;
    this.transition.curve = curve || 'ease-out';

    typeof x =='number' && ( this.transform.translateX = x );
    typeof y =='number' && ( this.transform.translateY = y );
    typeof z =='number' && ( this.transform.translateZ = z );

    return this.rend();
};


C3dNode.prototype.rotate = function(x,y,z,time,curve) {

    return this.rotateTo(this.transform.rotateX + (x||0),this.transform.rotateY + (y||0),this.transform.rotateZ + (z||0), time, curve );
}

C3dNode.prototype.rotateTo = function(x,y,z,time,curve){

    this.transition.time  = time || 375;
    this.transition.curve = curve || 'ease-out';

    typeof x =='number' && ( this.transform.rotateX = x );
    typeof y =='number' && ( this.transform.rotateY = y );
    typeof z =='number' && ( this.transform.rotateZ = z );

    return this.rend();
};

C3dNode.prototype.scale = function(x,y,z,time,curve){

    return this.scaleTo( this.transform.scaleX * (x||1),this.transform.scaleY * (y||1),this.transform.scaleZ * (z||1), time, curve );
};

C3dNode.prototype.scaleTo = function(x,y,z,time,curve){

    this.transition.time  = time || 375;
    this.transition.curve = curve || 'ease-out';

    typeof x =='number' && ( this.transform.scaleX = x );
    typeof y =='number' && ( this.transform.scaleY = y );
    typeof z =='number' && ( this.transform.scaleZ = z );

    return this.rend();
}

C3dNode.prototype.transform = function(translate,rotate,scale,time,curve){

    this.transition.time  = time || 375;
    this.transition.curve = curve || 'ease-out';

    translate && typeof translate.x =='number' && ( this.transform.translateX += translate.x );
    translate && typeof translate.y =='number' && ( this.transform.translateY += translate.y );
    translate && typeof translate.z =='number' && ( this.transform.translateZ += translate.z );
    rotate    && typeof rotate.x    =='number' && ( this.transform.rotateX    += rotate.x );
    rotate    && typeof rotate.y    =='number' && ( this.transform.rotateY    += rotate.y );
    rotate    && typeof rotate.z    =='number' && ( this.transform.rotateZ    += rotate.z );
    scale     && typeof scale.x     =='number' && ( this.transform.scaleX     *= scale.x );
    scale     && typeof scale.y     =='number' && ( this.transform.scaleY     *= scale.y );
    scale     && typeof scale.z     =='number' && ( this.transform.scaleZ     *= scale.z );

    return this.rend();
};

C3dNode.prototype.rend = function(){

    var styles = {
        transition: "transform "+(this.transition.time)+"ms "+(this.transition.curve),
        transform: "rotateX("+ this.transform.rotateX +"deg) rotateY("+ this.transform.rotateY +"deg) rotateZ("+ this.transform.rotateZ +"deg)"
    };

    if( this.transform.translateX !== 0 || this.transform.translateY !== 0 || this.transform.translateZ !== 0 ){
        styles.transform += " translateX( "+ this.transform.translateX +"px ) translateY( "+ this.transform.translateY +"px ) translateZ( "+ this.transform.translateZ +"px )";
    }

    if( (this.transform.scaleX * this.transform.scaleY * this.transform.scaleX) !== 1 ){
        styles.transform += " scaleX( "+ this.transform.scaleX +" ) scaleY( "+ this.transform.scaleY +" ) scaleZ( "+ this.transform.scaleZ +" )";
    }

    styles.width = this.X+"px";
    styles.height = this.Y+"px";

    this.cube.styles(styles);
    return this;
};




/**
 * Generate a new object of Cube3d
 * @param X
 * @param Y
 * @param Z
 * @param RGBAColor {[int,int,int,float]}
 * @constructor
 */
function C3dCube(X,Y,Z, RGBAColor){

    this.contrast = 20;  // 明暗对比度

    /** Size **/
    this.X = X;
    this.Y = Y;
    this.Z = Z;

    this.transform = {

        /** Translate **/
        translateX : 0,
        translateY : 0,
        translateZ : 0,

        /** Scale **/
        scaleX : 1,
        scaleY : 1,
        scaleZ : 1,

        /** Rotation **/
        rotateX : 0,
        rotateY : 0,
        rotateZ : 0
    }

    this.transition = {

        time : 375,
        curve : 'ease-out'
    };

    this.container = VD('<div class="Cube3dContainer"></div>');
    this.cube = VD('<div class="Cube3dCube"></div>');

    this.Sides = [];

    for ( var i = 0; i<6; i++ ){

        var p = new C3dSide( i, RGBAColor || 0, this.contrast );

        switch ( i ) {
            case 0:
            case 5:
                p.setSize(X,Y, Z);break;
            case 1:
            case 4:
                p.setSize(Y,Z, X);break;
            case 2:
            case 3:
                p.setSize(X,Z, Y);break;
        }

        this.Sides.push( p );
        this.cube.append(p.vd);

        p.rend();
    }

    this.container.append(this.cube);
    this.rend();
}

C3dCube.prototype = new C3dNode();


/**
 *
 * @property
 * @param {int} strength  0-10
 * @return {this}
 */
C3dCube.prototype.setContrast = function( strength ){
    this.contrast = strength;
    return this;
}


C3dCube.prototype.top = function(){
    return this.Sides[5];
}

C3dCube.prototype.bottom = function(){
    return this.Sides[0];
}

C3dCube.prototype.left = function(){
    return this.Sides[3];
}

C3dCube.prototype.right = function(){
    return this.Sides[2];
}

C3dCube.prototype.front = function(){
    return this.Sides[1];
}

C3dCube.prototype.back = function(){
    return this.Sides[4];
}

