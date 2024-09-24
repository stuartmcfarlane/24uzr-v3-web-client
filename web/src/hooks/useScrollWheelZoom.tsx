import { clientPoint2svgPoint, fmtPoint, fmtReal, fmtRect, makePoint, rectGrowAroundPoint, rectLimitTo, rectWidth } from "@/lib/graph";
import { MouseEvent, RefObject, useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { useChange } from "./useChange";

export const useScrollWheelZoom = (
    svgRef: RefObject<SVGSVGElement>,
    initialBoundingRect?: Rect,
    maxBoundingRect?: Rect
): Rect | undefined => {
    
    const [zoomedViewBoxRect, setZoomedViewBoxRect] = useState<Rect | undefined>(initialBoundingRect)
    
    const maxRef = useRef(maxBoundingRect)
    const zoomedRef = useRef(zoomedViewBoxRect)

    useChange(
        () => {
            if (zoomedRef.current) return
            console.log(`initialBoundingRect received`)
            zoomedRef.current = initialBoundingRect
            setZoomedViewBoxRect(initialBoundingRect)
         },
        [initialBoundingRect]
    )
    useChange(
        () => {
            zoomedRef.current = zoomedViewBoxRect
         },
        [zoomedViewBoxRect]
    )
    useChange(
        () => {
            maxRef.current = maxBoundingRect
         },
        [maxBoundingRect]
    )
    const onWheel = useCallback(
        (e: WheelEventInit) => {
            const maxBoundingRect = maxRef.current
            const zoomedViewBoxRect = zoomedRef.current
            if (
                !svgRef.current
                || undefined === e.clientX
                || undefined === e.clientY
                || undefined === e.deltaY
                || !zoomedViewBoxRect
                || !maxBoundingRect
            ) {
                console.log('BORK')
                return
            }
            console.log(`>onWheel ====================================================`, e)
            console.log(` onWheel ${fmtRect(zoomedViewBoxRect)} ${fmtRect(maxBoundingRect)}`)
            const δ = e.deltaY
            const Δ = Math.sign(δ) * Math.sqrt(Math.sign(δ) * δ)
            console.log(` onWheel δ ${fmtReal(δ)}`)
            console.log(` onWheel Δ normalized ${fmtReal(Δ)}`)
            
            const clientPoint = makePoint(e.clientX, e.clientY)
            const zoomPoint = clientPoint2svgPoint(svgRef.current, clientPoint)
            console.log(` onWheel zoom point ${fmtPoint(zoomPoint)}`)
            if (!zoomPoint) return
            const zoomTick = rectWidth(zoomedViewBoxRect) / 100
            console.log(` onWheel zoom tick ${fmtReal(zoomTick)}`)
            const zoomMargin = Δ * zoomTick
            console.log(` onWheel zoom margin ${fmtReal(zoomMargin)}`)
            const zoomRect = rectGrowAroundPoint(zoomMargin, zoomPoint, zoomedViewBoxRect)
            const maxedRect = rectLimitTo(maxBoundingRect, zoomRect)
            console.log(`setZoomedViewBoxRect( ${fmtRect(maxedRect)})`)
            setZoomedViewBoxRect(maxedRect)
        },
        [svgRef, zoomedViewBoxRect, maxBoundingRect]
    )
    
    useEffect(
        () => {
            svgRef.current?.addEventListener('wheel', onWheel)
            return () => {
                svgRef.current?.removeEventListener('wheel', onWheel)
            }
        },
        []
    )
    return zoomedViewBoxRect
}