import { CURSOR_FONT_SIZE, CURSOR_SIZE, CURSOR_TEXT_OFFSET } from "@/lib/constants"
import { fmtReal, line2SvgLine, makeLine, makePoint, screenUnits2canvasUnits } from "@/lib/graph"
import { vectorAdd } from "@/lib/vector"

export type MouseCursorProps = {
    point: Point
    screen2svgFactor: number
}

const MouseCursor = (props: MouseCursorProps) => {
    const {
        point,
        screen2svgFactor,
    } = props
    const one = screenUnits2canvasUnits(screen2svgFactor, 1)
    const size = screenUnits2canvasUnits(screen2svgFactor, CURSOR_SIZE)
    const { x, y } = point
    const lines = [
        makeLine(makePoint(x - size, y), makePoint(x - one, y)),
        makeLine(makePoint(x, y - size), makePoint(x, y - one)),
        makeLine(makePoint(x + one, y), makePoint(x + size, y)),
        makeLine(makePoint(x, y + one), makePoint(x, y + size)),
    ]
    const textOffset = makePoint(screenUnits2canvasUnits(
        screen2svgFactor, CURSOR_TEXT_OFFSET.x),
        screenUnits2canvasUnits(screen2svgFactor, CURSOR_TEXT_OFFSET.y)
    )
    const fontSize = screenUnits2canvasUnits(screen2svgFactor, CURSOR_FONT_SIZE)
    return <>
        {lines.map((line: Line) => (
            <line
                {...line2SvgLine(line)}
                stroke={'black'}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
            />
        ))}
        <text {...vectorAdd({x, y}, textOffset)} fontSize={fontSize}>({fmtReal(x, 2)}, {fmtReal(y, 2)})</text>
    </>
}

export default MouseCursor