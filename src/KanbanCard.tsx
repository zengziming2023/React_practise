/** @jsxImportSource @emotion/react */

import React, {useEffect, useState} from "react";
import {css} from "@emotion/react";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = 5 * 1000; //MINUTE;

export const kanbanCardStyles = css`
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
export const kanbanCardTitleStyles = css`
    min-height: 3rem;
`;

export default function KanbanCard({title, status, onDragStart}: any) {
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

    const handleDragStart = (evt: React.DragEvent) => {
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text/paint', title);
        onDragStart && onDragStart(evt);
    }
    return (
        //     <li className="kanban-card">
        //     <div className="card-title">{title}</div>
        //     <div className="card-status">{status}</div>
        // </li>
        <li css={kanbanCardStyles} draggable={true} onDragStart={handleDragStart}>
            <div css={kanbanCardTitleStyles}>{title}</div>
            <div css={css`
                text-align: right;
                font-size: 0.8rem;
                color: #333;
            `}>{displayTime}</div>
        </li>
    )
}