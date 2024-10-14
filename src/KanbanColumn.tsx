/** @jsxImportSource @emotion/react */

import React from "react";
import {css} from "@emotion/react";

export default function KanbanColumn({
                                         children, bgColor, title, setIsDragSource,
                                         setIsDragTarget,
                                         onDrop
                                     }: any) {

    const onDragStart = (_: React.DragEvent) => {
        setIsDragSource(true)
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true)
    }

    const onDropFunc = (e: React.DragEvent) => {
        e.preventDefault()
        onDrop && onDrop(e)
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'none'
        setIsDragTarget(false)
    }

    const onDragEnd = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragTarget(false)
    }


    // let css = `kanban-column ${className}`
    return (
        <section onDragStart={onDragStart} onDrop={onDropFunc} onDragOver={onDragOver} onDragLeave={onDragLeave}
                 onDragEnd={onDragEnd} css={css`
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