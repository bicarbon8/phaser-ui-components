export module TestUtils {
    var _game: Phaser.Game;
    var _scene: Phaser.Scene;

    export function game(done?: () => any): Phaser.Game {
        if (!_game) {
            _game = new Phaser.Game({
                type: Phaser.AUTO,
                scene: {
                    init: function() {
                        _scene = this;
                    },
                    preload: function() {
                        this.load.spritesheet('sample-spritesheet', 'https://avatars.githubusercontent.com/u/2321610?v=4', {
                            frameWidth: 460
                        });
                    },
                    create: function() {
                        this.cameras.main.centerOn(0, 0);
                    }
                },
                callbacks: {
                    postBoot: function() {
                        _game.loop.stop();
                        if (done) done();
                    }
                }
            });
        } else {
            if (done) done();
        }
        return _game;
    }

    export function scene(): Phaser.Scene {
        if (!_scene) {
            const g: Phaser.Game = game();
        }
        return _scene;
    }

    export function reset(): void {
        _game?.destroy(true, true);
        _game = null;
        _scene = null;
    }

    export function clear(): void {
        scene()?.children?.each((c: Phaser.GameObjects.GameObject) => c.destroy());
    }
}