type Tick={value:number;label?:string};

export function CartesianAxes({width,height,originX,originY,xScale,yScale,xTicks,yTicks,pad=16}:{width:number;height:number;originX:number;originY:number;xScale:number;yScale:number;xTicks:Tick[];yTicks:Tick[];pad?:number}){
 const xEnd=width-pad,yTop=pad,yBottom=height-pad;
 return <g className="cartesian-plane" aria-hidden="true">
  <g className="cartesian-grid">{xTicks.map(t=><line key={`gx${t.value}`} x1={originX+t.value*xScale} y1={yTop} x2={originX+t.value*xScale} y2={yBottom}/>)}{yTicks.map(t=><line key={`gy${t.value}`} x1={pad} y1={originY-t.value*yScale} x2={xEnd} y2={originY-t.value*yScale}/>)}</g>
  <g className="cartesian-axes"><line x1={pad} y1={originY} x2={xEnd} y2={originY}/><path d={`M${xEnd-9} ${originY-5}L${xEnd} ${originY}L${xEnd-9} ${originY+5}`}/><line x1={originX} y1={yBottom} x2={originX} y2={yTop}/><path d={`M${originX-5} ${yTop+9}L${originX} ${yTop}L${originX+5} ${yTop+9}`}/></g>
  <g className="cartesian-ticks">{xTicks.map(t=><g key={`tx${t.value}`}><line x1={originX+t.value*xScale} y1={originY-5} x2={originX+t.value*xScale} y2={originY+5}/>{t.label&&<text x={originX+t.value*xScale} y={originY+22} textAnchor="middle">{t.label}</text>}</g>)}{yTicks.map(t=><g key={`ty${t.value}`}><line x1={originX-5} y1={originY-t.value*yScale} x2={originX+5} y2={originY-t.value*yScale}/>{t.label&&<text x={originX-10} y={originY-t.value*yScale+5} textAnchor="end">{t.label}</text>}</g>)}</g>
  <text className="cartesian-origin" x={originX-9} y={originY+19} textAnchor="end">0</text><text className="cartesian-axis-label" x={xEnd-4} y={originY-12}>x</text><text className="cartesian-axis-label" x={originX+11} y={yTop+13}>y</text>
 </g>
}
