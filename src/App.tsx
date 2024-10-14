/** @jsxImportSource @emotion/react */
import React, {MouseEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanBoard from "./KanbanBoard";
import KanbanCard from "./KanbanCard";
import KanbanNewCard from "./KanbanNewCard";
import KanbanColumn from "./KanbanColumn";


const COLUMN_BG_COLORS = {
    loading: '#E3E3E3',
    todo: '#C9AF97',
    ongoing: '#FFE799',
    done: '#C0E8BA'
};

const DATA_STORE_KEY = 'kanban-data-store';
const COLUMN_KEY_TODO = 'todo';
const COLUMN_KEY_ONGOING = 'ongoing';
const COLUMN_KEY_DONE = 'done';

export default function App() {
    const [showAdd, setShowAdd] = useState(false);
    const [todoList, setTodoList] = useState(new Array<{ title: string, status: string }>());
    const [ongoingList, setOngoingList] = useState(new Array<{ title: string, status: string }>());
    const [doneList, setDoneList] = useState(new Array<{ title: string, status: string }>());

    const [isLoading, setIsLoading] = useState(false);

    const [draggedItem, setDraggedItem] = useState<{ title: string, status: string } | null>(null);
    const [dragSource, setDragSource] = useState<string | null>(null);
    const [dragTarget, setDragTarget] = useState<string | null>(null);

    // const [ongoingList] = useState([
    //     {title: '开发任务-4', status: '2024-10-11 8:15'},
    //     {title: '开发任务-6', status: '2024-10-11 8:15'},
    //     {title: '测试任务-2', status: '2024-10-11 8:15'}
    // ]);
    // const [doneList] = useState([
    //     {title: '开发任务-2', status: '2024-10-11 8:15'},
    //     {title: '测试任务-1', status: '2024-10-11 8:15'}
    // ]);

    const handleAdd = (_: MouseEvent) => {
        setShowAdd(true);
    }

    const handleSubmit = (title: string) => {
        setTodoList(curList => [{title: title, status: new Date().toDateString()}, ...curList])
        // todoList.unshift({title: title, status: new Date().toDateString()})
        // setShowAdd(false)
    }

    const handleSaveAll = () => {
        const data = JSON.stringify(todoList)
        window.localStorage.setItem(DATA_STORE_KEY, data)

    }

    const getSetList = (key: string) => {
        if (key === COLUMN_KEY_TODO) {
            return setTodoList
        } else if (key === COLUMN_KEY_ONGOING) {
            return setOngoingList
        } else {
            return setDoneList
        }
    }

    const handleDrop = (_: DragEvent) => {
        if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
            return;
        }

        if (dragSource) {
            getSetList(dragSource)((currentStat) =>
                currentStat.filter((item) => !Object.is(item, draggedItem))
            );
        }

        if (dragTarget) {
            getSetList(dragTarget)((currentStat) => [draggedItem, ...currentStat]);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const data = window.localStorage.getItem(DATA_STORE_KEY)
        setTimeout(() => {
            if (data) {
                const kanbanData = JSON.parse(data)
                setTodoList(kanbanData)
            }
            setIsLoading(false);
        }, 1000)
    }, [])

    // jsx 赋值给 变量
    const toDoTitle = (<>待处理
            <button disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
        </>
    )

    return (
        <div className="App">
            <header className="App-header">
                <h1>我的看板
                    <button onClick={handleSaveAll}>保存所有数据</button>
                </h1>
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <KanbanBoard>
                {isLoading ? (<KanbanColumn bgColor={COLUMN_BG_COLORS.loading} title={'loading...'}/>) :
                    (<KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={toDoTitle} list={todoList}
                                   setIsDragSource={(isSrc: boolean) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
                                   setIsDragTarget={(isTgt: boolean) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
                                   onDrop={handleDrop}>
                        {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
                        {todoList.map(item => <KanbanCard key={item.title} onDragStart={() => setDraggedItem(item)}
                                                          {...item}/>)}
                    </KanbanColumn>)}
                <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="进行中"
                              setIsDragSource={(isSrc: boolean) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
                              setIsDragTarget={(isTgt: boolean) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
                              onDrop={handleDrop}>
                    {ongoingList.map(item => <KanbanCard key={item.title}
                                                         onDragStart={() => setDraggedItem(item)} {...item}/>)}
                </KanbanColumn>
                <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成"
                              setIsDragSource={(isSrc: boolean) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
                              setIsDragTarget={(isTgt: boolean) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
                              onDrop={handleDrop}>
                    {doneList.map(item => <KanbanCard key={item.title}
                                                      onDragStart={() => setDraggedItem(item)} {...item}/>)}
                </KanbanColumn>
            </KanbanBoard>
        </div>
    )
        ;
}