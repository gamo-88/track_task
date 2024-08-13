import React, { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/SuperbaseClient'
import { useNavigate } from 'react-router-dom'
import { userStore } from '../manageStore'
import { Select, Sidebar, TextInput, Textarea, Drawer  } from "flowbite-react";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

import { Badge } from "flowbite-react";
import { Button, Banner, Label, Modal } from "flowbite-react";
import { Tooltip } from "flowbite-react";





export default function App() {
  const USER = userStore((state)=> state.USER)




const navigate = useNavigate()

const handleSignOut = async (e)=>{
  e.preventDefault()
const { error } = await supabase.auth.signOut()
    navigate("/signIn")
}



const handleSubmit = async (e)=>{
  e.preventDefault()
  if (validation()) {
    const { error } = await supabase
    .from('task')
    .insert({ 
      taskname: name,
      taskdesc: description,
      deadlinedate: deadlineDate,
      deadlinehour: deadlineTime,
      priority: priority,
      completed: completed,
      ownerid: USER.id,
  
           })
           if (!error) {
            setName('')
           setDescription('')
           setDescriptionError('')
           setDeadlineDate('')
           setDeadlineDateError('')
           setDeadlineTime('')
           setDeadlineTimeError('')
           setpriority(1)
           setOpenModal(false)
           setDisplay(v=>!v)

           }else{
            setInsertError(error)
           }

  }
}

const [currentTaskId, setCurrentTaskId] = useState("");

const openSet = (taskId)=>{
  setOpenEditModal(true)
  setCurrentTaskId(taskId)
  console.log(currentTaskId)
  let task = tasks.filter((item)=>item.taskid === taskId)
  console.log(task)
  setCompleted(task[0].completed)
  setName(task[0].taskname)
  setDescription(task[0].taskdesc)
  setDeadlineDate(task[0].deadlinedate)
  setDeadlineTime(task[0].deadlinehour.slice(0, 5))
  setpriority(task[0].priority)
}

const handleEdit =async (e)=>{
  e.preventDefault()

  const { error } = await supabase
  .from('task')
  .update({       taskname: name,
                  taskdesc: description,
                  deadlinedate: deadlineDate,
                  deadlinehour: deadlineTime,
                  priority: priority,
                  completed: completed,

   })
  .eq('taskid', currentTaskId)
  console.log(error)
  console.log(currentTaskId)
  setOpenEditModal(false)
  setDisplay(v=>!v)

  
}
const [currentdelete, setCurrentdelete] = useState("")
const openSetDelet =(taskId)=>{
  setOpenDeletModal(true)
  setCurrentdelete(taskId)
}

const handleDelet = async ()=>{
  console.log(currentdelete)

    const response = await supabase
      .from('task')
      .delete()
      .eq('taskid', currentdelete)
      setOpenDeletModal(false)
      setDisplay(v=>!v)
}


const [openModal, setOpenModal] = useState(false);
const [openEditModal, setOpenEditModal] = useState(false);
const [completed, setCompleted] = useState(false);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [deadlineDate, setDeadlineDate] = useState("");
const [deadlineTime, setDeadlineTime] = useState("");
const [priority, setpriority] = useState(1);


const [insertError, setInsertError] = useState('')
const [nameError, setNameError] = useState('')
const [descriptionError, setDescriptionError] = useState('')
const [deadlineDateError, setDeadlineDateError] = useState('')
const [deadlineTimeError, setDeadlineTimeError] = useState('')
const [tasks, setTasks] = useState([]) 
const [openDeletModal, setOpenDeletModal] = useState(false)
const [display, setDisplay] = useState(true)
const [isOpenDrawer, setisOpenDrawer] = useState(false);

const handleCloseDrawer = () => setisOpenDrawer(false);

const [boardIsopen, setBoardIsopen] = useState(false);

const handleCloseBoard = () => setBoardIsopen(false);


const [totalTask, setTotalTask] = useState(0)
const [completedTask, setCompletedTask] = useState(0)
const [runningTask, setRunningTask] = useState(0)
const [highPriorityTask, setHighPriorityTask] = useState(0)
const [neutralPriorityTask, setNeutralPriorityTask] = useState(0)
const [lowPriorityTask, setLowPriorityTask] = useState(0)


const validation = ()=>{

  const currentDate = new Date();
  const selectedDateTime = new Date(`${deadlineDate}T${deadlineTime}`);

  if (selectedDateTime < currentDate) {
    alert("Select a date and more after the current date and time.");
    return 0
  }
  if (name.length<3) {
    setNameError("At least 3 char required")
    return 0
  }
  if (description.length<3) {
    setDescriptionError("At least 3 char required")
    return 0
  }
  if (deadlineDate==="") {
    setDeadlineDateError("Fill this section")
    return 0
  }
  if (deadlineTime==="") {
    setDeadlineTimeError("Fill this section")
    return 0
  }

  return 1
}


const fetchUserTask = async ()=>{
  const { data, error } = await supabase
  .from('task')
  .select("*")
  .eq('ownerid', USER.id)
  setTasks(data)
  console.log(tasks)
  getTotal()
  getCompletedTask()
  getRunningTask()
  getHighPriorityTask()
  getNeutralPriorityTask()
  getLowPriorityTask()

} 


const updateTaskCompleted = async (taskid, completed)=>{
  const { data, error } = await supabase
  .from('task')
  .update({ completed }) 
  .eq('taskid', taskid);  

// if (error) {
//   console.error('Error updating task:', error);
// } else {
//   console.log('Task updated:', data);
// }
}

const handleOnchangeComplete = async (taskId) =>{
  let task = tasks.filter((item)=>item.taskid === taskId)
  // console.log(task.taskid)
  // console.log(task[0])
  // const { error } = await supabase
  // .from('task')
  // .update({ completed: !completed })
  // .eq('taskid', taskId)
  updateTaskCompleted(taskId, !task[0].completed)
  setDisplay(v=>!v)
}

let [currentviewingTask, setCurrentviewingTask] = useState([])
const openView = (taskId)=>{
  let task = tasks.filter((item)=>item.taskid === taskId)
  setisOpenDrawer(true)
  setCurrentviewingTask(task)

}

 const getTotal = ()=>{
  return setTotalTask(tasks.length)
 }
 
 const getCompletedTask = ()=>{
  let completedTask = tasks.filter((item)=>item.completed)
  return setCompletedTask(completedTask.length)
 }
 const getRunningTask = ()=>{
  let runningTask = tasks.filter((item)=>!item.completed)
  return setRunningTask(runningTask.length)
 }
 const getHighPriorityTask = ()=>{
  let highPriority = tasks.filter((item)=>item.priority == 3)
  return setHighPriorityTask(highPriority.length)
 }
 const getNeutralPriorityTask = ()=>{
  let neutralPriority = tasks.filter((item)=>item.priority == 1)
  return setNeutralPriorityTask(neutralPriority.length)
 }
 const getLowPriorityTask = ()=>{
  let lowPriority = tasks.filter((item)=>item.priority == 2)
  return setLowPriorityTask(lowPriority.length)
 }


useEffect(()=>{
  getTotal()
  getCompletedTask()
  getRunningTask()
  getHighPriorityTask()
  getNeutralPriorityTask()
  getLowPriorityTask()

fetchUserTask()
},[display])



if (USER) {
  return (
    <div className='min-h-[100vh] flex flex-col justify-between bg-green-300 '>
<div className="md-p-24 p-3">
  
 <div className="afterUses flex justify-between items-center mb-5 flex-wrap">
  <div className="logo cursor-pointer"><div className="imageroket flex justify-start"><img src="/images/favicon.ico" alt="" /><span className='font-semibold text-gray-700 text-3xl'>Track-Task</span></div></div>
<div className="title text-xl font-medium">Welcome Mr/Mrs <span className="text-2xl text-white">{USER.user_metadata.name}</span> to Track-task</div>
<button onClick={(e)=>handleSignOut(e)} className=' text-lg font-medium border rounded-md bg-blue-300 px-2 py-1 ' ><LogoutOutlinedIcon/> Sign Out</button>
</div> 

<div className="wraper bg-[#fffefe] flex gap-4">
  <div className="sidebar max-sm:hidden">
  <Sidebar aria-label="Default sidebar example">
  <Sidebar.Logo  img="/images/favicon.ico" imgAlt="trackstack app logo" className='bg-green-300 text-white py-5 rounded-3xl'>
        Task-Track BOARD
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={RuleOutlinedIcon } label={totalTask} labelColor="dark">
            Total
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={ChecklistRtlOutlinedIcon} label={completedTask} labelColor="success">
            Completed
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={PlayCircleFilledWhiteOutlinedIcon} label={runningTask}>
            Running
          </Sidebar.Item>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={AssistantOutlinedIcon}>
              Priority
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={highPriorityTask} labelColor="red">
              High
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={neutralPriorityTask} labelColor="green">
              Neutral
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={lowPriorityTask} labelColor="blue">
              Low
            </Sidebar.Item>
          </Sidebar.ItemGroup>


        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  </div>
  <div className="main bg-slate-100 w-[80%] max-sm:w-[95%] m-2 p-4 rounded-sm">

  <div className="head flex justify-between mb-3">
    <div className="  max-sm:block hidden  text-green-400 text-2xl cursor-pointer" onClick={() => setBoardIsopen(true)}><span className="ico"><QueryStatsOutlinedIcon/></span>My Board</div>
    <div className=" text-green-400 text-2xl cursor-pointer hover:underline " onClick={() => setOpenModal(true)}><span className="icoCreate"><AddCircleOutlinedIcon/></span>Add(New Task)</div>
  </div>
  <div className="inbox text-2xl"><span className="ico text-blue-300"><InventoryOutlinedIcon/></span>InBox</div>


  <div className="body mt-6">
{tasks?.map((task, index)=>{
  return(
<div className="" key={index}>
<div className="taskItem lg:flex md:items-center hidden lg:w-[1000px] justify-between mb-1 bg-gray-200 rounded-xl px-2">

<div className="checkName flex gap-3 md:items-center">
  <div className="check"> <input type="checkbox" name="status" id={task.taskid} checked={task.completed} onChange={()=>handleOnchangeComplete(task.taskid)} /> </div>
  <div className="nameDesc">
    <div className="name text-xl font-semibold">{task.taskname}</div>
    <div className="desc text-gray-400">{task.taskdesc.substring(0, 5)}{task.taskdesc.length>5&&("...")}</div>
  </div>
</div>

<div className="createdAt">
  <div className="reminder hour text-gray-400">Created: </div>
  <div className="deadlineDate text-lg">{task.createdat.slice(0,10)}, {task.createdat.slice(11,16)}</div>
</div>

<div className="deadLineRemain">
  <div className="reminder hour text-gray-400">Deadline: </div>
  <div className="deadlineDate text-lg">{task.deadlinedate}, {task.deadlinehour.slice(0, 5)}</div>
  <div className="reminder hour  text-lg"> </div> 
</div>

<div className="priority text-lg">
  {
    <>
   {
    <div className="">
       {task.priority==3&&<Badge color="failure" className='text-center'>High</Badge>}
       {task.priority==1&&<Badge color="success" className='text-center'>Neutral</Badge>}
      {task.priority==2&&<Badge color="info" className='text-center'>Low</Badge>}
    </div>
   }
    </>
  }
</div>

<div className="actions flex gap-3 bg-purple-100 rounded px-2">
  <div className="view text-gray-600 cursor-pointer" onClick={()=>openView(task.taskid)}><Tooltip content="View" > <OpenInFullOutlinedIcon/></Tooltip></div>
  <div className="edit text-blue-600 cursor-pointer" onClick={()=>openSet(task.taskid)}><Tooltip content="Edit" ><ModeEditOutlineOutlinedIcon/></Tooltip></div>
  <div className="delet text-red-600 cursor-pointer" onClick={()=>openSetDelet(task.taskid)}><Tooltip content="Delet" ><DeleteSweepOutlinedIcon/></Tooltip></div>
</div>

</div>


<div className="bg-gray-50 border-l-4 lg:hidden border-blue-500 p-4 w-full mx-auto my-4">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-bold text-gray-800">{task?.taskname}</h3>
{
 task?.priority==1 && (
    <span className="text-white bg-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{task?.priority}</span>

  )
}

{
 task?.priority==2 && (
    <span className="text-white bg-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{task?.priority}</span>

  )
}

{
 task?.priority==3 && (
    <span className="text-white bg-red-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{task?.priority}</span>

  )
}

</div>


  <p className="text-gray-600 mt-2">
  {task.taskdesc.substring(0, 5)}{task.taskdesc.length>5&&("...")}
  </p>
  <div className="mt-4 flex justify-between items-center">
    <div className="flex items-center text-sm text-gray-500">
   <CalendarMonthOutlinedIcon/>
      <span>Due: {task?.deadlinedate}, {task?.deadlinehour.slice(0, 5)}</span>
    </div>
    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{task?.completed?("completed"):("Running")}</span>
  </div>


  <div className="mt-4 flex justify-between items-center bg-purple-50">

<div className="view">
<div className="view text-gray-600 cursor-pointer" onClick={()=>openView(task.taskid)}><Tooltip content="View" > <OpenInFullOutlinedIcon/></Tooltip></div>

</div>

<div className="update">
<div className="edit text-blue-600 cursor-pointer" onClick={()=>openSet(task.taskid)}><Tooltip content="Edit" ><ModeEditOutlineOutlinedIcon/></Tooltip></div>

</div>

<div className="delete">
<div className="delet text-red-600 cursor-pointer" onClick={()=>openSetDelet(task.taskid)}><Tooltip content="Delet" ><DeleteSweepOutlinedIcon/></Tooltip></div>

</div>
  </div>

</div>

</div>
  )
}) 
}
{tasks.length<=0&&(<p className="text-6xl text-gray-900 dark:text-white"><span className='text-8xl text-gray-600'>0.<br/> </span>No task yet, click on <span className='text-green-400'>Add( New task)<ArrowUpwardOutlinedIcon/><ArrowUpwardOutlinedIcon/><ArrowUpwardOutlinedIcon/></span>up there to follow up .</p>) }
  </div>

  </div>
  


</div>


<Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header><span className='text-green-400'>Add a task</span></Modal.Header>
        <Modal.Body>
        
          <div className="space-y-6">
            {insertError&&<Badge color="failure" className='text-center'>{insertError}</Badge>}
            
            <form  onSubmit={handleSubmit}>
              
            <div className="mb-2 block">
              <div>
                <Label htmlFor="name" value="Name:" />
              </div>
              <TextInput
              type='text'
                id="name"
                placeholder="Task's name ..."
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <p className='text-red-400'>{name.length<3&&nameError}</p>
            </div>

            <div className="mb-2 block">
              <div>
                <Label htmlFor="description" value="Description:" />
              </div>
              <Textarea
              type='text'
                id="description"
                placeholder="Task's description ..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <p className='text-red-400'>{description.length<3&&descriptionError}</p>

            </div>
            <div className="grid gap-6 mb-2 md:grid-cols-2">
              
              <div className="mr-2 block">
                <Label htmlFor="deadlineDate" value="task's deadline date" />
                <TextInput id="deadlineDate" 
                type="date" 
                value={deadlineDate} 
                onChange={(event)=>setDeadlineDate(event.target.value)}  
                />
                <p className='text-red-400'>{deadlineDate===""&&deadlineDateError}</p>
              </div>
              
              <div className="mr-2 block">
                <Label htmlFor="deadlineTime" value="task's deadline time" />
                <TextInput id="deadlineDate" 
                type="time" 
                value={deadlineTime} 
                onChange={(e)=>setDeadlineTime(e.target.value)}  
                />
                <p className='text-red-400'>{deadlineTime===""&&deadlineTimeError}</p>
              </div>

            </div>




            <div className="mb-2 block">
              <div>
                <Label htmlFor="priority" value="Task's priority:" />
              </div>
              <Select id="priority" 
              value={priority} 
              onChange={(e)=>setpriority(e.target.value)} 
              required
              >
                <option value={1}>Neutral</option>
                <option value={2}>Low</option>
                <option value={3}>High</option>
              </Select>
            </div>
            <div className="grid gap-6 mt-6 md:grid-cols-2 ">
            <Button type='submit'>Create</Button>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                      </Button>
            </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>

<Modal show={openEditModal} onClose={() => setOpenEditModal(false)} popup>
        <Modal.Header><span className='text-green-400'>Add a task</span></Modal.Header>
        <Modal.Body>
        
          <div className="space-y-6">
            {insertError&&<Badge color="failure" className='text-center'>{insertError}</Badge>}
            
            <form  onSubmit={handleEdit}>
              
            <div className="mb-2 block">
              <div>
                <Label htmlFor="name" value="Name:" />
              </div>
              <TextInput
              type='text'
                id="name"
                placeholder="Task's name ..."
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
              <p className='text-red-400'>{name.length<3&&nameError}</p>
            </div>

            <div className="mb-2 block">
              <div>
                <Label htmlFor="description" value="Description:" />
              </div>
              <Textarea
              type='text'
                id="description"
                placeholder="Task's description ..."
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <p className='text-red-400'>{description.length<3&&descriptionError}</p>

            </div>
            <div className="grid gap-6 mb-2 md:grid-cols-2">
              
              <div className="mr-2 block">
                <Label htmlFor="deadlineDate" value="task's deadline date" />
                <TextInput id="deadlineDate" 
                type="date" 
                defaultValue={deadlineDate} 
                onChange={(event)=>setDeadlineDate(event.target.value)}  
                />
                <p className='text-red-400'>{deadlineDate===""&&deadlineDateError}</p>
              </div>
              
              <div className="mr-2 block">
                <Label htmlFor="deadlineTime" value="task's deadline time" />
                <TextInput id="deadlineDate" 
                type="time" 
                defaultValue={deadlineTime} 
                onChange={(e)=>setDeadlineTime(e.target.value)}  
                />
                <p className='text-red-400'>{deadlineTime===""&&deadlineTimeError}</p>
              </div>

            </div>




            <div className="mb-2 block">
              <div>
                <Label htmlFor="priority" value="Task's priority:" />
              </div>
              <Select id="priority" 
              defaultValue={priority} 
              onChange={(e)=>setpriority(e.target.value)} 
              required
              >
                <option value={1}>Neutral</option>
                <option value={2}>Low</option>
                <option value={3}>High</option>
              </Select>
            </div>
            <div className="grid gap-6 mt-6 md:grid-cols-2 ">
            <Button type='submit'>Update</Button>
                      <Button color="gray" onClick={() => setOpenEditModal(false)}>
                        Decline
                      </Button>
            </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>

      <Modal show={openDeletModal} size="md" onClose={()=>setOpenDeletModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ErrorOutlineOutlinedIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={ handleDelet}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={()=>setOpenDeletModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body> 
      </Modal>

      <Drawer open={isOpenDrawer} onClose={handleCloseDrawer} position="right">
        <Drawer.Header title="Task info" />
        <Drawer.Items>

        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 max-w-md mx-auto my-4">
  <div className="flex justify-between items-center">
    <h3 className="text-xl font-bold text-gray-800">{currentviewingTask[0]?.taskname}</h3>
{
 currentviewingTask[0]?.priority==1 && (
    <span className="text-white bg-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{currentviewingTask[0]?.priority}</span>

  )
}

{
 currentviewingTask[0]?.priority==2 && (
    <span className="text-white bg-blue-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{currentviewingTask[0]?.priority}</span>

  )
}

{
 currentviewingTask[0]?.priority==3 && (
    <span className="text-white bg-red-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{currentviewingTask[0]?.priority}</span>

  )
}

</div>

  <p className="text-gray-600 mt-2">
  {currentviewingTask[0]?.taskdesc}
  </p>
  <div className="mt-4 flex justify-between items-center">
    <div className="flex items-center text-sm text-gray-500">
<CalendarMonthOutlinedIcon/>
      <span>Due: {currentviewingTask[0]?.deadlinedate}, {currentviewingTask[0]?.deadlinehour.slice(0, 5)}</span>
    </div>
    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">{currentviewingTask[0]?.completed?("completed"):("Running")}</span>
  </div>
</div>
        </Drawer.Items>
      </Drawer>

      <Drawer open={boardIsopen} onClose={handleCloseBoard} position="right">
        <Drawer.Header title="Board" />
        <Drawer.Items>
        <Sidebar aria-label="Default sidebar example">
  <Sidebar.Logo href="#" img="/images/favicon.ico" imgAlt="trackstack app logo" className='bg-green-300 text-white py-5 rounded-3xl'>
        Task-Track BOARD
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={RuleOutlinedIcon } label={totalTask} labelColor="dark">
            Total
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={ChecklistRtlOutlinedIcon} label={completedTask} labelColor="success">
            Completed
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={PlayCircleFilledWhiteOutlinedIcon} label={runningTask}>
            Running
          </Sidebar.Item>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={AssistantOutlinedIcon}>
              Priority
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={highPriorityTask} labelColor="red">
              High
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={neutralPriorityTask} labelColor="green">
              Neutral
            </Sidebar.Item>
            <Sidebar.Item href="#"  label={lowPriorityTask} labelColor="blue">
              Low
            </Sidebar.Item>
          </Sidebar.ItemGroup>


        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
        </Drawer.Items>
      </Drawer>
</div>

      <footer className="bg-gray-800 text-white py-4">
  <div className="container mx-auto text-center">

    <div className="text-gray-400">
      © 2024 Gamo. Tract-task.
    </div>
  </div>
</footer>
    </div>
  )
}else{
  return(window.document.location= "/signIn")
}

}
