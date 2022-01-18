import React, { useCallback } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { deepClone } from '~/utils'
import Sketch from '@/Sketch'
import './style.less'

function downloadURI(uri, name) {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default () => {
  const [tool, setTool] = React.useState('pen')
  const [color, setColor] = React.useState('#F5A623')
  const [lines, setLines] = React.useState([])
  const isDrawing = React.useRef(false)
  const stageRef = React.useRef(null)
  const height = document.body.clientHeight - 14 * 5
  const handleMouseDown = e => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y], color }])
  }

  const handleMouseMove = e => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])
    lastLine.color = color
    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const back = () => {
    if (lines.length == 0) return
    const newLines = deepClone(lines)
    newLines.pop()
    setLines(newLines)
  }

  const clear = () => setLines([])

  const colorPickBack = useCallback(
    backColor => {
      setColor(backColor)
    },
    [],
  )

  const handleExport = () => {
    const uri = stageRef.current.toDataURL()
    console.log(uri)
    downloadURI(uri, 'stage.png')
  }

  return (
    <div className="draw">
      <div className="workspace">
        <div className="btn">
          <span onClick={back}>上一步</span>
          <span onClick={clear}>清除</span>
          <span onClick={handleExport}>导出</span>
          <select
          value={tool}
          onChange={e => {
            setTool(e.target.value)
          }}
          >
          <option value="pen">画笔</option>
          <option value="eraser">橡皮</option>
          </select>
        </div>
        <Sketch color={color} colorPick={colorPickBack} />
      </div>
      <Stage
      ref={stageRef}
        width={window.innerWidth}
        height={height}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
