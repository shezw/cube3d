```
      ______      __        _____ ____
     / ____/_  __/ /_  ___ |__  // __ \
    / /   / / / / __ \/ _ \ /_ </ / / /
   / /___/ /_/ / /_/ /  __/__/ / /_/ /
   \____/\__,_/_.___/\___/____/_____/

    Add pseudo 3d (minecraft like) elements to HTML without any 3D engine, canvas or OpenGL requirements

```

English  [中文](readme-zh-CN.md) 

### About

This library is mainly developed to add Lightweight interesting pseudo 3D content in the HTML interface, and cannot realize 3D simulation and 3D graphics technology (such as lighting, texture, etc.)

The function of this library is based on CSS3 3D transformation, in which each cube is composed of 6 div planes.
So, you can try more traditional HTML editing methods in the div. Just like the screenshot of my blog below.

![Image text](assets/images/intro.png)

### Usage

#### 1. include cube3d.css

```html
<link rel="stylesheet" href="dist/cube3d.css">
</head>
```
    
#### 2 include vdom.core.js , cube3d.js
```html
</body>
<script src="dist/vdom.core.js"></script>
<script src="dist/cube3d.js"></script>
```

#### 3 create a Cube instance
```html
var cube = new C3dCube(120,120,120, [30,40,180,1] );
```

#### 4 Add the cube into the HTML
```html
vdom('body').append( cube.container );
```

### Documentation

#### C3dNode        : An empty node with 3d feature (Used to be a group)
    - container     A vdom for HTML/2d display/animation
    - cube          A vdom for 3d display/transform/
    
    - move
    - rotate
    - scale

#### C3dCube extends C3dNode : The 3d node has 6 visible sides
    - Sides         Array of each side
    - constract
    
    - top(),bottom(),left(),right(),front(),back()  Get each side 

#### C3dSide
    - vd
    - bg
    - d (direction id)
    - constract


### Demo

[demo](demo/index.html)