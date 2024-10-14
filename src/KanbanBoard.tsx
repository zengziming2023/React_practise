/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import React from "react";

export default function KanbanBoard({children}: any) {
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