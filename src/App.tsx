/** @jsxImportSource @emotion/react */
import React, {MouseEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {css} from "@emotion/react";

const KanbanCard = ({title, status}: any) => {
    return (
        //     <li className="kanban-card">
        //     <div className="card-title">{title}</div>
        //     <div className="card-status">{status}</div>
        // </li>
        <li css={kanbanCardStyles}>
            <div css={kanbanCardTitleStyles}>{title}</div>
            <div css={css`
                text-align: right;
                font-size: 0.8rem;
                color: #333;
            `}>{status}</div>
        </li>
    )
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
        <li css={kanbanCardStyles}>
            <h3>添加新卡片</h3>
            <div css={css`
                ${kanbanCardTitleStyles}
                & > input[type="text"] {
                    width: 80%;
                }
            `}>
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
        <main css={css`
            flex: 10;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin: 0 1rem 1rem;
        `}>
            {children}
        </main>
    )
}

const KanbanColumn = ({children, bgColor, title}: any) => {
    // let css = `kanban-column ${className}`
    return (
        <section css={css`
            flex: 1 1;
            display: flex;
            flex-direction: column;
            border: 1px solid gray;
            border-radius: 1rem;
            background-color: ${bgColor};

            & > h2 {
                margin: 0.6rem 1rem;
                padding-bottom: 0.6rem;
                border-bottom: 1px solid gray;

                & > button {
                    float: right;
                    margin-top: 0.2rem;
                    padding: 0.2rem 0.5rem;
                    border: 0;
                    border-radius: 1rem;
                    height: 1.8rem;
                    line-height: 1rem;
                    font-size: 1rem;
                }
            }

            & > ul {
                flex: 1;
                flex-basis: 0;
                margin: 1rem;
                padding: 0;
                overflow: auto;
            }
        `}>
            <h2>{title}
            </h2>
            <ul>
                {children}
            </ul>
        </section>
    )
}

const kanbanCardStyles = css`
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border: 1px solid gray;
    border-radius: 1rem;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.4);
    text-align: left;

    &:hover {
        box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.3), inset 0 1px #fff;
    }
`;
const kanbanCardTitleStyles = css`
    min-height: 3rem;
`;

const COLUMN_BG_COLORS = {
    todo: '#C9AF97',
    ongoing: '#FFE799',
    done: '#C0E8BA'
};

function App() {
    const [showAdd, setShowAdd] = useState(false);
    const [todoList, setTodoList] = useState([
        {title: '开发任务-1', status: '22-05-22 18:15'},
        {title: '开发任务-3', status: '22-05-22 18:16'},
        {title: '开发任务-5', status: '22-05-22 18:17'},
        {title: '测试任务-3', status: '22-05-22 18:18'}
    ]);

    const [ongoingList] = useState([
        {title: '开发任务-4', status: '22-05-22 18:15'},
        {title: '开发任务-6', status: '22-05-22 18:15'},
        {title: '测试任务-2', status: '22-05-22 18:15'}
    ]);
    const [doneList] = useState([
        {title: '开发任务-2', status: '22-05-22 18:15'},
        {title: '测试任务-1', status: '22-05-22 18:15'}
    ]);

    const handleAdd = (_: MouseEvent) => {
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
                <KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={toDoTitle} list={todoList}>
                    {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
                    {todoList.map(item => <KanbanCard key={item.title} {...item}/>)}
                </KanbanColumn>
                <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="进行中">
                    {ongoingList.map(item => <KanbanCard key={item.title} {...item}/>)}
                </KanbanColumn>
                <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成">
                    {doneList.map(item => <KanbanCard key={item.title} {...item}/>)}
                </KanbanColumn>
            </Kanban>
        </div>
    );
}

export default App;
