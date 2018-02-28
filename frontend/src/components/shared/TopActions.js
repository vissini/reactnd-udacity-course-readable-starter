import React from 'react'

function renderButton(action, index) {
  return (
    <button key={index} className={'btn' + (action.active ? ' active' : '') + (action.class ? ' ' + action.class : ' primary')  + (action.float ? ' float-' + action.float : '')} onClick={() => {
      if (action.onClick) {
        action.onClick()
      }
    }}>{action.label}{action.icon ? (<span style={{marginLeft: '.5rem'}} className="oi" data-glyph={action.icon}/>) : ''}</button>
  )
}

export default (props = { actions: [] }) => {
  const { actions } = props 
  return (
    <section id="actions">
      {(actions || []).map((action, index) => {
        if (action.render) {
          return (
            <div>
              {action.render}
            </div>
          )
        }
        if (action.group) {
          return (
            <div className={'btn-group' + (action.float ? ' float-' + action.float : '')} key={index}>
              {action.group.map((btn, i) => renderButton(btn, index + '.' + i))}
            </div>
          )
        } else {
          return renderButton(action, index)
        }
      })}
      <div className="clearfix"></div>
    </section>
  )
}
