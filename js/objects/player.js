cp.template.Player = cp.template.Entity.extend({
    type: 'a',
    width: 30,
    height: 30,
    x: cp.core.width / 2,
    y: cp.core.height - 250,
    speed: 3,
    color: '#f00',
    player: true, // Do not remove, used for search functionality elsewhere
    bulletSpeed: .3, // Time in seconds between bullets fired

    init: function() {
        this.delay = new cp.timer(this.bulletSpeed);
        
        // Create and set an animation sheet (image, frame width, frame height)
        //var animSheet = new AnimSheet('dude.png', 100, 200);

        // Choose a particular animation sequence from the sheet
        // Anim(sheet, speed in seconds, frame order, repeat)
        //this.animLeft = new Anim(animSheet, 1, [2]);
        //this.animRight = new Anim(animSheet, 1, [1]);
        //this.animCenter = new Anim(animSheet, 1, [0,1], {
        //    repeat: true,
        //    alpha: 1,
        //    offsetX: 0,
        //    offsetY: 0,
        //    flipX: false,
        //    flipY: false
        //});
        //this.animUp = new Anim(animSheet, 1, [3,4], {
        //    repeat: true,
        //    alpha: 1,
        //    offsetX: 0,
        //    offsetY: 0,
        //    flipX: false,
        //    flipY: false
        //});
        //this.animDown = new Anim(animSheet, 1, [4]);
        //
        //this.animSet = this.animCenter;
    },
    
    update: function() {
        //this._super();
        
        // Movement
        if (cp.input.press('left') && this.x > 0) {
            //this.animSet = this.animLeft;
            this.x -= this.speed;
        }
        if (cp.input.press('right') && this.x < cp.core.width - this.width) {
            //this.animSet = this.animRight;
            this.x += this.speed;
        }
        if (cp.input.press('up') && this.y > 0) {
            //this.animSet = this.animUp;
            this.y -= this.speed;
        }
        if (cp.input.press('down') && this.y < cp.core.height - this.height) {
            //this.animSet = this.animDown;
            this.y += this.speed;
        }

        // Shoot
        if (cp.input.press('shoot') && this.delay.expire()) {
            cp.game.spawn('Laser', this.x + (this.width / 2), this.y);
            this.delay.reset();
        }
    },
    
    draw: function() {
        // this._super();
        
        // Placeholder image
        cp.ctx.fillStyle = this.color;
        cp.ctx.fillRect(this.x, this.y, this.width, this.height);
    },
    
    collide: function(object) {
        // this._super();
        object.kill();
    }
});

cp.template.Laser = cp.template.Entity.extend({
    type: 'a',
    width: 2,
    height: 14,
    speed: 5,
    color: '#aaa',
    
    init: function(x, y) {
        this.x = x;
        this.y = y;
    },

    update: function() {
        this.y -= this.speed;
        
        // Kill bullet if it goes outside the boundaries
        if (this.y - this.height < 0)
            this.kill();
    },
    
    draw: function() {
        // Placeholder image
        cp.ctx.fillStyle = this.color;
        cp.ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
    },
    
    collide: function(object) {
        object.hp -= 1;
        this.kill();
    }
});
