import React, {MouseEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const KanbanCard = ({title, status}: any) => {
    return <li className="kanban-card">
        <div className="card-title">{title}</div>
        <div className="card-status">{status}</div>
    </li>
}

const KanbanNewCard = ({onSubmit}: any) => {
    const [title, setTitle] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit(title)
            setTitle('')
        }
    }

    return (
        <li className="kanban-card">
            <h3>添加新卡片</h3>
            <div className="card-title">
                <input type="text"
                       value={title}
                       onChange={handleChange}
                       onKeyDown={handleSubmit}/>
            </div>
        </li>
    );
};

const Kanban = ({children}: any) => {
    return (
        <main className="kanban-board">
            {children}
        </main>
    )
}

const KanbanColumn = ({children, className, title}: any) => {
    let css = `kanban-column ${className}`
    return (
        <section className={css}>
            <h2>{title}
            </h2>
            <ul>
                {children}
            </ul>
        </section>
    )
}

function App() {
    const [showAdd, setShowAdd] = useState(false);
    const [todoList, setTodoList] = useState([
        {title: '开发任务-1', status: '22-05-22 18:15'},
        {title: '开发任务-3', status: '22-05-22 18:16'},
        {title: '开发任务-5', status: '22-05-22 18:17'},
        {title: '测试任务-3', status: '22-05-22 18:18'}
    ]);

    const [ongoingList, setOngoingList] = useState([
        {title: '开发任务-4', status: '22-05-22 18:15'},
        {title: '开发任务-6', status: '22-05-22 18:15'},
        {title: '测试任务-2', status: '22-05-22 18:15'}
    ]);
    const [doneList, setDoneList] = useState([
        {title: '开发任务-2', status: '22-05-22 18:15'},
        {title: '测试任务-1', status: '22-05-22 18:15'}
    ]);

    const handleAdd = (event: MouseEvent) => {
        setShowAdd(true);
    }

    const handleSubmit = (title: string) => {
        setTodoList(curList => [{title: title, status: new Date().toDateString()}, ...curList])
        // todoList.unshift({title: title, status: new Date().toDateString()})
        // setShowAdd(false)
    }

    // jsx 赋值给 变量
    const toDoTitle = (<>待处理
            <button disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
        </>
    )

    return (
        <div className="App">
            <header className="App-header">
                <h1>我的看板</h1>
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <Kanban>
                <KanbanColumn className="column-todo" title={toDoTitle} list={todoList}>
                    {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
                    {todoList.map(item => <KanbanCard {...item}/>)}
                </KanbanColumn>
                <KanbanColumn className={"column-ongoing"} title="进行中">
                    {ongoingList.map(item => <KanbanCard {...item}/>)}
                </KanbanColumn>
                <KanbanColumn className={"column-done"} title="已完成">
                    {doneList.map(item => <KanbanCard {...item}/>)}
                </KanbanColumn>
            </Kanban>
        </div>
    );
}

export default App;
