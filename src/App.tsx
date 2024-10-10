import React, {MouseEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface KanbanCardProps {
    title: string;
    status: string;
}

const KanbanCard = ({title, status}: KanbanCardProps) => {
    return <li className="kanban-card">
        <div className="card-title">{title}</div>
        <div className="card-status">{status}</div>
    </li>
}

interface NewCardProps {
    onSubmit: (title: string) => void;
}

const KanbanNewCard = ({onSubmit}: NewCardProps) => {
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

    return (
        <div className="App">
            <header className="App-header">
                <h1>我的看板</h1>
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <main className="kanban-board">
                <section className="kanban-column column-todo">
                    <h2>待处理
                        <button disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
                    </h2>
                    <ul>
                        {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
                        {todoList.map(item => <KanbanCard title={item.title} status={item.status}/>)}
                    </ul>
                </section>
                <section className="kanban-column column-ongoing">
                    <h2>进行中</h2>
                    <ul>
                        {ongoingList.map(item => <KanbanCard title={item.title} status={item.status}/>)}
                    </ul>
                </section>
                <section className="kanban-column column-done">
                    <h2>已完成</h2>
                    <ul>
                        {doneList.map(item => <KanbanCard title={item.title} status={item.status}/>)}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
