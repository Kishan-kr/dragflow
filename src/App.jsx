import { useRef, useState } from 'react'
import './App.css'
import TicketBox from './components/TicketBox'

function App() {
  const [grabbedItem, setGrabbedItem] = useState({source: null, index: null})
  const inputRef = useRef(null)
  const [openTickets, setOpenTickets] = useState([
    'Improve loading time on the dashboard',
    'Implement multi-factor authentication (MFA)',
  ])

  const [inprocessTickets, setInprocessTickets] = useState([
    'Update user onboarding flow',
    'Fix broken link in the footer',
  ])

  const [resolvedTickets, setResolvedTickets] = useState([
    'Create quarterly sales report template',
    'Add dark mode to the mobile app',
  ])

  const handleAdd = (e) => {
    e.preventDefault()
    if(!inputRef.current.value) return

    let newItems = [...openTickets]
    newItems.push(inputRef.current.value)
    setOpenTickets(newItems)
    inputRef.current.value = ''
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleAdd(e)
    }
  }

  const updateDraggedItem = (value) => {
    setGrabbedItem(value)
  }

  const onDrop = (target) => {
    let currentItem = null
    if(grabbedItem.source === target) {
      return
    }

    switch(grabbedItem.source) {
      case 'open': {
        let newItems = [...openTickets];
        currentItem = newItems.splice(grabbedItem.index, 1)
        setOpenTickets(newItems)
        break
      }
      case 'inprocess': { 
        let newItems = [...inprocessTickets];
        currentItem = newItems.splice(grabbedItem.index, 1)
        setInprocessTickets(newItems)
        break
      }
      case 'resolved': { 
        let newItems = [...resolvedTickets];
        currentItem = newItems.splice(grabbedItem.index, 1)
        setResolvedTickets(newItems)
        break
      }
    }

    switch(target) {
      case 'open': {
        let newItems = [...openTickets];
        newItems.push(currentItem)
        setOpenTickets(newItems)
        break
      }
      case 'inprocess': { 
        let newItems = [...inprocessTickets];
        newItems.push(currentItem)
        setInprocessTickets(newItems)
        break
      }
      case 'resolved': { 
        let newItems = [...resolvedTickets];
        newItems.push(currentItem)
        setResolvedTickets(newItems)
        break
      }
    }
  }

  return (
    <>
      <div className='p-3'>
        <nav className='flex items-center justify-center'>
          <h1 className='text-4xl text-slate-200'>DRAG FLOW</h1>
        </nav>

        <form onSubmit={handleAdd} className='flex gap-4 px-3 justify-center my-6'>
          <textarea 
            ref={inputRef}
            autoFocus
            onKeyDown={handleKeyDown}
            type="text" 
            className='rounded-lg w-full md:w-96 px-2 py-2 text-gray-400 bg-transparent outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-gray-300' 
          />
          <button className='rounded-lg p-2 px-6 bg-indigo-950 text-indigo-700 border border-indigo-800 text-nowrap'>Add Ticket</button>
        </form>

        <section className='flex gap-6 px-3 mt-8'>
          <TicketBox 
            title={'Open'} 
            ticketList={openTickets} 
            type={'open'}
            onDrop={onDrop}
            updateDraggedItem={updateDraggedItem}
          />
          <TicketBox 
            title={'in process'} 
            ticketList={inprocessTickets} 
            type={'inprocess'}
            onDrop={onDrop}
            updateDraggedItem={updateDraggedItem}
          />
          <TicketBox 
            title={'resolved'} 
            ticketList={resolvedTickets} 
            type={'resolved'}
            onDrop={onDrop}
            updateDraggedItem={updateDraggedItem}
          />
        </section>
      </div>
    </>
  )
}

export default App
