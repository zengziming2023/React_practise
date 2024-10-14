/** @jsxImportSource @emotion/react */

import React, {useEffect, useRef, useState} from "react";
import {css} from "@emotion/react";
import {kanbanCardStyles, kanbanCardTitleStyles} from "./KanbanCard";

export default function KanbanNewCard({onSubmit}: any) {
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
}