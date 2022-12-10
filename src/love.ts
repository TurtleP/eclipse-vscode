export function getContent(): string {
    return `
        love.load = ->
            return

        love.update = (dt) ->
            return

        love.draw = ->
            return

        love.gamepadpressed = (joy, button) ->
            return

        love.gamepadreleased = (joy, button) ->
            return

        love.gamepadaxis = (joy, axis, button) ->
            return

        love.touchpressed = (id, x, y, dx, dy, pressure) ->
            return

        love.touchreleased = (id, x, y, dx, dy, pressure) ->
            return

        love.touchmoved = (id, x, y, dx, dy, pressure) ->
            return
        `;
}
