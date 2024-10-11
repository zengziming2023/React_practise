/** @jsxImportSource @emotion/react */
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {css} from "@emotion/react";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;

const KanbanCard = ({title, status}: any) => {
    const [displayTime, setDisplayTime] = useState(status);
    useEffect(() => {
        const updateDisplayTime = () => {
            const now = new Date().getTime();
            const last = new Date(status).getTime()

            const timePassed = now - last;
            console.log('timePassed: ', timePassed);
            let relativeTime = '刚刚';
            if (MINUTE <= timePassed && timePassed < HOUR) {
                relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
            } else if (HOUR <= timePassed && timePassed < DAY) {
                relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
            } else if (DAY <= timePassed) {
                relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
            }
            setDisplayTime(relativeTime);
        }
        const timerId = setInterval(updateDisplayTime, UPDATE_INTERVAL)
        updateDisplayTime()

        return () => {
            clearInterval(timerId);
        }
    }, [status])

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
            `}>{displayTime}</div>
        </li>
    )
}

const KanbanNewCard = ({onSubmit}: any) => {
    const [title, setTitle] = useState('');
    const inputElem = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputElem?.current?.focus()
    }, [])

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
                       onKeyDown={handleSubmit}
                       ref={inputElem}/>
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
        {title: '开发任务-1', status: '2024-10-11 8:15'},
        {title: '开发任务-3', status: '2024-10-11 8:16'},
        {title: '开发任务-5', status: '2024-10-11 8:17'},
        {title: '测试任务-3', status: '2024-10-11 8:18'}
    ]);

    const [ongoingList] = useState([
        {title: '开发任务-4', status: '2024-10-11 8:15'},
        {title: '开发任务-6', status: '2024-10-11 8:15'},
        {title: '测试任务-2', status: '2024-10-11 8:15'}
    ]);
    const [doneList] = useState([
        {title: '开发任务-2', status: '2024-10-11 8:15'},
        {title: '测试任务-1', status: '2024-10-11 8:15'}
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
