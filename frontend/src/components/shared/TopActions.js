import React from 'react'

export default (props = { actions: [] }) => {
  const { actions } = props 
  return (
    <section id="actions">
      {(actions || []).map((action, index) => (
        <button key={action.label + index} className="primary" onClick={action.onClick}>{action.label}</button>
      ))}
      <div className="clearfix"></div>
    </section>
  )
}
