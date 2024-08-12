import React, { useRef, useState } from 'react'

const typeMap = {
  'open': {title: 'text-indigo-800', container: 'border-indigo-800/30 bg-indigo-800/10'},
  'inprocess': {title: 'text-yellow-600', container: 'border-yellow-600/30 bg-yellow-600/10'},
  'resolved': {title: 'text-green-600', container: 'border-green-600/30 bg-green-600/10'},
  undefined: {title: 'text-slate-300', container: 'border-gray-400/30 bg-gray-400/10'},
  '': {title: 'text-slate-300', container: 'border-gray-400/30 bg-gray-400/10'},
}

function TicketBox({ticketList, type, title, onDrop, updateDraggedItem}) {

  const handleDragStart = (e) => {
    if(e.target.classList.contains('ticket')) {
      e.target.classList.add('opacity-50')
      e.target.classList.add('ring-1')
      e.target.classList.add('ring-green-600')

      console.log(e.target.dataset['cat'])
      updateDraggedItem({
        source: e.target.dataset.cat,
        index: e.target.dataset.idx
      })
    }
  }

  const handleDragEnd = (e) => {
    if(e.target.classList.contains('ticket')) {
      e.target.classList.remove('opacity-50')
      e.target.classList.remove('ring-1')
      e.target.classList.remove('ring-green-600')
      console.log('Drag end') //test
      updateDraggedItem({
        source: null,
        index: null
      })
    }
  }

  const handleDragEnter = (e) => {
    if(e.target.classList.contains('container')) {
      e.target.classList.add('ring-2')
      e.target.classList.add('ring-green-600')
    }
  }

  const handleDragLeave = (e) => {
    if(e.target.classList.contains('container')) {
      e.target.classList.remove('ring-2')
      e.target.classList.remove('ring-green-600')
    }
  }

  const handleDrop = (e) => {
    let target = null
    if(e.target.classList.contains('container')) {
      e.target.classList.remove('ring-2')
      e.target.classList.remove('ring-green-600')
      target = e.target.dataset.cat
      console.log('dropped') //test
      onDrop(target)
    }
  }



  return (
    <div className='w-72 sm:w-96'>
      <h4 className={`${typeMap[type]?.title} uppercase text-center mb-1 text-xl font-semibold`}>{title}</h4>
      <ul 
        className={`container min-h-96 border ${typeMap[type].container} rounded-lg flex flex-col-reverse`}
        onDragOver={(e) => {e.preventDefault()}}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-cat={type}
        >{ticketList.map((ticket, index) => (
          <li 
            key={index} 
            className={`ticket transition-all rounded-md first:mb-2 last:mt-2 mb-2 mx-2 border border-gray-900 bg-black/30 px-2 py-2 text-slate-300`}
            draggable='true'
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            data-cat={type}
            data-idx={index}
            >{ticket}
          </li>
        ))
      }</ul>
    </div>
  )
}

export default TicketBox