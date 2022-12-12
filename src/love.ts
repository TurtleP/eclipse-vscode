const mainFuncs = `love.load = ->
    return

love.update = (dt) ->
    return

love.draw = ->
    return
`;

const mainFuncsConsole = `love.load = ->
    return

love.update = (dt) ->
    return

love.draw = (screen) ->
    return
`;

const textFunc = `
love.textinput = (text) ->
    return
`;

const mouseFuncs = `
love.wheelmoved = (dx, dy) ->
    return

love.mousepressed = (button, x, y) ->
    return

love.mousemoved = (button, x, y, dx, dy, is_touch) ->
    return

love.mousereleased = (button, x, y) ->
    return
`;

const keyboardFuncs = `
love.keypressed = (key, scan_code, is_repeat) ->
    return

love.keyreleased = (key, scan_code) ->
    return
`;

const gamepadFuncs = `
love.gamepadpressed = (joystick, button) ->
    return

love.gamepadaxis = (joystick, axis, button) ->
    return

love.gamepadreleased = (joystick, button) ->
    return
`;

const joystickStatusFuncs = `
love.joystickadded = (joystick) ->
    return

love.joystickremoved = (joystick) ->
    return
`;

const joystickFuncs = `
love.joystickpressed = (joystick, button) ->
    return

love.joystickaxis = (joystick, axis, value) ->
    return

love.joystickhat = (joystick, hat, direction) ->
    return

love.joystickreleased = (joystick, button) ->
    return
`;

const touchFuncs = `
love.touchpressed = (id, x, y, dx, dy, pressure) ->
    return

love.touchreleased = (id, x, y, dx, dy, pressure) ->
    return

love.touchmoved = (id, x, y, dx, dy, pressure) ->
    return
`;

export function getContent(mode: string): string {
    var result: string = mainFuncs;

    switch (mode) {
        case "all": {
            result += textFunc + mouseFuncs + keyboardFuncs + joystickStatusFuncs + gamepadFuncs + joystickFuncs + touchFuncs;
            break;
        }
        case "simple": {
            break;
        }
        case "desktop": {
            result += textFunc + mouseFuncs + mouseFuncs + keyboardFuncs;
            break;
        }
        case "controller": {
            result += joystickStatusFuncs + gamepadFuncs + joystickFuncs;
            break;
        }
        case "mobile": {
            result += textFunc + joystickFuncs + touchFuncs;
            break;
        }
        case "homebrew": {
            result = mainFuncsConsole + textFunc + gamepadFuncs + touchFuncs;
        }
    }

    return result;
}
